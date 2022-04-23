import type { NextPage } from "next";
import type { LnUrlPayServiceResponse } from "lnurl-pay/dist/types/types";
import { Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface InvoicePageProps {
  lnUrlOrAddressParams?: LnUrlPayServiceResponse;
  error?: string;
}

const InvoicePage: NextPage<InvoicePageProps> = ({
  lnUrlOrAddressParams,
  error,
}) => {
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
  return <pre>{JSON.stringify(lnUrlOrAddressParams, null, 2)}</pre>;
};

export default InvoicePage;
