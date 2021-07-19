import React, { memo } from "react";
import { Button, Input, Modal } from "native-base";
import { useFormik } from "formik";

import useUserContext from "../../useUserContext";

interface JoinRoomModalProps {
  open: boolean;
  handleClose: () => any;
}

const JoinRoomModal: React.FC<JoinRoomModalProps> = ({ open, handleClose }) => {
  const { id: playerId } = useUserContext();
  const { values, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: ({ code }) => {
      const payload = { code, playerId };
    },
  });

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Enter Room Code</Modal.Header>
        <Modal.Body>
          <Input
            p={2}
            placeholder="Code"
            onBlur={handleBlur("code")}
            onChangeText={handleChange("code")}
            value={values.code}
          />
          <Button variant="solid" onPress={handleSubmit as any} mt={10}>
            SUBMIT
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default memo(JoinRoomModal);
