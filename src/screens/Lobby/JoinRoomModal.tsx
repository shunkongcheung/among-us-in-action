import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Box, Button, Input, Modal } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { BarCodeScanner } from "expo-barcode-scanner";

import { useJoin } from "../../hooks";

interface JoinRoomModalProps {
  open: boolean;
  handleClose: () => any;
}

const JoinRoomModal: React.FC<JoinRoomModalProps> = ({ open, handleClose }) => {
  const [isReady, setIsReady] = React.useState(false);
  const { navigate } = useNavigation();
  const { joinRoom } = useJoin();

  const {
    isSubmitting,
    values,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: { code: "" },
    onSubmit: async ({ code }) => {
      await joinRoom(code);
      handleClose();
      navigate("Room", { screen: "RoomInfo" });
    },
  });

  const onScan = React.useCallback(
    ({ data }) => {
      setFieldValue("code", data);
      handleSubmit();
    },
    [setFieldValue, handleSubmit]
  );

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setIsReady(status === "granted");
    })();
  }, [setIsReady]);

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
            isDisabled={isSubmitting}
            value={values.code}
          />
          {isReady && (
            <Box
              flex={1}
              maxHeight="80%"
              width={250}
              height={250}
              mt={5}
              mx="auto"
            >
              <BarCodeScanner
                onBarCodeScanned={onScan}
                style={StyleSheet.absoluteFillObject}
              />
            </Box>
          )}
          <Button
            variant="solid"
            onPress={handleSubmit as any}
            mt={10}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            SUBMIT
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default memo(JoinRoomModal);
