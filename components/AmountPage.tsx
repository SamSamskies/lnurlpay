import type { NextPage } from "next";
import type { LnUrlPayServiceResponse } from "lnurl-pay/dist/types/types";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  HStack,
  VStack,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Button,
  Textarea,
  Image,
  Text,
  Heading,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "components/Header";
import Head from "next/head";
import { useGetBaseUrl } from "hooks";

interface AmountPageProps {
  lnUrlOrAddressParams?: LnUrlPayServiceResponse;
  error?: string;
}

const AmountPage: NextPage<AmountPageProps> = ({
  lnUrlOrAddressParams,
  error,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const lnUrlOrAddress = router.query.lnUrlOrAddress;
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

  const areCommentsAllowed =
    lnUrlOrAddressParams?.commentAllowed &&
    lnUrlOrAddressParams?.commentAllowed > 0;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amount = e.currentTarget.amount.value;
    const comment = e.currentTarget.comment?.value;
    const url = comment
      ? `/${lnUrlOrAddress}/${amount}?comment=${comment}`
      : `/${lnUrlOrAddress}/${amount}`;

    setIsLoading(true);
    router.push(url);
  };
  const normalizeAmount = (amount?: number) =>
    amount === 1 ? `${amount} sat` : `${amount} sats`;
  const ogContent = `${baseUrl}/api/og?lnUrlOrAddress=${lnUrlOrAddress}&v=3`;

  return (
    <>
      <Head>
        <meta property="og:image" content={ogContent} />
        <meta name="twitter:image" content={ogContent} />
      </Head>
      <Flex flexDirection="column" alignItems="center">
        <Box mb={6}>
          <Header />
        </Box>
        {lnUrlOrAddressParams?.image && (
          <Image
            src={lnUrlOrAddressParams?.image}
            alt="user avatar"
            maxH={150}
            maxW={150}
            mb={3}
          />
        )}
        <Heading size="sm">{lnUrlOrAddressParams?.description}</Heading>
        <Text fontSize="sm">{lnUrlOrAddressParams?.domain}</Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} width={280}>
            <HStack alignItems="top" mt={6}>
              <label style={{ fontSize: 14, color: "#A0AEC0" }}>
                Min {normalizeAmount(lnUrlOrAddressParams?.min)} / Max{" "}
                {normalizeAmount(lnUrlOrAddressParams?.max)}
                <InputGroup size="lg" mt={1}>
                  <NumberInput
                    name="amount"
                    defaultValue={lnUrlOrAddressParams?.min}
                    min={lnUrlOrAddressParams?.min}
                    max={lnUrlOrAddressParams?.max}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <InputRightAddon>sats</InputRightAddon>
                </InputGroup>
              </label>
            </HStack>
            {areCommentsAllowed && (
              <Textarea
                name="comment"
                placeholder={`Optional message (max chars ${lnUrlOrAddressParams?.commentAllowed})`}
                maxLength={lnUrlOrAddressParams?.commentAllowed}
              />
            )}
            <Button
              colorScheme="yellow"
              size="lg"
              type="submit"
              isLoading={isLoading}
              aria-label="Next"
              w="100%"
            >
              Next
            </Button>
          </VStack>
        </form>
      </Flex>
    </>
  );
};

export default AmountPage;
