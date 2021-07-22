import React, { memo } from "react";
import { Box, Button, Text, StatusBar, useTheme } from "native-base";
import QRCode from "react-native-qrcode-svg";
import { gql, useMutation } from "@apollo/client";

import Desc from "./Desc";
import ResultModal from "./ResultModal";
import { useNavigation } from "@react-navigation/native";

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
  isImposterWin: boolean;
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
    isImposterWin,
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

  const { navigate } = useNavigation();

  const [isOpen, setIsOpen] = React.useState(false);

  const onStartRoom = React.useCallback(async () => {
    await startRoom({ variables: { roomId: id } });
  }, [id]);

  const onStartVote = React.useCallback(async () => {
    await startVote({ variables: { roomId: id } });
  }, [id]);

  const character = isImposter ? "Imposter" : "Crewmate";

  React.useEffect(() => {
    if (isEnded) setIsOpen(true);
  }, [isEnded]);

  return (
    <>
      <ResultModal
        handleClose={() => setIsOpen(false)}
        isImposter={isImposter}
        isImposterWin={isImposterWin}
        isOpen={isOpen}
      />
      <StatusBar backgroundColor={themeColor} barStyle="light-content" />
      <Box
        py="auto"
        height="40%"
        alignItems="center"
        justifyContent="center"
        backgroundColor={themeColor}
        borderBottomLeftRadius={70}
      >
        <QRCode value={code} size={90} />
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
        <Box mt="auto">
          {!!isReadyToStart && !isStarted && (
            <Button variant="solid" onPress={onStartRoom}>
              Start
            </Button>
          )}
          {!!isStarted && !isEnded && (
            <Button variant="solid" onPress={onStartVote}>
              Vote
            </Button>
          )}
          <Button
            mt={2}
            variant="solid"
            onPress={() => navigate("Lobby")}
            backgroundColor={theme.colors.red[500]}
          >
            Exit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default memo(RoomInfo);
