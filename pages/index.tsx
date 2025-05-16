import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Input,
  HStack,
  Text,
  Box,
  Heading,
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { utils } from "lnurl-pay";
import Header from "components/Header";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import QrCodeButton from "components/QrCodeButton";
import { QrReader } from "react-qr-reader";
import { Result } from "@zxing/library";
import Head from "next/head";
import { useGetBaseUrl } from "hooks";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [willShowQrCodeScanner, setWillShowQrCodeScanner] = useState(false);
  const [lnUrlOrAddress, setLnUrlOrAddress] = useState<string | undefined>();
  const router = useRouter();
  const { isLnurl, isLightningAddress, parseLnUrl } = utils;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLnUrlOrAddress(e.currentTarget.lnUrlOrAddress.value.trim());
  };
  const handleScannedQrcode = (result: Result | null | undefined) => {
    if (result) {
      setWillShowQrCodeScanner(false);
      setLnUrlOrAddress(result.getText());
    }
  };

  useEffect(() => {
    if (!lnUrlOrAddress) {
      return;
    }

    if (!isLnurl(lnUrlOrAddress) && !isLightningAddress(lnUrlOrAddress)) {
      setIsInvalid(true);

      return;
    }

    setIsLoading(true);

    const lnurl = isLnurl(lnUrlOrAddress) ? parseLnUrl(lnUrlOrAddress) : lnUrlOrAddress;
    router.push(`/${lnurl}`);
  }, [lnUrlOrAddress, isLnurl, isLightningAddress, router]);

  const baseUrl = useGetBaseUrl();
  const ogContent = `${baseUrl}/thereisno2ndbest.jpg`;

  return (
    <>
      <Head>
        <meta property="og:image" content={ogContent} />
        <meta
          name="twitter:image"
          content={`${ogContent}?justtryingtomakethisfriggenimagedisplay=1`}
        />
      </Head>
      <Header />
      <Heading mt={2} size="md" color="gray.300">
        Convert an LNURL or Lightning Address to a BOLT11 invoice.
      </Heading>
      <form onSubmit={handleSubmit}>
        <HStack alignItems="top" mt={6} spacing={2}>
          <Box w="100%">
            <InputGroup>
              <Input
                autoFocus
                name="lnUrlOrAddress"
                variant="outline"
                placeholder="Enter LNURL or lightning address"
                size="lg"
                isInvalid={isInvalid}
                onChange={() => {
                  if (isInvalid) {
                    setIsInvalid(false);
                  }
                }}
                required
              />
              <InputRightElement h="100%" mr={2}>
                <QrCodeButton
                  onClick={() =>
                    setWillShowQrCodeScanner(!willShowQrCodeScanner)
                  }
                />
              </InputRightElement>
            </InputGroup>
            {isInvalid && (
              <Text mt={2} fontSize="sm" color="red.400">
                Invalid LNURL or Lightning Address
              </Text>
            )}
          </Box>
          <IconButton
            colorScheme="yellow"
            size="lg"
            type="submit"
            isLoading={isLoading}
            icon={<ArrowForwardIcon />}
            aria-label="Next"
          />
        </HStack>
      </form>
      {willShowQrCodeScanner && (
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={handleScannedQrcode}
          containerStyle={{ marginTop: -48 }}
        />
      )}
    </>
  );
};

export default Home;
