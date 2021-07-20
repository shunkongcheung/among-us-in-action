import React, { memo } from "react";
import { Box, HStack, IconButton, Divider, Image, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { HATS } from "../../constants";
import { Player } from "../../types";

interface ParticipantItemProps extends Player {
  isAlive: boolean;
}

const ParticipantItem: React.FC<ParticipantItemProps> = ({
  name,
  hat,
  color,
  isAlive,
}) => {
  const hatSource = React.useMemo(
    () => HATS.find((itm) => itm.name === hat)!.source,
    [hat]
  );

  const iconName = React.useMemo(() => {
    if (isAlive) return "hand-right-outline"; // for vote
    return "skull-outline";
  }, []);

  return (
    <>
      <HStack py={3} px={5} alignItems="center">
        <Box mt={10}>
          <Box position="absolute" left="25%" top="-45%" zIndex={1}>
            <Image source={hatSource} alt={`Hat of ${name}`} size="xs" />
          </Box>
          <Image
            source={require("../../../assets/player-icon.png")}
            size="sm"
            alt={`Player of ${name}`}
          />
        </Box>
        <Text fontWeight="bold" mr="auto" ml={2} style={{ color }}>
          {name}
        </Text>
        <IconButton
          icon={<Ionicons name={iconName} size={30} />}
          disabled={!isAlive}
        />
      </HStack>
      <Divider />
    </>
  );
};

export default memo(ParticipantItem);
