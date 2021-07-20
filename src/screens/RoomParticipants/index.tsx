import React, { memo } from "react";
import {
  Box,
  Center,
  FlatList,
  ScrollView,
  Spinner,
  StatusBar,
  useTheme,
} from "native-base";

import { useRoomContext } from "../../hooks";
import ParticipantItem from "./ParticipantItem";

const RoomParticipants: React.FC = () => {
  const theme = useTheme();
  const themeColor = theme.colors.primary[500];

  const room = useRoomContext();

  const data = React.useMemo(() => {
    if (!room) return [];
    const { participants, survivers } = room;
    return participants.map((itm) => ({
      ...itm,
      isAlive: !!survivers.find((sItem) => sItem.id === itm.id),
    }));
  }, [room]);

  if (!room)
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    );

  return (
    <>
      <StatusBar backgroundColor={themeColor} barStyle="light-content" />
      <Box flex={1} my={4}>
        <ScrollView>
          <FlatList
            data={data}
            renderItem={({ item }) => <ParticipantItem {...item} />}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </Box>
    </>
  );
};

export default memo(RoomParticipants);
