import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, Modal, PresenceTransition, Image } from "native-base";

interface ResultModalProps {
  isOpen: boolean;
  isImposter: boolean;
  isImposterWin: boolean;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  isImposter,
  isImposterWin,
}) => {
  const { navigate } = useNavigation();

  const [isResult, setIsResult] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setIsResult(isOpen), 1000);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={() => navigate("Lobby")}>
      <Modal.Content>
        <Modal.Header alignItems="center">
          <Text fontWeight="bold" fontSize="xl">
            {isImposterWin ? "Imposter" : "Crewmate"} won.
          </Text>
          <PresenceTransition
            visible={isResult}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Text textAlign="center" fontWeight="bold" fontSize="xl">
              {`You ${isImposter === isImposterWin ? "won" : "lost"}`}
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

export default memo(ResultModal);
