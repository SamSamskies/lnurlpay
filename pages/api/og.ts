import { NextApiRequest, NextApiResponse } from "next";
import { requestPayServiceParams } from "lnurl-pay";
import nodeHtmlToImage from "node-html-to-image";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const lnUrlOrAddressParams = await requestPayServiceParams({
      lnUrlOrAddress: req.query.lnUrlOrAddress as string,
    });
    const imageHtml = `
      <img 
        src="${lnUrlOrAddressParams?.image}"
        alt="user avatar"
        style="max-height: 150px; max-width: 150px;"
      />
    `;
    const descriptionHtml = `
      <p style="font-weight: bold; margin: 0">${lnUrlOrAddressParams?.description}</p>
    `;
    const domainHtml = `
      <p style="line-height: 2; margin: 0">${lnUrlOrAddressParams?.domain}</p>
    `;
    const normalizeAmount = (amount?: number) =>
      amount === 1 ? `${amount} sat` : `${amount} sats`;
    const amountHtml = `
      <p style="line-height: 2; margin: 0">Tip amount: ${normalizeAmount(
        Number(req.query.amount)
      )}</p>`;

    const renderIfNecessary = (html: string, value?: any) => {
      return value ? html : "";
    };
    const html = `
      <html>
        <body style="display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; background-color: #1A202C; width: 1200px; height: 627px; font-family: system-ui, Helvetica, Arial, sans-serif;">
          ${renderIfNecessary(imageHtml, lnUrlOrAddressParams?.image)}
          <div style="text-align: center; margin-top: 16px;">
            ${renderIfNecessary(
              descriptionHtml,
              lnUrlOrAddressParams?.description
            )}
            ${renderIfNecessary(domainHtml, lnUrlOrAddressParams?.domain)}
            ${renderIfNecessary(amountHtml, req.query.amount)}
          </div>
        </body>
      </html>

    `;
    const image = await nodeHtmlToImage({
      html,
    });

    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(image, "binary");
  } catch {
    res.status(500).end();
  }
}
