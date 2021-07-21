import React from "react";
import { NativeBaseProvider, theme, extendTheme } from "native-base";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import { useUserState, UserContext } from "./src/hooks/useUserContext";
import Screens from "./src/screens";
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
  const user = useUserState(client);

  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider theme={newTheme}>
        <UserContext.Provider value={user}>
          <Screens />
        </UserContext.Provider>
      </NativeBaseProvider>
    </ApolloProvider>
  );
}
