import React, { memo } from "react";
import {
  ArrowBackIcon,
  HStack,
  IconButton,
  Text,
  Box,
  StatusBar,
} from "native-base";

interface AppBarProps {
  bgColor?: string;
  children: string;
  isBackable?: boolean;
  textColor?: string;
}

const AppBar: React.FC<AppBarProps> = ({
  bgColor = "primary.500",
  children,
  isBackable = false,
  textColor = "white",
}) => {
  return (
    <>
      <StatusBar backgroundColor={bgColor} barStyle="light-content" />

      <Box safeAreaTop backgroundColor={bgColor} />

      <HStack
        bg={bgColor}
        px={1}
        py={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack
          space={4}
          my={isBackable ? 0 : 3}
          ml={isBackable ? 0 : 5}
          alignItems="center"
        >
          {isBackable && (
            <IconButton icon={<ArrowBackIcon color={textColor} />} />
          )}
          <Text color={textColor} fontSize={20} fontWeight="bold">
            {children}
          </Text>
        </HStack>
      </HStack>
    </>
  );
};

export default memo(AppBar);
