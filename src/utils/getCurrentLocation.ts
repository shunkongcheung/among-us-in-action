import { Alert } from "react-native";
import * as Location from "expo-location";

const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Location required", "Location is required to play this game");
    throw new Error("Not granted");
  }
  const location = await Location.getCurrentPositionAsync({});
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};

export default getCurrentLocation;
