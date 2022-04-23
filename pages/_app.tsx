import {
  ChakraProvider,
  CSSReset,
  Center,
  Heading,
  Stack,
  Box,
} from "@chakra-ui/react";
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
      <Center px={4} py={24}>
        <Box maxW={600}>
          <Stack spacing={2}>
            <Heading as="h1" size="2xl">
              LNURL Pay ⚡️
            </Heading>
            <Heading size="md" color="gray.300">
              Convert an LNURL or Lightning Address to a BOLT11 invoice.
            </Heading>
          </Stack>
          <Component {...pageProps} />
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default MyApp;
