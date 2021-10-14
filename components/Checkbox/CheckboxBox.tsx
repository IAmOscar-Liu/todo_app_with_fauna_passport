import { Box } from "@chakra-ui/react";

interface Props {
  id: string;
  [key: string]: any;
}

export const CheckboxBox = (props: Props) => (
  <Box
    cursor="pointer"
    transition="all 0.2s"
    _focus={{
      shadow: "outline",
    }}
    _checked={{
      bg: "gray.50",
      borderColor: "blue.500",
    }}
    {...props}
  />
);
