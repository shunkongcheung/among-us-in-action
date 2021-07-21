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

import { PlayerIcon } from "../../components";

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
  const isGiveUp = hat === "question-mark";

  return (
    <>
      <HStack py={3} px={5}>
        <PlayerIcon color={color} hat={hat} size="sm" />
        <VStack justifyContent="space-evenly" mr="auto" ml={2}>
          <Text fontWeight="bold">{name}</Text>
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
