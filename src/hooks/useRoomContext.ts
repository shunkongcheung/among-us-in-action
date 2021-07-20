import {
  gql,
  useSubscription,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { createContext, useContext, useEffect } from "react";
import { WebSocketLink } from "@apollo/client/link/ws";

import { Room } from "../types";
import useLocalGames from "./useLocalGames";

const wsLink = new WebSocketLink({
  uri: "wss://among-us.crestedmyna.com/subscriptions",
  options: { reconnect: true },
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

export const RoomContext = createContext<Room | undefined>(undefined);

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
        name
        color
        hat
      }
      survivers {
        id
        name
        color
        hat
      }
    }
  }
`;

export const useRoomState = (playerId: number) => {
  const { storeGame } = useLocalGames();
  const { data } = useSubscription<{ onRoomChange: Room }>(ROOM_SUBSCRIPTION, {
    variables: { playerId },
    client,
  });
  const room = data?.onRoomChange;

  useEffect(() => {
    if (!!room) storeGame(room.game);
  }, [room]);

  return room;
};

const useRoomContext = () => {
  const room = useContext(RoomContext);
  return room;
};

export default useRoomContext;
