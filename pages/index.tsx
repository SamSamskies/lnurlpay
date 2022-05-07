import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Input,
  HStack,
  Text,
  Box,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { utils } from "lnurl-pay";
import Header from "components/Header";
import { ArrowForwardIcon } from "@chakra-ui/icons";

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
    <div>
      <Header />
      <Heading mt={2} size="md" color="gray.300">
        Convert an LNURL or Lightning Address to a BOLT11 invoice.
      </Heading>
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
    </div>
  );
};

export default Home;
