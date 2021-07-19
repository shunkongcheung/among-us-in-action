import React, { memo } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Spinner,
  StatusBar,
  Text,
  useTheme,
} from "native-base";
import QRCode from "react-native-qrcode-svg";
import { useRoomContext } from "../../hooks";

interface DescProps {
  title: string;
  children: string;
}

const Desc: React.FC<DescProps> = ({ title, children }) => {
  const theme = useTheme();
  return (
    <HStack justifyContent="space-between" pb={3} alignItems="flex-end">
      <Text fontWeight="bold" color={theme.colors.muted[500]}>
        {title}
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        {children}
      </Text>
    </HStack>
  );
};

const RoomInfo: React.FC = () => {
  const theme = useTheme();
  const themeColor = theme.colors.primary[500];

  const room = useRoomContext();

  const past = React.useMemo(() => {
    if (!room?.startAt) return 0;
    const curr = new Date();

    const difference = curr.getTime() - room.startAt.getTime();
    const diffMin = Math.ceil(difference / (1000 * 60));
    return diffMin;
  }, [room?.startAt]);

  const isDisabled = React.useMemo(() => {
    if (!room) return false;
    const { participants } = room;
    const { imposterCount } = room.game;

    return participants.length <= imposterCount * 2;
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
      <Center
        pt={5}
        pb={10}
        height="60%"
        backgroundColor={themeColor}
        borderBottomLeftRadius={70}
      >
        <QRCode value={room.code} size={150} />
      </Center>
      <Box flex={1} px={5} py={5}>
        <Desc title="Imposter">{`${room.game.imposterCount}`}</Desc>
        <Desc title="Participants">{`${room.participants.length}/${room.game.maxParticipantCount}`}</Desc>
        <Desc title="Task">{`${room.completeCount}/${room.game.totalTask}`}</Desc>
        <Desc title="Duration (Min)">{`${past}/${room.game.durationMinute} `}</Desc>
        {!room?.startAt && (
          <Button mt="auto" variant="solid" disabled={isDisabled}>
            Start
          </Button>
        )}
      </Box>
    </>
  );
};

export default memo(RoomInfo);
