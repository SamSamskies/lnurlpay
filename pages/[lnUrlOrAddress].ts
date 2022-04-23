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
    console.log(error);
    return { notFound: true };
  }
};

export default InvoicePage;
