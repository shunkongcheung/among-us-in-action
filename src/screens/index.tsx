import React, { memo } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Lobby from "./Lobby";
import Login from "./Login";
import EditCheckPoints from "./EditCheckPoints";
import EditGameInfo from "./EditGameInfo";

import RoomTabNavigations from "./RoomTabNavigations";

const Stack = createStackNavigator();

const Navigations: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Lobby" component={Lobby} />
        <Stack.Screen name="EditGameInfo" component={EditGameInfo} />
        <Stack.Screen name="EditCheckPoints" component={EditCheckPoints} />
        <Stack.Screen name="Room" component={RoomTabNavigations} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(Navigations);
