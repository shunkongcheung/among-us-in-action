import React, { memo } from "react";
import {
  Box,
  HStack,
  IconButton,
  Divider,
  Image,
  Text,
  VStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { HATS } from "../../constants";

interface ParticipantItemProps {
  name: string;
  hat: string;
  color: string;
  isAlive: boolean;
  isThinking: boolean;
  isVoting: boolean;
  isVoted: boolean;
  onVote: () => any;
}

const ParticipantItem: React.FC<ParticipantItemProps> = ({
  name,
  hat,
  color,
  isAlive,
  isVoting,
  isVoted,
  isThinking,
  onVote,
}) => {
  const hatSource = React.useMemo(
    () => HATS.find((itm) => itm.name === hat)!.source,
    [hat]
  );

  const isGiveUp = hat === "question-mark";

  return (
    <>
      <HStack py={3} px={5}>
        <Box mt={10}>
          <Box position="absolute" left="25%" top="-45%" zIndex={1}>
            <Image source={hatSource} alt={`Hat of ${name}`} size="xs" />
          </Box>
          <Image
            source={require("../../../assets/player-icon.png")}
            size="sm"
            alt={`Icon of ${name}`}
          />
        </Box>
        <VStack justifyContent="space-evenly" mr="auto" ml={2}>
          <Text fontWeight="bold" style={{ color }}>
            {name}
          </Text>
          {isVoting && !isGiveUp && (
            <Ionicons
              size={30}
              name={
                isThinking ? "chatbubble-ellipses-outline" : "archive-outline"
              }
            />
          )}
        </VStack>
        {!isAlive && (
          <Box justifyContent="center" mr={1}>
            <Ionicons name="skull-outline" size={30} />
          </Box>
        )}
        {!!isVoting && isAlive && (
          <IconButton
            icon={<Ionicons name="hand-right-outline" size={30} />}
            disabled={isVoted}
            onPress={onVote}
          />
        )}
      </HStack>
      <Divider />
    </>
  );
};

export default memo(ParticipantItem);
