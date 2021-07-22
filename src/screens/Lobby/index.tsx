import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Divider,
  HStack,
  Input,
  SearchIcon,
  Text,
  FlatList,
  useTheme,
} from "native-base";

import { AppBar } from "../../components";
import OptionItem from "./OptionItem";
import JoinRoomModal from "./JoinRoomModal";
import { useJoin, useLocalGames } from "../../hooks";
import { SwipeRow } from "react-native-swipe-list-view";

interface Game {
  id: number;
  name: string;
}

const Lobby: React.FC = () => {
  const { navigate } = useNavigation();
  const { games, removeGame } = useLocalGames();
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
      <HStack alignItems="center" py={2} px={2} backgroundColor="white">
        <SearchIcon size={8} color={theme.colors.primary[400]} />
        <Input
          borderWidth={0}
          width="80%"
          onChangeText={(j: string) => setSearch(j.toLowerCase())}
        />
      </HStack>
      <Divider />

      <Box mt={5}>
        <Divider />
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
          renderItem={({ item }) => {
            if (isNaN(item.id))
              return (
                <Box backgroundColor="white">
                  <OptionItem {...item} />
                  <Divider />
                </Box>
              );
            return (
              <SwipeRow
                disableLeftSwipe
                onSwipeValueChange={({ value }) => {
                  if (value > 150) removeGame(item.id);
                }}
              >
                <Box
                  backgroundColor="red"
                  justifyContent="center"
                  height="100%"
                  width="50%"
                  pl={2}
                >
                  <Text style={{ color: "white" }}>Delete</Text>
                </Box>
                <Box backgroundColor="white">
                  <OptionItem {...item} />
                  <Divider />
                </Box>
              </SwipeRow>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </>
  );
};

export default memo(Lobby);
