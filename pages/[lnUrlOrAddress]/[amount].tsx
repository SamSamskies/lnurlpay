import { GetServerSideProps } from "next";
import { requestInvoice } from "lnurl-pay";
import InvoicePage from "components/InvoicePage";
import type { Satoshis } from "lnurl-pay/dist/types/types";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { invoice } = await requestInvoice({
      lnUrlOrAddress: query.lnUrlOrAddress as string,
      tokens: Number(query.amount) as Satoshis,
      comment: query.comment as string,
    });

    return {
      props: { invoice },
    };
  } catch (error) {
    return { props: { error: error instanceof Error ? error.message : "" } };
  }
};

export default InvoicePage;
