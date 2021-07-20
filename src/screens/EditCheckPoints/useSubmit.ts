import { useCallback } from "react";
import { gql, useMutation } from "@apollo/client";

import { Game } from "../../types";
import { useJoin } from "../../hooks";

interface CreateGame {
  createGame: { id: number };
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
    async (gameInput: Game) => {
      const game = JSON.parse(JSON.stringify(gameInput));
      delete game.id;
      game.checkPoints.map((itm: any) => delete itm.id);

      const { data } = await createGame({ variables: { game } });
      const gameId = data!.createGame.id;

      return joinGame(gameId);
    },
    [createGame, joinGame]
  );

  return submit;
}

export default useSubmit;
