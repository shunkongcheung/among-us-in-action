import React, { memo } from "react";
import { Box, Button, Center, StatusBar, useTheme } from "native-base";
import QRCode from "react-native-qrcode-svg";

import { useRoomContext } from "../../hooks";
import Desc from "./Desc";

const RoomInfo: React.FC = () => {
  const theme = useTheme();
  const themeColor = theme.colors.primary[500];

  const room = useRoomContext();

  if (!room) return <></>;

  return (
    <>
      <StatusBar backgroundColor={themeColor} barStyle="light-content" />
      <Center
        pt={5}
        pb={10}
        height="50%"
        backgroundColor={themeColor}
        borderBottomLeftRadius={70}
      >
        <QRCode value={room.code} size={150} />
      </Center>
      <Box flex={1} px={5} py={5}>
        <Desc title="Imposter">{`${room.game.imposterCount}`}</Desc>
        <Desc title="Participants">{`${room.participants.length}/${room.game.maxParticipantCount}`}</Desc>
        <Desc title="Task">{`${room.completeCount}/${room.game.totalTask}`}</Desc>
        <Desc title="Duration (Min)">{`${room.minutePast}/${room.game.durationMinute} `}</Desc>
        {!!room.isReadyToStart && (
          <Button mt="auto" variant="solid">
            Start
          </Button>
        )}
      </Box>
    </>
  );
};

export default memo(RoomInfo);
