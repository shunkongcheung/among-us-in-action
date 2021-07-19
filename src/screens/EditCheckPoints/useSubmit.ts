import { useCallback } from "react";
import { gql, useMutation } from "@apollo/client";

import { Game } from "../../types";
import { useUserContext } from "../../hooks";

interface CreateGame {
  createGame: { id: number };
}

interface CreateRoom {
  createRoom: { code: string };
}

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
      code
    }
  }
`;

const JOIN = gql`
  mutation Join($playerId: Float!, $code: String!) {
    join(playerId: $playerId, code: $code) {
      id
    }
  }
`;

function useSubmit() {
  const { id: playerId } = useUserContext();

  const [createGame] = useMutation<CreateGame>(CREATE_GAME);
  const [createRoom] = useMutation<CreateRoom>(CREATE_ROOM);

  const [join] = useMutation(JOIN);

  const submit = useCallback(
    async (gameInput: Game) => {
      const game = JSON.parse(JSON.stringify(gameInput));
      delete game.id;
      game.checkPoints.map((itm: any) => delete itm.id);

      const { data: gData } = await createGame({ variables: { game } });
      const gameId = gData!.createGame.id;

      const { data: rData } = await createRoom({ variables: { gameId } });
      const code = rData!.createRoom.code;

      await join({ variables: { playerId, code } });
    },
    [createGame, createRoom, join, playerId]
  );

  return submit;
}

export default useSubmit;
