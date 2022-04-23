import { GetServerSideProps } from "next";
import { requestPayServiceParams } from "lnurl-pay";
import InvoicePage from "components/InvoicePage";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const lnUrlOrAddressParams = await requestPayServiceParams({
      lnUrlOrAddress: query.lnUrlOrAddress as string,
    });

    return {
      props: { lnUrlOrAddressParams },
    };
  } catch (error) {
    if (error instanceof Error) return { props: { error: error.message } };
  }
};

export default InvoicePage;
