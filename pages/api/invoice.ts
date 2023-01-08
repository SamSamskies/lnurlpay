import { NextApiRequest, NextApiResponse } from "next";
import { requestInvoice } from "lnurl-pay";
import type { Satoshis } from "lnurl-pay/dist/types/types";

const allowCors =
  (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return await fn(req, res);
  };

async function handler(req: NextApiRequest, res: NextApiResponse) {
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

module.exports = allowCors(handler);
