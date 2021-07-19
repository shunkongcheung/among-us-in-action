import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Divider, FlatList } from "native-base";

import { AppBar } from "../../components";
import OptionItem from "./OptionItem";
import JoinRoomModal from "./JoinRoomModal";

const Lobby: React.FC = () => {
  const { navigate } = useNavigation();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <JoinRoomModal open={open} handleClose={() => setOpen(false)} />
      <AppBar isBackable>Lobby</AppBar>
      <FlatList
        data={[
          {
            id: "create",
            name: "Create New Game",
            onPress: () => navigate("EditGameInfo"),
          },
          { id: "join", name: "Join Room", onPress: () => setOpen(true) },
        ]}
        renderItem={({ item }) => (
          <>
            <OptionItem {...item} />
            <Divider />
          </>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default memo(Lobby);
