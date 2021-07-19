import React, { memo } from "react";
import {
  HStack,
  VStack,
  Text,
  Box,
  IconButton,
  ChevronRightIcon,
  useTheme,
} from "native-base";

interface OptionItemProps {
  name: string;
  onPress: () => any;
}

const OptionItem: React.FC<OptionItemProps> = ({ name, onPress }) => {
  const theme = useTheme();
  return (
    <HStack py={3} px={2} height={20}>
      <VStack ml={5}>
        <Text fontWeight="bold" fontSize="lg" mb={1}>
          {name}
        </Text>
      </VStack>
      <Box ml="auto">
        <IconButton
          onPress={onPress}
          icon={<ChevronRightIcon color={theme.colors.primary[500]} />}
        />
      </Box>
    </HStack>
  );
};

export default memo(OptionItem);
