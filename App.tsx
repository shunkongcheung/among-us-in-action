import React from "react";
import { NativeBaseProvider, theme, extendTheme } from "native-base";
import Navigations from "./src/navigations";

export default function App() {
  const newTheme = extendTheme({
    colors: {
      primary: theme.colors.indigo,
    },
  });
  return (
    <NativeBaseProvider theme={newTheme}>
      <Navigations />
    </NativeBaseProvider>
  );
}
