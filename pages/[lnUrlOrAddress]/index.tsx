import { GetServerSideProps } from "next";
import { requestPayServiceParams } from "lnurl-pay";
import AmountPage from "components/AmountPage";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const lnUrlOrAddressParams = await requestPayServiceParams({
      lnUrlOrAddress: query.lnUrlOrAddress as string,
    });

    return {
      props: { lnUrlOrAddressParams },
    };
  } catch (error) {
    return { props: { error: error instanceof Error ? error.message : "" } };
  }
};

export default AmountPage;
