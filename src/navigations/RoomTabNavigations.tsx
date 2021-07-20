import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useRoomContext } from "../hooks";
import RoomInfo from "../screens/RoomInfo";
import RoomMap from "../screens/RoomMap";
import RoomParticipants from "../screens/RoomParticipants";

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

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="RoomMap"
        component={RoomMap}
        options={{ title: "Game" }}
      />
      <Tab.Screen
        name="RoomParticipants"
        component={RoomParticipants}
        options={{ title: "Participants" }}
      />
      <Tab.Screen
        name="RoomInfo"
        component={RoomInfo}
        options={{ title: "Info." }}
      />
    </Tab.Navigator>
  );
}

export default RoomTabNavigations;
