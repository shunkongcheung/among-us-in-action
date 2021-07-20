import React, { memo } from "react";
import { Box, Button, Text, StatusBar, useTheme } from "native-base";
import QRCode from "react-native-qrcode-svg";
import { gql, useMutation } from "@apollo/client";

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

interface RoomInfoProps {
  code: string;
  completeCount: number;
  durationMinute: number;
  id: number;
  imposterCount: number;
  isEnded: boolean;
  isStarted: boolean;
  isImposter: boolean;
  isReadyToStart: boolean;
  maxParticipantCount: number;
  minutePast: number;
  participantCount: number;
  totalTask: number;
}

const RoomInfo: React.FC<RoomInfoProps> = (props) => {
  const {
    code,
    completeCount,
    durationMinute,
    id,
    imposterCount,
    isEnded,
    isStarted,
    isImposter,
    isReadyToStart,
    maxParticipantCount,
    minutePast,
    participantCount,
    totalTask,
  } = props;
  const [startRoom] = useMutation(START_ROOM);
  const [startVote] = useMutation(START_VOTE);

  const theme = useTheme();
  const themeColor = theme.colors.primary[500];

  // const room = useRoomContext();

  const onStartRoom = React.useCallback(async () => {
    await startRoom({ variables: { roomId: id } });
  }, [id]);

  const onStartVote = React.useCallback(async () => {
    await startVote({ variables: { roomId: id } });
  }, [id]);

  const character = isImposter ? "Imposter" : "Crewmate";

  return (
    <>
      <StatusBar backgroundColor={themeColor} barStyle="light-content" />
      <Box
        py="auto"
        height="55%"
        alignItems="center"
        justifyContent="center"
        backgroundColor={themeColor}
        borderBottomLeftRadius={70}
      >
        <QRCode value={code} size={150} />
        <Text mt={5} fontWeight="bold" style={{ color: "#eee" }} fontSize="lg">
          {code}
        </Text>
      </Box>
      <Box flex={1} px={5} py={5}>
        <Desc title="Imposter">{`${imposterCount}`}</Desc>
        <Desc title="Participants">{`${participantCount}/${maxParticipantCount}`}</Desc>
        <Desc title="Task">{`${completeCount}/${totalTask}`}</Desc>
        <Desc title="Duration (Min)">{`${minutePast}/${durationMinute} `}</Desc>
        {!!isStarted && <Desc title="Character">{character}</Desc>}
        {!!isReadyToStart && !isStarted && (
          <Button mt="auto" variant="solid" onPress={onStartRoom}>
            Start
          </Button>
        )}
        {!!isStarted && !isEnded && (
          <Button mt="auto" variant="solid" onPress={onStartVote}>
            Vote
          </Button>
        )}
      </Box>
    </>
  );
};

export default memo(RoomInfo);
