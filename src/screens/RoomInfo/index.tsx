import React, { memo } from "react";
import { Box, Button, Center, StatusBar, useTheme } from "native-base";
import QRCode from "react-native-qrcode-svg";
import { gql, useMutation } from "@apollo/client";

import { useRoomContext } from "../../hooks";
import Desc from "./Desc";

const START_ROOM = gql`
  mutation StartRoom($roomId: Float!) {
    startRoom(roomId: $roomId) {
      id
    }
  }
`;

const START_VOTE = gql`
  mutation StartVoteEvent($roomId: Float!) {
    startVoteEvent(roomId: $roomId) {
      id
    }
  }
`;

const RoomInfo: React.FC = () => {
  const [startRoom] = useMutation(START_ROOM);
  const [startVote] = useMutation(START_VOTE);

  const theme = useTheme();
  const themeColor = theme.colors.primary[500];

  const room = useRoomContext();

  const onStartRoom = React.useCallback(async () => {
    await startRoom({ variables: { roomId: room!.id } });
  }, [room]);

  const onStartVote = React.useCallback(async () => {
    await startVote({ variables: { roomId: room!.id } });
  }, [room]);

  if (!room) return <></>;

  const character = room.isImposter ? "Imposter" : "Crewmate";

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
        {!!room.isStarted && <Desc title="Character">{character}</Desc>}
        {!!room.isReadyToStart && !room.isStarted && (
          <Button mt="auto" variant="solid" onPress={onStartRoom}>
            Start
          </Button>
        )}
        {!!room.isStarted && !room.isEnded && (
          <Button mt="auto" variant="solid" onPress={onStartVote}>
            Vote
          </Button>
        )}
      </Box>
    </>
  );
};

export default memo(RoomInfo);
