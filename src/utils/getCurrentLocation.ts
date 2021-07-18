import { getCurrentPositionAsync } from "expo-location";

const getCurrentLocation = async () => {
  const location = await getCurrentPositionAsync({});
  if (!location) throw new Error("Could not retrieve location");

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};

export default getCurrentLocation;
