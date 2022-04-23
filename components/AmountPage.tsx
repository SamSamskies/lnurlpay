import type { NextPage } from "next";
import type { LnUrlPayServiceResponse } from "lnurl-pay/dist/types/types";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  HStack,
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextButton from "./NextButton";
import { useState } from "react";

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    router.push(`/${lnUrlOrAddress}/${e.currentTarget.amount.value}`);
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
    <div>
      <TableContainer mt={6}>
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
        <HStack alignItems="top" mt={6} spacing={2}>
          <InputGroup size="lg" flexBasis={200}>
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
          <NextButton isLoading={isLoading} />
        </HStack>
      </form>
    </div>
  );
};

export default AmountPage;
