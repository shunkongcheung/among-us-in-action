import {
  gql,
  useSubscription,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { useMemo } from "react";
import { useUserContext } from "../../hooks";
import getMeter from "./getMeter";

interface CorpseRet {
  id: number;
  latitude: number;
  longitude: number;
  player: {
    id: number;
  };
}

const wsLink = new WebSocketLink({
  uri: "wss://among-us.crestedmyna.com/subscriptions",
  options: { reconnect: true },
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

const ON_CORPSE = gql`
  subscription OnCorpse($playerId: Float!) {
    onCorpses(playerId: $playerId) {
      id
      latitude
      longitude
      player {
        id
      }
    }
  }
`;

function useCorpse() {
  const { id: playerId, latitude, longitude } = useUserContext();
  const { data } = useSubscription<{ onCorpses: Array<CorpseRet> }>(ON_CORPSE, {
    client,
    variables: { playerId },
  });
  const corpses = data?.onCorpses || [];

  const isKilled = corpses.find((itm) => itm.player.id === playerId);
  const isCoprseFound = useMemo(() => {
    const MIN_DIST = 50;
    return corpses.find(
      (itm) =>
        itm.player.id !== playerId &&
        getMeter(itm, { latitude, longitude }) < MIN_DIST
    );
  }, [data]);

  return { isKilled, isCoprseFound };
}

export default useCorpse;
