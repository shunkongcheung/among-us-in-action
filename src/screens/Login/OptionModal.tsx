import React, { ReactNode, memo } from "react";
import { Box, HStack, Modal } from "native-base";
import { TouchableOpacity } from "react-native";

interface OptionModalProps {
  handleChange: (s: string) => any;
  handleClose: () => any;
  isOpen: boolean;
  options: Array<{ children: ReactNode; value: any }>;
}

const OptionModal: React.FC<OptionModalProps> = ({
  handleClose,
  handleChange,
  isOpen,
  options,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Content maxWidth="400px">
        <Modal.Body>
          <HStack flexWrap="wrap">
            {options.map(({ children, value }) => (
              <TouchableOpacity
                onPress={() => {
                  handleChange(value);
                  handleClose();
                }}
              >
                <Box mr={2} height={10} width={10} mb={2}>
                  {children}
                </Box>
              </TouchableOpacity>
            ))}
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default memo(OptionModal);
