import { createContext, useContext } from "react";
import { Player } from "./types";

interface UserContextState extends Player {
  setUser: (user: Player) => any;
}

export const UserContext = createContext<UserContextState>({
  id: -1,
  name: "",
  color: "",
  hat: "",
  setUser: () => {},
});

export const useUserContext = () => {
  const userContext = useContext(UserContext);
  return userContext;
};

export default useUserContext;
