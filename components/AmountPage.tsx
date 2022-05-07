import type { NextPage } from "next";
import type { LnUrlPayServiceResponse } from "lnurl-pay/dist/types/types";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  HStack,
  VStack,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "components/Header";

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

  return (
    <Flex flexDirection="column" alignItems="center">
      <Header />
      <TableContainer mt={6} maxW="calc(100vw - 48px)">
        <Table variant="unstyled" size="sm" w={200}>
          <Tbody>
            <Tr>
              <Td px={0}>Min amount:</Td>
              <Td>
                {lnUrlOrAddressParams?.min}{" "}
                {lnUrlOrAddressParams?.min === 1 ? "sat" : "sats"}
              </Td>
            </Tr>
            <Tr>
              <Td px={0}>Max amount:</Td>
              <Td>
                {lnUrlOrAddressParams?.max}{" "}
                {lnUrlOrAddressParams?.max === 1 ? "sat" : "sats"}
              </Td>
            </Tr>
            <Tr>
              <Td px={0}>Domain:</Td>
              <Td>{lnUrlOrAddressParams?.domain}</Td>
            </Tr>
            <Tr>
              <Td px={0}>Description:</Td>
              <Td>{lnUrlOrAddressParams?.description}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} width={280}>
          <HStack alignItems="top" mt={6}>
            <InputGroup size="lg">
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
  );
};

export default AmountPage;
