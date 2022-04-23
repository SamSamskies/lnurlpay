import { ChakraProvider, CSSReset, Center, Box } from "@chakra-ui/react";
import theme from "styles/theme";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Head>
        <title>LNURL Pay</title>
        <meta
          name="description"
          content="Convert an LNURL or Lightning Address to a BOLT11 invoice"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Center px={4} py={20}>
        <Box w={600} maxW={600}>
          <Component {...pageProps} />
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default MyApp;
