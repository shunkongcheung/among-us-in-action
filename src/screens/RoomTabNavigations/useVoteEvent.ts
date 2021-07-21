import { useEffect, useMemo, useState } from "react";
import {
  gql,
  useSubscription,
  ApolloClient,
  NormalizedCacheObject,
} from "@apollo/client";

import { useUserContext } from "../../hooks";
import { Player } from "../../types";

const VOTE_SUBSCRIPTION = gql`
  subscription OnVoteEvent($playerId: Float!) {
    onVoteEvent(playerId: $playerId) {
      id
      isCompleted
      voteOutPlayer {
        id
      }
      votes {
        voteFor {
          id
        }
        voteBy {
          id
        }
      }
    }
  }
`;

interface Vote {
  voteFor?: Player;
  voteBy: Player;
}

interface VoteEvent {
  id: number;
  isCompleted: boolean;
  voteOutPlayer?: number;
  votes: Array<{ voteFor?: number; voteBy: number }>;
}

interface VoteRet {
  id: number;
  isCompleted: boolean;
  voteOutPlayer?: {
    id: number;
  };
  votes: Array<Vote>;
}

function useVoteEvent(client: ApolloClient<NormalizedCacheObject>) {
  const { id: playerId } = useUserContext();
  const [voteEvent, setVoteEvent] = useState<VoteRet>();

  const { data } = useSubscription<{ onVoteEvent: VoteRet }>(
    VOTE_SUBSCRIPTION,
    { variables: { playerId }, client }
  );
  useEffect(() => {
    setVoteEvent(data?.onVoteEvent);
  }, [data, setVoteEvent]);

  const ret = useMemo<VoteEvent | undefined>(() => {
    if (!voteEvent) return undefined;

    return {
      id: voteEvent.id,
      isCompleted: voteEvent.isCompleted,
      voteOutPlayer: voteEvent.voteOutPlayer?.id,
      votes: voteEvent.votes.map((vote: Vote) => ({
        voteFor: vote.voteFor?.id,
        voteBy: vote.voteBy.id,
      })),
    };
  }, [voteEvent]);

  if (!ret) return undefined;
  return { ...ret, setVoteEvent };
}

export default useVoteEvent;
