import React from "react";
import { NativeBaseProvider, theme, extendTheme } from "native-base";

import Navigations from "./src/navigations";
import { UserContext } from "./src/useUserContext";
import { User } from "./src/types";

export default function App() {
  const [user, setUser] = React.useState<User>({
    displayName: "",
    color: "",
    hat: { name: "", source: "" },
  });
  const newTheme = extendTheme({
    colors: {
      primary: theme.colors.indigo,
    },
  });
  return (
    <NativeBaseProvider theme={newTheme}>
      <UserContext.Provider value={{ ...user, setUser }}>
        <Navigations />
      </UserContext.Provider>
    </NativeBaseProvider>
  );
}
