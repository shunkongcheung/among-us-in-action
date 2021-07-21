import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import useRoom from "./useRoom";
import RoomInfo from "../RoomInfo";
import RoomMap from "../RoomMap";
import RoomParticipants from "../RoomParticipants";
import useVoteEvent from "./useVoteEvent";
import VoteResultModal from "./VoteResultModal";

const wsLink = new WebSocketLink({
  uri: "wss://among-us.crestedmyna.com/subscriptions",
  options: { reconnect: true },
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }: any) => {
  return {
    tabBarIcon: ({ color, size }: any) => {
      let iconName = "list-outline";

      if (route.name === "RoomMap") {
        iconName = "game-controller-outline";
      }
      if (route.name === "RoomParticipant") {
        iconName = "body-outline";
      }
      if (route.name === "RoomInfo") {
        iconName = "document-text-outline";
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName as any} size={size} color={color} />;
    },
  };
};

function RoomTabNavigations() {
  const room = useRoom(client);
  const voteEvent = useVoteEvent(client);
  const { navigate } = useNavigation();

  const isStarted = room?.isStarted ?? false;

  React.useEffect(() => {
    if (isStarted) navigate("RoomMap", { isCharacterModal: true });
  }, [isStarted]);

  React.useEffect(() => {
    // on vote event id changes
    if (!!voteEvent?.id) navigate("RoomParticipants");
  }, [voteEvent?.id]);

  React.useEffect(() => {
    // when game is done, and vote result is closed
    if (room?.isEnded && !voteEvent?.id) navigate("RoomInfo");
  }, [room?.isEnded, voteEvent?.id]);

  const voteOutPlayer = React.useMemo(() => {
    const voteOutPlayerId = voteEvent?.voteOutPlayer;
    if (!voteOutPlayerId) return undefined;
    return (room?.participants || []).find((itm) => itm.id === voteOutPlayerId);
  }, [voteEvent?.voteOutPlayer, room?.participants]);

  if (!room) return <></>;

  return (
    <>
      <VoteResultModal
        voteOutPlayer={voteOutPlayer}
        isImposter={
          !!(room?.startImposters || []).find(
            (itm) => itm.id === voteOutPlayer?.id
          )
        }
        handleClose={() => voteEvent?.setVoteEvent(undefined)}
      />
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="RoomMap" options={{ title: "Game" }}>
          {() => (
            <RoomMap
              checkPoints={room.game.checkPoints}
              region={{
                latitude: room.game.latitude,
                longitude: room.game.longitude,
                latitudeDelta: room.game.latitudeDelta,
                longitudeDelta: room.game.longitudeDelta,
              }}
              isImposter={room.isImposter}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="RoomParticipants" options={{ title: "Participants" }}>
          {() => (
            <RoomParticipants
              participants={room.participants}
              survivers={room.survivers}
              voteEventId={voteEvent?.id}
              votes={voteEvent?.votes || []}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="RoomInfo" options={{ title: "Info." }}>
          {() => (
            <RoomInfo
              durationMinute={room.game.durationMinute}
              imposterCount={room.game.imposterCount}
              maxParticipantCount={room.game.maxParticipantCount}
              totalTask={room.game.totalTask}
              {...room}
              isEnded={room.isEnded && !voteEvent?.id} // is there is a voting going on, not showing the ending result
              participantCount={room.participants.length}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

export default RoomTabNavigations;
