import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

import { useUserContext } from "../../hooks";

interface UserPayload {
  name: string;
  hat: string;
  color: string;
}

interface UserRet extends UserPayload {
  id: number;
}

const EDIT_USER = gql`
  mutation EditUser($playerId: Float, $player: PlayerInputType!) {
    editUser(playerId: $playerId, player: $player) {
      id
      name
      hat
      color
    }
  }
`;

function useRegister() {
  const { id, setUser } = useUserContext();
  const [editUser] = useMutation<{ editUser: UserRet }>(EDIT_USER);

  const submit = useCallback(
    async (player: UserPayload) => {
      const playerId = id > 0 ? id : null;

      const { data } = await editUser({ variables: { player, playerId } });
      const result = data!.editUser;
      setUser(result);
    },
    [id, setUser]
  );

  return submit;
}

export default useRegister;
