import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            backgroundColor: "gray.700",
          },
        },
      },
    },
    Link: {
      variants: {
        button: {
          _hover: {
            textDecoration: "none",
          },
        },
      },
    },
  },
});

export default theme;
