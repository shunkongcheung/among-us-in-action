import React, { memo } from "react";
import { Image, Modal } from "native-base";

import useCorpse from "./useCorpse";

interface InfoModalProps {}

const InfoModal: React.FC<InfoModalProps> = () => {
  const [open, setOpen] = React.useState(false);
  const { isKilled, isCoprseFound } = useCorpse();

  React.useEffect(() => {
    if (isKilled || isCoprseFound) setOpen(true);
  }, [isCoprseFound, isKilled]);

  const msg = isKilled ? "You are killed xp" : "Corpse found :o";

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <Modal.Content>
        <Modal.Header alignItems="center">{msg}</Modal.Header>
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

export default memo(InfoModal);
