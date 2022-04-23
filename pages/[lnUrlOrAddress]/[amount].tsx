import { GetServerSideProps } from "next";
import { requestInvoice } from "lnurl-pay";
import InvoicePage from "components/InvoicePage";
import type { Satoshis } from "lnurl-pay/dist/types/types";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { invoice } = await requestInvoice({
      lnUrlOrAddress: query.lnUrlOrAddress as string,
      tokens: Number(query.amount) as Satoshis,
    });

    return {
      props: { invoice },
    };
  } catch (error) {
    if (error instanceof Error) return { props: { error: error.message } };
  }
};

export default InvoicePage;
