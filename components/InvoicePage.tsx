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
  Image,
  Link,
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

const AmountPage: NextPage<InvoicePageProps> = ({
  invoice,
  lnUrlOrAddress,
  amount,
  error,
}) => {
  const router = useRouter();
  const baseUrl = useGetBaseUrl();

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
        <meta
          name="twitter:image:alt"
          content="LNURL or Lightning Address and tip amount"
        />
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
        <VStack justifyContent="flex-start" my={6} spacing={2}>
          <Text>Alternatively, open in wallet:</Text>
          <HStack spacing={2}>
            <Link href={`lightning:${invoice}`} isExternal variant="button">
              <Button>default ⚡</Button>
            </Link>
            ️<Text>or</Text>
            <Link href={`strike:lightning:${invoice}`} variant="button">
              <Button
                leftIcon={
                  <Image
                    src="/strike-logo.png"
                    alt="Strike logo"
                    boxSize="22px"
                  />
                }
              >
                Strike
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Flex>
    </>
  ) : null;
};

export default AmountPage;
