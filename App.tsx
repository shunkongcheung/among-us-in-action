import React from "react";
import { NativeBaseProvider, theme, extendTheme } from "native-base";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { useRoomState, RoomContext } from "./src/hooks/useRoomContext";
import { useUserState, UserContext } from "./src/hooks/useUserContext";
import Navigations from "./src/navigations";
import typeDefs from "./src/typeDefs";

const client = new ApolloClient({
  uri: "https://among-us.crestedmyna.com/graphql",
  cache: new InMemoryCache(),
  typeDefs,
  headers: {
    Accept: "application/json",
  },
});

export default function App() {
  const newTheme = extendTheme({
    colors: {
      primary: theme.colors.indigo,
    },
  });

  const user = useUserState();
  const room = useRoomState(user.id);

  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider theme={newTheme}>
        <UserContext.Provider value={user}>
          <RoomContext.Provider value={room}>
            <Navigations />
          </RoomContext.Provider>
        </UserContext.Provider>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
