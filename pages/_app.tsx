import type { AppProps } from "next/app";
import Head from "next/head";
import "styles/globals.css";

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
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
