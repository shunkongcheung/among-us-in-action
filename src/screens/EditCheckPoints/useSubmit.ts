import { useCallback } from "react";
import { gql, useMutation } from "@apollo/client";

import { Game } from "../../types";

const CREATE_GAME = gql`
  mutation CreateGame($game: GameInputType!) {
    createGame(game: $game) {
      id
    }
  }
`;

const CREATE_ROOM = gql`
  mutation CreateRoom($gameId: Float!) {
    createRoom(gameId: $gameId) {
      id
    }
  }
`;

function useSubmit() {
  const [createGame] = useMutation<{ createGame: { id: number } }>(CREATE_GAME);
  const [createRoom] = useMutation<{ createRoom: { id: number } }>(CREATE_ROOM);
  const submit = useCallback(
    async (game: Game) => {
      const { data } = await createGame({ variables: { game } });
      const gameId = data!.createGame.id;
      console.warn({ gameId });
    },
    [createGame]
  );

  return submit;
}

export default useSubmit;
