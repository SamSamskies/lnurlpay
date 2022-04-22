import type { NextPage } from "next";
import Head from "next/head";
import {
  Center,
  Heading,
  Stack,
  Input,
  Box,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Home: NextPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: request pay service params and transition to next page to allow user to enter amount
    console.log("e.target.value", e.currentTarget.lnUrlOrAddress.value);
  };

  return (
    <div>
      <Head>
        <title>LNURL Pay</title>
        <meta
          name="description"
          content="Convert an LNURL or Lightning Address to a BOLT11 invoice"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Center px={4} py={24}>
        <Box>
          <Stack spacing={2}>
            <Heading as="h1" size="2xl">
              LNURL Pay ⚡️
            </Heading>
            <Heading size="md" color="gray.300">
              Convert an LNURL or Lightning Address to a BOLT11 invoice.
            </Heading>
          </Stack>
          <form onSubmit={handleSubmit}>
            <HStack mt={6} spacing={2}>
              <Input
                autoFocus
                name="lnUrlOrAddress"
                variant="outline"
                placeholder="Enter LNURL or lightning address"
                size="lg"
              />
              <IconButton
                aria-label="Next"
                colorScheme="yellow"
                size="lg"
                type="submit"
                icon={<ArrowForwardIcon />}
              />
            </HStack>
          </form>
        </Box>
      </Center>
    </div>
  );
};

export default Home;
