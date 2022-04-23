import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <Heading
      as="h1"
      size="2xl"
      onClick={() => router.push("/")}
      sx={{ cursor: "pointer" }}
    >
      LNURL Pay ⚡️
    </Heading>
  );
}
