import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Input, HStack } from "@chakra-ui/react";
import { useState } from "react";
import NextButton from "components/NextButton";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/${e.currentTarget.lnUrlOrAddress.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt={6} spacing={2}>
        <Input
          autoFocus
          name="lnUrlOrAddress"
          variant="outline"
          placeholder="Enter LNURL or lightning address"
          size="lg"
        />
        <NextButton isLoading={isLoading} />
      </HStack>
    </form>
  );
};

export default Home;
