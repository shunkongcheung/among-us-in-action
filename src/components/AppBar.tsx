import React, { memo } from "react";
import {
  ArrowBackIcon,
  HStack,
  IconButton,
  Text,
  Box,
  StatusBar,
  ArrowForwardIcon,
  useTheme,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

interface AppBarProps {
  bgColor?: string;
  children: string;
  goNext?: () => any;
  isBackable?: boolean;
  textColor?: string;
}

const AppBar: React.FC<AppBarProps> = ({
  bgColor = "",
  children,
  goNext,
  isBackable = false,
  textColor = "white",
}) => {
  const isNoIcon = !goNext && !isBackable;
  const { goBack } = useNavigation();

  const theme = useTheme();
  if (!bgColor) bgColor = theme.colors.primary[500];
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
          my={isNoIcon ? 3 : 0}
          ml={isBackable ? 0 : 5}
          alignItems="center"
        >
          {isBackable && (
            <IconButton
              icon={<ArrowBackIcon color={textColor} />}
              onPress={() => goBack()}
            />
          )}
          <Text color={textColor} fontSize={20} fontWeight="bold">
            {children}
          </Text>
        </HStack>
        {!!goNext && (
          <IconButton
            icon={<ArrowForwardIcon color={textColor} />}
            onPress={goNext}
          />
        )}
      </HStack>
    </>
  );
};

export default memo(AppBar);
