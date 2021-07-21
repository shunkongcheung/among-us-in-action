import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Divider,
  HStack,
  Input,
  SearchIcon,
  FlatList,
  useTheme,
} from "native-base";

import { AppBar } from "../../components";
import OptionItem from "./OptionItem";
import JoinRoomModal from "./JoinRoomModal";
import { useJoin, useLocalGames } from "../../hooks";

interface Game {
  id: number;
  name: string;
}

const Lobby: React.FC = () => {
  const { navigate } = useNavigation();
  const { games } = useLocalGames();
  const { joinGame } = useJoin();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const gameData = React.useMemo(
    () =>
      games
        .filter(({ name }: Game) =>
          !!search ? name.toLowerCase().includes(search) : true
        )
        .map(({ id, name }: Game) => ({
          id,
          name,
          onPress: async () => {
            navigate("Room", { screen: "RoomInfo" });
            await joinGame(id);
          },
        })),
    [games]
  );

  return (
    <>
      <JoinRoomModal open={open} handleClose={() => setOpen(false)} />
      <AppBar isBackable>Lobby</AppBar>
      <HStack alignItems="center" py={2} px={2}>
        <SearchIcon size={8} color={theme.colors.primary[400]} />
        <Input
          borderWidth={0}
          width="80%"
          onChangeText={(j: string) => setSearch(j.toLowerCase())}
        />
      </HStack>

      <FlatList
        data={[
          {
            id: "create",
            name: "Create New Game",
            onPress: () => navigate("EditGameInfo"),
          },
          { id: "join", name: "Join Room", onPress: () => setOpen(true) },
          ...gameData,
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
