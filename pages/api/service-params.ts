import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res
    .status(410)
    .end(
      "This service has been retired and no longer generates invoices. See https://github.com/lnurl/luds"
    );
}
