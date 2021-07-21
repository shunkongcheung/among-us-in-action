import React, { memo } from "react";
import { IconButton, VStack, useTheme } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { Task } from "../../constants";
import Sword from "./Sword";

interface RoomControlsProps {
  isImposter: boolean;
  makeKill?: () => any;
  task?: Task;
}

const RoomControls: React.FC<RoomControlsProps> = ({
  isImposter,
  makeKill,
  task,
}) => {
  const theme = useTheme();
  return (
    <VStack>
      {isImposter ? (
        <IconButton
          onPress={makeKill}
          icon={<Sword color={theme.colors.red[500]} />}
          disabled={!makeKill}
        />
      ) : (
        <IconButton
          icon={<Ionicons name="construct-outline" size={40} />}
          disabled={!task}
        />
      )}
    </VStack>
  );
};

export default memo(RoomControls);
