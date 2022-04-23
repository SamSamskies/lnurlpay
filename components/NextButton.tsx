import { ArrowForwardIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import type { IconButtonProps } from "@chakra-ui/react";

interface NextButtonProps extends Omit<IconButtonProps, "aria-label"> {}

export default function NextButton(props: NextButtonProps) {
  return (
    <IconButton
      colorScheme="yellow"
      size="lg"
      type="submit"
      {...props}
      icon={<ArrowForwardIcon />}
      aria-label="Next"
    />
  );
}
