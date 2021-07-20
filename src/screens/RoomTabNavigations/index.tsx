import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useRoomContext } from "../../hooks";
import RoomInfo from "../RoomInfo";
import RoomMap from "../RoomMap";
import RoomParticipants from "../RoomParticipants";

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
  const room = useRoomContext();
  const { navigate } = useNavigation();

  const isStarted = room?.isStarted ?? false;

  React.useEffect(() => {
    if (isStarted) navigate("RoomMap", { isCharacterModal: true });
  }, [isStarted]);

  if (!room) return <></>;

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="RoomMap" options={{ title: "Game" }}>
        {() => (
          <RoomMap
            checkPoints={room.game.checkPoints}
            region={room.game}
            isImposter={room.isImposter}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="RoomParticipants" options={{ title: "Participants" }}>
        {() => (
          <RoomParticipants
            participants={room.participants}
            survivers={room.survivers}
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
            participantCount={room.participants.length}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default RoomTabNavigations;
