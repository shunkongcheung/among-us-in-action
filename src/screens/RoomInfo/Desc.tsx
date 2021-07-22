import React from "react";
import { HStack, Text, useTheme } from "native-base";

interface DescProps {
  title: string;
  children: string;
}

const Desc: React.FC<DescProps> = ({ title, children }) => {
  const theme = useTheme();
  return (
    <HStack justifyContent="space-between" pb={2} alignItems="flex-end">
      <Text fontWeight="bold" color={theme.colors.muted[500]}>
        {title}
      </Text>
      <Text fontWeight="bold" fontSize="xl">
        {children}
      </Text>
    </HStack>
  );
};

export default Desc;
