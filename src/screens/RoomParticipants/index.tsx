import React, { memo } from "react";
import { Box, FlatList, ScrollView, StatusBar, useTheme } from "native-base";

import ParticipantItem from "./ParticipantItem";
import { Player } from "../../types";

interface RoomParticipantsProps {
  participants: Array<Player>;
  survivers: Array<{ id: number }>;
}

const RoomParticipants: React.FC<RoomParticipantsProps> = ({
  participants,
  survivers,
}) => {
  const theme = useTheme();
  const themeColor = theme.colors.primary[500];

  const data = React.useMemo(() => {
    return participants.map((itm) => ({
      ...itm,
      isAlive: !!survivers.find((sItem) => sItem.id === itm.id),
    }));
  }, [participants, survivers]);

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
