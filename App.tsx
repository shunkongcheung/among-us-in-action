import React from "react";
import { Alert } from "react-native";
import { NativeBaseProvider, theme, extendTheme } from "native-base";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { requestForegroundPermissionsAsync } from "expo-location";

import { UserContext } from "./src/hooks/useUserContext";
import Navigations from "./src/navigations";
import typeDefs from "./src/typeDefs";
import { Player } from "./src/types";

const client = new ApolloClient({
  uri: "https://among-us.crestedmyna.com/graphql",
  cache: new InMemoryCache(),
  typeDefs,
});

export default function App() {
  const [user, setUser] = React.useState<Player>({
    id: -1,
    name: "",
    color: "",
    hat: "",
  });
  const newTheme = extendTheme({
    colors: {
      primary: theme.colors.indigo,
    },
  });

  React.useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider theme={newTheme}>
        <UserContext.Provider value={{ ...user, setUser }}>
          <Navigations />
        </UserContext.Provider>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
