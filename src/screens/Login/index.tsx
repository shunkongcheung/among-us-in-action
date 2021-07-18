import React, { memo } from "react";
import { Text } from "react-native";

import { AppBar } from "../../components";

const Login: React.FC = () => {
  return (
    <>
      <AppBar>Among Us</AppBar>
      <Text>Login page</Text>
    </>
  );
};

export default memo(Login);
