import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RoomInfo from "../screens/RoomInfo";

const Tab = createBottomTabNavigator();

function RoomTabNavigations() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RoomInfo" component={RoomInfo} />
    </Tab.Navigator>
  );
}

export default RoomTabNavigations;
