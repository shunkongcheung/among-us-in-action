import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

import { Player } from "../../types";
import useUserContext from "../../useUserContext";

const REGISTER = gql`
  mutation Register($player: PlayerInputType!) {
    register(player: $player) {
      id
      name
      hat
      color
    }
  }
`;

function useRegister() {
  const { setUser } = useUserContext();
  const [register] = useMutation<{ register: Player }>(REGISTER);

  const submit = useCallback(
    async (user: Player) => {
      const player = {
        name: user.name,
        color: user.color,
        hat: user.hat,
      };
      const { data } = await register({ variables: { player } });
      const result = data!.register;
      setUser(result);
    },
    [setUser]
  );

  return submit;
}

export default useRegister;
