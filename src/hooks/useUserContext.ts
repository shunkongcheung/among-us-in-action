import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import { Alert } from "react-native";
import {
  Accuracy,
  watchPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { gql, useMutation } from "@apollo/client";

interface UserInput {
  id: number;
  name: string;
  hat: string;
  color: string;
}

interface User extends UserInput {
  latitude: number;
  longitude: number;
}

interface UserContextState extends User {
  setUser: (user: UserInput) => any;
}

const EDIT_PLAYER_LOCATION = gql`
  mutation EditPlayerLocation(
    $latitude: Float!
    $longitude: Float!
    $playerId: Float!
  ) {
    editPlayerLocation(
      latitude: $latitude
      longitude: $longitude
      playerId: $playerId
    ) {
      id
    }
  }
`;

export const UserContext = createContext<UserContextState>({
  id: -1,
  name: "",
  color: "",
  hat: "",
  latitude: 43.653225,
  longitude: -79.383186,
  setUser: () => {},
});

const STORAGE_KEY = "@USER";

export const useUserState = (client: any): UserContextState => {
  const [user, setUserLocal] = useState<User>({
    id: -1,
    name: "",
    color: "",
    latitude: 43.653225,
    longitude: -79.383186,
    hat: "",
  });

  const [editPlayerLocation] = useMutation(EDIT_PLAYER_LOCATION, { client });

  const setUser = useCallback(
    async (user: UserInput) => {
      setUserLocal((o) => ({
        ...user,
        latitude: o.latitude,
        longitude: o.longitude,
      }));
      const value = JSON.stringify(user);
      await AsyncStorage.setItem(STORAGE_KEY, value);
    },
    [setUserLocal]
  );

  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    const playerId = user.id;
    if (playerId < 1) return;

    const options = {
      accuracy: Accuracy.BestForNavigation,
      timeInterval: 1000,
      distanceInterval: 1,
    };
    watchPositionAsync(options, ({ coords }) => {
      const { latitude, longitude } = coords;
      editPlayerLocation({ variables: { playerId, latitude, longitude } });
      setUserLocal((o) => ({ ...o, latitude, longitude }));
    });
  }, [user.id]);

  useEffect(() => {
    (async () => {
      try {
        const user = await AsyncStorage.getItem(STORAGE_KEY);
        if (user === null) return;
        setUser(JSON.parse(user));
      } catch (e) {}
    })();
  }, [setUser]);

  return { ...user, setUser };
};

const useUserContext = () => {
  const userContext = useContext(UserContext);
  return userContext;
};

export default useUserContext;
