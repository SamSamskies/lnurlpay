import { NextApiRequest, NextApiResponse } from "next";
import { requestInvoice } from "lnurl-pay";
import type { Satoshis } from "lnurl-pay/dist/types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { invoice } = await requestInvoice({
        lnUrlOrAddress: req.body.lnUrlOrAddress as string,
        tokens: Number(req.body.amount) as Satoshis,
        comment: req.body.comment as string,
        validateInvoice: true,
      });

      res.status(200).json(invoice);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
