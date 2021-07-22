import { useEffect, useMemo, useState } from "react";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  gql,
  useSubscription,
  ApolloClient,
  InMemoryCache,
  useMutation,
} from "@apollo/client";

import { useUserContext } from "../../hooks";
import getMeter from "./getMeter";

interface Player {
  id: number;
  isWithin: boolean;
  meters: number;
}

interface PlayerLocation {
  id: number;
  latitude: number;
  longitude: number;
}

interface SimplePlayer {
  id: number;
}

const wsLink = new WebSocketLink({
  uri: "wss://among-us.crestedmyna.com/subscriptions",
  options: { reconnect: true },
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

const ON_PLAYER_LOCATION = gql`
  subscription OnPlayerLocation($playerId: Float!) {
    onPlayerLocation(playerId: $playerId) {
      id
      latitude
      longitude
    }
  }
`;

const KILL = gql`
  mutation Kill(
    $roomId: Float!
    $latitude: Float!
    $longitude: Float!
    $playerId: Float!
  ) {
    kill(
      roomId: $roomId
      latitude: $latitude
      longitude: $longitude
      playerId: $playerId
    ) {
      id
    }
  }
`;

function useKillable(roomId: number, survivers: Array<SimplePlayer>) {
  const { id: playerId, latitude, longitude } = useUserContext();
  const { data } = useSubscription<{ onPlayerLocation: PlayerLocation }>(
    ON_PLAYER_LOCATION,
    {
      variables: { playerId },
      client,
    }
  );
  const playerLocation = data?.onPlayerLocation;

  const [kill] = useMutation(KILL);

  const [players, setPlayers] = useState<Array<Player>>([]);

  const makeKill = useMemo(() => {
    const killable = players.find((itm) => itm.isWithin && itm.id !== playerId);
    if (!killable) return undefined;

    return async () => {
      setPlayers((itm) => itm.filter((itm) => itm.id !== killable.id));
      kill({
        variables: { roomId, latitude, longitude, playerId: killable.id },
      });
    };
  }, [latitude, longitude, roomId, players, setPlayers]);

  useEffect(() => {
    if (!playerLocation) return;
    if (playerLocation.id === playerId) return;

    const MIN_DIST = 50;
    const userLoc = { latitude, longitude };

    const meters = getMeter(playerLocation, userLoc);
    const isWithin = meters < MIN_DIST;
    setPlayers((o) =>
      o.map((player) => {
        if (player.id !== playerLocation.id) return player;
        return { ...player, isWithin, meters };
      })
    );
  }, [latitude, longitude, survivers, playerLocation, playerId]);

  useEffect(() => {
    setPlayers(
      survivers.map((itm: SimplePlayer) => ({
        id: itm.id,
        isWithin: false,
        meters: 100,
      }))
    );
  }, [survivers]);

  return makeKill;
}

export default useKillable;
