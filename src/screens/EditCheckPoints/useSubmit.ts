import { useCallback } from "react";
import { gql, useMutation } from "@apollo/client";

import { Task } from "../../constants";
import { useJoin } from "../../hooks";

interface CreateGame {
  createGame: { id: number };
}

interface CheckPointInput {
  latitude: number;
  longitude: number;
  task: Task;
}

interface GameInput {
  name: string;
  maxParticipantCount: number;
  totalTask: number;
  durationMinute: number;
  imposterCount: number;
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  checkPoints: Array<CheckPointInput>;
}

const CREATE_GAME = gql`
  mutation CreateGame($game: GameInputType!) {
    createGame(game: $game) {
      id
    }
  }
`;

function useSubmit() {
  const [createGame] = useMutation<CreateGame>(CREATE_GAME);
  const { joinGame } = useJoin();

  const submit = useCallback(
    async (gameInput: GameInput) => {
      const game = JSON.parse(JSON.stringify(gameInput));

      const { data } = await createGame({ variables: { game } });
      const gameId = data!.createGame.id;

      return joinGame(gameId);
    },
    [createGame, joinGame]
  );

  return submit;
}

export default useSubmit;
