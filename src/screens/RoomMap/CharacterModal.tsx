import React, { memo } from "react";
import { Image, Modal } from "native-base";

interface CharacterModalProps {
  isImposter: boolean;
  isOpen: boolean;
  handleClose: () => any;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  isOpen,
  isImposter,
  handleClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Content>
        <Modal.Header alignItems="center">
          {`You are a ${isImposter ? "imposter" : "crewmate"}`}
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

export default memo(CharacterModal);
