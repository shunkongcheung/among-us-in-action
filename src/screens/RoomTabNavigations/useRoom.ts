import {
  gql,
  useSubscription,
  ApolloClient,
  InMemoryCache,
  useMutation,
} from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { WebSocketLink } from "@apollo/client/link/ws";

import { useLocalGames, useUserContext } from "../../hooks";
import { Game, Player, Room } from "../../types";

const wsLink = new WebSocketLink({
  uri: "wss://among-us.crestedmyna.com/subscriptions",
  options: { reconnect: true },
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

interface RoomRet {
  id: number;
  code: string;
  completeCount: number;
  startAt?: string;
  endAt?: string;
  game: Game;
  participants: Array<Player>;
  imposters: Array<{ id: number }>;
  survivers: Array<{ id: number }>;
}

const END_ROOM = gql`
  mutation EndRoom($roomId: Float!) {
    endRoom(roomId: $roomId) {
      id
    }
  }
`;

const ROOM_SUBSCRIPTION = gql`
  subscription OnRoomChange($playerId: Float!) {
    onRoomChange(playerId: $playerId) {
      id
      code
      completeCount
      startAt
      endAt
      game {
        id
        name
        latitude
        longitude
        latitudeDelta
        longitudeDelta
        totalTask
        imposterCount
        durationMinute
        maxParticipantCount
        checkPoints {
          latitude
          longitude
          task
        }
      }
      participants {
        id
        name
        color
        hat
      }
      imposters {
        id
      }
      survivers {
        id
      }
    }
  }
`;

const useRoom = (): Room | undefined => {
  const { id: playerId } = useUserContext();
  const [minutePast, setMinutePast] = useState(0);

  const { storeGame } = useLocalGames();

  const [endRoom] = useMutation(END_ROOM);
  const { data } = useSubscription<{ onRoomChange: RoomRet }>(
    ROOM_SUBSCRIPTION,
    {
      variables: { playerId },
      client,
    }
  );
  const room = data?.onRoomChange;

  const getMinutePast = useCallback(() => {
    if (!room) return 0;
    const { startAt } = room;
    if (!startAt) return 0;

    const curr = new Date();
    const startAtTime = new Date(startAt);

    const difference = curr.getTime() - startAtTime.getTime();
    const diffMin = Math.ceil(difference / (1000 * 60));
    return diffMin;
  }, [room]);

  const isAlive = useMemo(() => {
    if (!room) return false;
    return !!room.survivers.find((itm) => itm.id === playerId);
  }, [playerId, room]);

  const isCrewMateWin = useMemo(() => {
    if (!room) return false;
    const { imposters } = room;
    const { durationMinute } = room.game;
    return !imposters.length || durationMinute < minutePast;
  }, [minutePast, room]);

  const isEnded = useMemo(() => {
    if (!room) return false;
    const { endAt } = room;
    return !!endAt;
  }, [room]);

  const isImposter = useMemo(() => {
    if (!room) return false;
    return !!room.imposters.find((itm) => itm.id === playerId);
  }, [playerId, room]);

  const isImposterWin = useMemo(() => {
    if (!room) return false;
    const { survivers, imposters } = room;
    if (!imposters.length) return false;
    return survivers.length <= imposters.length * 2;
  }, [room]);

  const isReadyToStart = useMemo(() => {
    if (!room) return false;
    const { participants, game } = room;
    return participants.length > game.imposterCount * 2;
  }, [room]);

  const isStarted = useMemo(() => {
    if (!room) return false;
    return !!room.startAt;
  }, [room]);

  useEffect(() => {
    // update is ended every nth second
    const interval = setInterval(() => setMinutePast(getMinutePast()), 5000);
    return () => clearInterval(interval);
  }, [getMinutePast, setMinutePast]);

  useEffect(() => {
    // when game should end, call end game
    if (isCrewMateWin) endRoom({ variables: { roomId: room!.id } });
  }, [endRoom, isCrewMateWin]);

  useEffect(() => {
    // store this game when loaded
    if (!!room) storeGame(room.game);
  }, [room]);

  if (!room) return undefined;

  return {
    ...room!,
    isAlive,
    isCrewMateWin,
    isEnded,
    isImposter,
    isImposterWin,
    isReadyToStart,
    isStarted,
    minutePast,
  };
};

export default useRoom;
