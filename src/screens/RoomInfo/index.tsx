import React, { memo } from "react";
import { Box, Button, Center, StatusBar, useTheme } from "native-base";
import QRCode from "react-native-qrcode-svg";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

import { useRoomContext } from "../../hooks";
import Desc from "./Desc";

const START_GAME = gql`
  mutation StartGame($roomId: Float!) {
    startGame(roomId: $roomId) {
      id
    }
  }
`;

const START_VOTE = gql`
  mutation StartVote($roomId: Float!) {
    startVote(roomId: $roomId) {
      id
    }
  }
`;

const RoomInfo: React.FC = () => {
  const [startGame] = useMutation(START_GAME);
  const [startVote] = useMutation(START_VOTE);

  const theme = useTheme();
  const themeColor = theme.colors.primary[500];

  const { navigate } = useNavigation();
  const room = useRoomContext();

  const onStartGame = React.useCallback(async () => {
    await startGame({ variables: { roomId: room!.id } });
    navigate("RoomMap", { isPopUp: true });
  }, [room, navigate]);

  const onStartVote = React.useCallback(async () => {
    await startVote({ variables: { roomId: room!.id } });
  }, [room, navigate]);

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
        {!!room.isReadyToStart && (
          <Button mt="auto" variant="solid" onPress={onStartGame}>
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
