import { GetServerSideProps } from "next";
import { requestInvoice } from "lnurl-pay";
import InvoicePage from "components/InvoicePage";
import type { Satoshis } from "lnurl-pay/dist/types/types";
import lightningPayReq from "bolt11";

const verifyDescriptionHash = async (metadataHash: string, invoice: string) => {
  return (
    metadataHash ===
    lightningPayReq.decode(invoice).tagsObject.purpose_commit_hash
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { invoice, params } = await requestInvoice({
      lnUrlOrAddress: query.lnUrlOrAddress as string,
      tokens: Number(query.amount) as Satoshis,
      comment: query.comment as string,
    });

    const isValidAmount =
      lightningPayReq.decode(invoice).satoshis === Number(query.amount);
    const isValidDescriptionHash = await verifyDescriptionHash(
      params.metadataHash,
      invoice
    );

    if (!isValidAmount || !isValidDescriptionHash) {
      throw new Error("Error generating invoice :(");
    }

    return {
      props: { invoice },
    };
  } catch (error) {
    return { props: { error: error instanceof Error ? error.message : "" } };
  }
};

export default InvoicePage;
