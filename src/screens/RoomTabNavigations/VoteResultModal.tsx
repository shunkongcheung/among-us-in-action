import React, { memo } from "react";
import { Image, Modal, PresenceTransition, Text } from "native-base";

import { Player } from "../../types";

interface VoteResultModalProps {
  voteOutPlayer?: Player;
  isImposter: boolean;
  handleClose: () => any;
}

function capitalize(str: string) {
  return str
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");
}

const VoteResultModal: React.FC<VoteResultModalProps> = ({
  voteOutPlayer,
  isImposter,
  handleClose,
}) => {
  const [isResult, setIsResult] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setIsResult(!!voteOutPlayer), 1000);
  }, [voteOutPlayer]);

  return (
    <Modal isOpen={!!voteOutPlayer} onClose={handleClose}>
      <Modal.Content>
        <Modal.Header alignItems="center">
          <Text fontWeight="bold" fontSize="xl">
            {`${capitalize(voteOutPlayer?.name || "")} is ...`}
          </Text>
          <PresenceTransition
            visible={isResult}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Text textAlign="center" fontWeight="bold" fontSize="xl">
              {`${isImposter ? "" : "not "}the imposter.`}
            </Text>
          </PresenceTransition>
        </Modal.Header>
        <Modal.Body alignItems="center">
          <Image
            source={require("../../../assets/chacter-modal.png")}
            alt="Character Modal Image"
            size={"2xl"}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default memo(VoteResultModal);
