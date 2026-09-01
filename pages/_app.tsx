import { ChakraProvider, CSSReset, Center, Box } from "@chakra-ui/react";
import theme from "styles/theme";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LNURL Pay</title>
        <meta
          name="description"
          content="This tool has been retired. For LNURL specifications, see https://github.com/lnurl/luds"
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:title" content="LNURL Pay ⚡ — Retired" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LNURL Pay ⚡ — Retired" />
        <meta
          name="twitter:description"
          content="This tool has been retired. For LNURL specifications, see https://github.com/lnurl/luds"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Center px={4} py={20}>
          <Box w={600} maxW={600}>
            <Component {...pageProps} />
          </Box>
        </Center>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
