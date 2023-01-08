import { NextApiRequest, NextApiResponse } from "next";
import { requestInvoice } from "lnurl-pay";
import type { Satoshis } from "lnurl-pay/dist/types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { invoice } = await requestInvoice({
        lnUrlOrAddress: req.query.lnUrlOrAddress as string,
        tokens: Number(req.query.amount) as Satoshis,
        comment: req.query.comment as string,
        validateInvoice: true,
      });

      res.status(200).json(invoice);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
