import React, { memo } from "react";
import { gql, useMutation } from "@apollo/client";
import { Box, FlatList, ScrollView, StatusBar, useTheme } from "native-base";

import ParticipantItem from "./ParticipantItem";
import { AppBar } from "../../components";
import { Player } from "../../types";
import { useUserContext } from "../../hooks";

interface Vote {
  voteFor?: number;
  voteBy: number;
}

interface RoomParticipantsProps {
  participants: Array<Player>;
  survivers: Array<{ id: number }>;
  voteEventId?: number;
  votes: Array<Vote>;
}

const VOTE = gql`
  mutation Vote($voteEventId: Float!, $voteById: Float!, $voteForId: Float) {
    vote(
      voteEventId: $voteEventId
      voteById: $voteById
      voteForId: $voteForId
    ) {
      id
    }
  }
`;

const RoomParticipants: React.FC<RoomParticipantsProps> = ({
  participants,
  survivers,
  voteEventId,
  votes,
}) => {
  const theme = useTheme();
  const themeColor = theme.colors.primary[500];
  const { id: playerId } = useUserContext();
  const [vote] = useMutation(VOTE);

  const isVoting = !!voteEventId;

  console.log({ survivers });

  const data = React.useMemo(() => {
    const regulars = participants.map((itm) => ({
      ...itm,
      isAlive: !!survivers.find((sItem) => sItem.id === itm.id),
      isThinking: !votes.find((vote) => vote.voteBy === itm.id),
      onVote: () =>
        vote({
          variables: { voteEventId, voteById: playerId, voteForId: itm.id },
        }),
    }));

    if (isVoting)
      regulars.unshift({
        id: -1,
        color: "black",
        hat: "question-mark",
        name: "Give up voting",
        isAlive: true,
        isThinking: false,
        onVote: () =>
          vote({
            variables: { voteEventId, voteById: playerId, voteForId: null },
          }),
      });

    return regulars;
  }, [participants, survivers, isVoting, votes]);

  const isVoted = React.useMemo(
    () =>
      votes.reduce(
        (acc: boolean, curr: Vote) => acc || curr.voteBy === playerId,
        false
      ),
    [votes]
  );

  return (
    <>
      <StatusBar backgroundColor={themeColor} barStyle="light-content" />
      <AppBar>Participants</AppBar>
      <Box flex={1} my={4}>
        <ScrollView>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ParticipantItem
                {...item}
                isVoting={isVoting}
                isVoted={isVoted}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </Box>
    </>
  );
};

export default memo(RoomParticipants);
