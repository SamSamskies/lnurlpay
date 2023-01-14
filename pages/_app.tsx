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
          content="Convert an LNURL or Lightning Address to a BOLT11 invoice"
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta
          property="og:title"
          content="LNURL Pay ⚡ - Convert an LNURL or Lightning Address to a BOLT11 invoice."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PlebPay" />
        <meta name="twitter:title" content="LNURL Pay ⚡" />
        <meta
          name="twitter:description"
          content="Convert an LNURL or Lightning Address to a BOLT11 invoice."
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
