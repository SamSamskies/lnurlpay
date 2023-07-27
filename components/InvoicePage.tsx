import { useState, useEffect, ChangeEvent } from "react";
import type { NextPage } from "next";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Button,
  Link,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import copy from "copy-to-clipboard";
import Header from "components/Header";
import toast from "react-simple-toasts";
import Head from "next/head";
import { useGetBaseUrl } from "hooks";

interface InvoicePageProps {
  invoice?: string;
  lnUrlOrAddress?: string;
  amount?: string;
  error?: string;
}

const DEFAULT_LIGHTNING_WALLETS: Record<
  string,
  { displayName: string; uriPrefix: string }
> = {
  default: { displayName: "Default Wallet", uriPrefix: "lightning:" },
  strike: { displayName: "Strike", uriPrefix: "strike:lightning:" },
  cashapp: {
    displayName: "Cash App",
    uriPrefix: "https://cash.app/launch/lightning/",
  },
  muun: { displayName: "Muun", uriPrefix: "muun:" },
  bluewallet: {
    displayName: "Blue Wallet",
    uriPrefix: "bluewallet:lightning:",
  },
  walletofsatoshi: {
    displayName: "Wallet of Satoshi",
    uriPrefix: "walletofsatoshi:lightning:",
  },
  zebedee: { displayName: "Zebedee", uriPrefix: "zebedee:lightning:" },
  zeusln: { displayName: "Zeus LN", uriPrefix: "zeusln:lightning:" },
  lnlink: { displayName: "LNLink", uriPrefix: "lnlink:lightning:" },
  phoenix: { displayName: "Phoenix", uriPrefix: "phoenix://" },
  breez: { displayName: "Breez", uriPrefix: "breez:" },
  bitcoinbeach: { displayName: "Bitcoin Beach", uriPrefix: "bitcoinbeach://" },
  blixtwallet: {
    displayName: "Blixt Wallet",
    uriPrefix: "blixtwallet:lightning:",
  },
  river: { displayName: "River", uriPrefix: "river://" },
};
const DEFAULT_WALLET_CACHE_KEY = "defaultWalletKey";

const InvoicePage: NextPage<InvoicePageProps> = ({
  invoice,
  lnUrlOrAddress,
  amount,
  error,
}) => {
  const router = useRouter();
  const baseUrl = useGetBaseUrl();
  const [defaultWallet, setDefaultWallet] = useState<string>();
  const walletUri =
    DEFAULT_LIGHTNING_WALLETS[defaultWallet ?? "default"]?.uriPrefix ??
    DEFAULT_LIGHTNING_WALLETS["default"].uriPrefix;
  const handleWalletChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const walletKey = event.target.value;

    localStorage.setItem(DEFAULT_WALLET_CACHE_KEY, walletKey);
    setDefaultWallet(walletKey);
  };

  useEffect(() => {
    const cachedWalletKey = localStorage.getItem(DEFAULT_WALLET_CACHE_KEY);

    setDefaultWallet(cachedWalletKey ?? "default");
  }, []);

  if (error) {
    return (
      <Alert mt={4} status="error">
        <AlertIcon />
        <AlertTitle mr={2}>{error}</AlertTitle>
        <CloseButton
          position="absolute"
          right="8px"
          top="8px"
          onClick={() => router.push("/")}
        />
      </Alert>
    );
  }

  const ogContent = `${baseUrl}/api/og?lnUrlOrAddress=${lnUrlOrAddress}&amount=${amount}`;

  return invoice ? (
    <>
      <Head>
        <meta property="og:image" content={ogContent} />
        <meta name="twitter:image" content={ogContent} />
      </Head>
      <Flex flexDirection="column" alignItems="center">
        <Header />
        <Box
          mt={6}
          onClick={() => {
            copy(invoice);
            toast("⚡ invoice copied to clipboard");
          }}
          sx={{ cursor: "pointer" }}
        >
          <QRCodeSVG value={invoice} includeMargin size={256} />
        </Box>
        <Text fontSize="sm">Click QR code to copy invoice</Text>
        {defaultWallet && (
          <VStack justifyContent="flex-start" my={6} spacing={2}>
            <Text>Alternatively, open in wallet:</Text>
            <HStack spacing={2}>
              <Select onChange={handleWalletChange} value={defaultWallet}>
                {Object.entries(DEFAULT_LIGHTNING_WALLETS).map(
                  ([key, { displayName }]) => (
                    <option key={key} value={key}>
                      {displayName}
                    </option>
                  )
                )}
              </Select>
              <Link href={`${walletUri}${invoice}`} isExternal variant="button">
                <Button>Open ⚡</Button>
              </Link>
            </HStack>
          </VStack>
        )}
      </Flex>
    </>
  ) : null;
};

export default InvoicePage;
