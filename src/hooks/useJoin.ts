import { useCallback } from "react";
import { gql, useMutation } from "@apollo/client";
import useUserContext from "./useUserContext";

interface CreateRoom {
  createRoom: { code: string };
}

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

function useJoin() {
  const [join] = useMutation(JOIN);
  const [createRoom] = useMutation<CreateRoom>(CREATE_ROOM);
  const { id: playerId } = useUserContext();

  const joinRoom = useCallback(
    (code: string) => join({ variables: { playerId, code } }),
    [join, playerId]
  );

  const joinGame = useCallback(
    async (gameId: number) => {
      const { data: rData } = await createRoom({ variables: { gameId } });
      const code = rData!.createRoom.code;
      return joinRoom(code);
    },
    [join, playerId]
  );

  return { joinRoom, joinGame };
}

export default useJoin;
