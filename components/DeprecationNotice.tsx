import { Alert, AlertIcon, AlertDescription, Text } from "@chakra-ui/react";
import { RETIREMENT_DATE_LABEL } from "lib/deprecation";

export default function DeprecationNotice() {
  return (
    <Alert status="warning" mb={6} borderRadius="md" alignItems="flex-start">
      <AlertIcon mt={0.5} />
      <AlertDescription>
        <Text fontWeight="semibold">This tool is being retired.</Text>
        <Text mt={1} fontSize="sm">
          LNURL Pay will shut down on {RETIREMENT_DATE_LABEL}. Invoice
          generation still works until then. After that date, this site will no
          longer create invoices.
        </Text>
      </AlertDescription>
    </Alert>
  );
}
