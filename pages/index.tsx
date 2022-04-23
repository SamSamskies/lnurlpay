import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Input, HStack, Text, Box } from "@chakra-ui/react";
import { useState } from "react";
import NextButton from "components/NextButton";
import { utils } from "lnurl-pay";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const router = useRouter();
  const { isLnurl, isLightningAddress } = utils;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lnUrlOrAddress = e.currentTarget.lnUrlOrAddress.value;

    if (!isLnurl(lnUrlOrAddress) && !isLightningAddress(lnUrlOrAddress)) {
      setIsInvalid(true);

      return;
    }

    setIsLoading(true);
    router.push(`/${lnUrlOrAddress}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack alignItems="top" mt={6} spacing={2}>
        <Box w="100%">
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
          />
          {isInvalid && (
            <Text mt={2} fontSize="sm" color="red.400">
              Invalid LNURL or Lightning Address
            </Text>
          )}
        </Box>
        <NextButton isLoading={isLoading} />
      </HStack>
    </form>
  );
};

export default Home;
