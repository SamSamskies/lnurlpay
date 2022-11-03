import { GetServerSideProps } from "next";
import { requestInvoice } from "lnurl-pay";
import InvoicePage from "components/InvoicePage";
import type { Satoshis } from "lnurl-pay/dist/types/types";
import { Sha256 } from "@aws-crypto/sha256-js";
import lightningPayReq from "bolt11";

const buf2hex = (buffer: ArrayBuffer) => {
  return Array.from(new Uint8Array(buffer))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
};

const verifyDescriptionHash = async (metadata: string, invoice: string) => {
  const hash = new Sha256();

  hash.update(new TextEncoder().encode(metadata));

  const result = await hash.digest();

  return (
    buf2hex(result) ===
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
      JSON.stringify(params.metadata),
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
