import { HStack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  title?: string;
  actions?: ReactNode;
};

const AppBar = ({ title, actions }: Props) => {
  return (
    <HStack
      alignItems="center"
      spacing={2}
      height={16}
      bgColor="white"
      borderBottom="1px"
      borderColor="gray.200"
      position="relative"
    >
      <Text
        mx={6}
        flex={1}
        textAlign="left"
        fontSize="xl"
        fontWeight="medium"
        color="gray.600"
      >
        {title}
      </Text>

      {actions != null ? (
        <HStack position="absolute" right={2} spacing={0} bottom={0} top={0}>
          {actions}
        </HStack>
      ) : null}
    </HStack>
  );
};

export default AppBar;
