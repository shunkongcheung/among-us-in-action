import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import { Alert } from "react-native";
import { requestForegroundPermissionsAsync } from "expo-location";

import { Location } from "../components/Map";
import { Player } from "../types";
import { getCurrentLocation } from "../utils";

interface UserContextState extends Player {
  location: Location;
  setUser: (user: Player) => any;
}

export const UserContext = createContext<UserContextState>({
  id: -1,
  name: "",
  color: "",
  hat: "",
  location: { latitude: 43.653225, longitude: -79.383186 },
  setUser: () => {},
});

export const useUserState = (): UserContextState => {
  const [user, setUserLocal] = useState({
    id: -1,
    name: "",
    color: "",
    location: { latitude: 43.653225, longitude: -79.383186 },
    hat: "",
  });

  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      const location = await getCurrentLocation();
      setUserLocal((o) => ({ ...o, location }));
    })();
  }, []);

  const setUser = useCallback(
    (user: Player) => {
      setUserLocal((o) => ({ ...user, location: o.location }));
    },
    [setUserLocal]
  );

  return { ...user, setUser };
};

const useUserContext = () => {
  const userContext = useContext(UserContext);
  return userContext;
};

export default useUserContext;
