import { NextApiRequest, NextApiResponse } from "next";
import { requestPayServiceParams } from "lnurl-pay";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const lnUrlOrAddressParams = await requestPayServiceParams({
          lnUrlOrAddress: req.query.lnUrlOrAddress as string,
        });

        res.status(200).json(lnUrlOrAddressParams);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "Invalid lnUrlOrAddress"
        ) {
          res.status(400).end(error.message);
        } else {
          res
            .status(500)
            .end(
              error instanceof Error ? error.message : "Something went wrong :("
            );
        }
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
