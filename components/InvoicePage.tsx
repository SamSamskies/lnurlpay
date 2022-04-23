import type { NextPage } from "next";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface InvoicePageProps {
  invoice?: string;
  error?: string;
}

const AmountPage: NextPage<InvoicePageProps> = ({ invoice, error }) => {
  const router = useRouter();

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

  return <Text>{invoice}</Text>;
};

export default AmountPage;
