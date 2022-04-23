import type { LnUrlPayServiceResponse } from "lnurl-pay/dist/types/types";

interface InvoicePageProps {
  lnUrlOrAddressParams: LnUrlPayServiceResponse;
}

export default function InvoicePage({
  lnUrlOrAddressParams,
}: InvoicePageProps) {
  return <pre>{JSON.stringify(lnUrlOrAddressParams, null, 2)}</pre>;
}
