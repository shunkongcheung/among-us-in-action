import { createContext, useContext } from "react";
import { User } from "./types";

interface UserContextState extends User {
  setUser: (user: User) => any;
}

export const UserContext = createContext<UserContextState>({
  displayName: "",
  color: "",
  hat: { name: "", source: "" },
  setUser: () => {},
});

export const useUserContext = () => {
  const userContext = useContext(UserContext);
  return userContext;
};

export default useUserContext;
