import { Alert, AlertIcon, AlertDescription, Text } from "@chakra-ui/react";
import { RETIREMENT_DATE_LABEL } from "lib/deprecation";

export default function DeprecationNotice() {
  return (
    <Alert status="warning" mb={6} borderRadius="md" alignItems="flex-start">
      <AlertIcon mt={0.5} />
      <AlertDescription>
        <Text fontWeight="semibold">This tool is being retired.</Text>
        <Text mt={1} fontSize="sm">
          Invoice generation will stop on {RETIREMENT_DATE_LABEL}. It still
          works until then. After that date, this site will remain online with a
          retirement notice only — it will no longer create invoices.
        </Text>
      </AlertDescription>
    </Alert>
  );
}
