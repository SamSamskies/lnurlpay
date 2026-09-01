import { Heading, Link, Text, VStack } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const LUDS_URL = "https://github.com/lnurl/luds";

export default function RetirementNotice() {
  return (
    <VStack align="stretch" spacing={4} mt={6}>
      <Heading size="md" color="gray.200">
        This tool has been retired.
      </Heading>
      <Text color="gray.400" lineHeight="tall">
        LNURL Pay no longer generates BOLT11 invoices from LNURLs or Lightning
        Addresses. Thank you for using it.
      </Text>
      <Text color="gray.400" lineHeight="tall">
        For LNURL specifications, see the{" "}
        <Link href={LUDS_URL} isExternal color="yellow.300">
          LNURL LUDs repository
          <ExternalLinkIcon mx={1} mb={0.5} />
        </Link>
        .
      </Text>
    </VStack>
  );
}
