import { ImageResponse } from "@vercel/og";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const lnUrlOrAddress = searchParams.get("lnUrlOrAddress");
    const amount = searchParams.get("amount");
    const normalizeAmount = (amount?: number) =>
      amount === 1 ? `${amount} sat` : `${amount} sats`;

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "#1A202C",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "white",
            fontFamily: "system-ui, Helvetica, Arial, sans-serif",
          }}
        >
          {lnUrlOrAddress && (
            <div
              style={{
                fontSize: lnUrlOrAddress.length >= 30 ? 36 : 48,
                maxWidth: 1120,
                wordBreak: "break-all",
              }}
            >
              {lnUrlOrAddress}
            </div>
          )}
          {amount && (
            <div
              style={{
                fontSize: 24,
                marginTop: 24,
              }}
            >
              {`Tip amount: ${normalizeAmount(Number(amount))}`}
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
