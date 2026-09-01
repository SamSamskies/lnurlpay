const LUDS_URL = "https://github.com/lnurl/luds";

export default function RetirementNotice() {
  return (
    <section className="notice">
      <h2>This tool has been retired.</h2>
      <p>
        LNURL Pay no longer generates BOLT11 invoices from LNURLs or Lightning
        Addresses. Thank you for using it.
      </p>
      <p>
        For LNURL specifications, see the{" "}
        <a
          href={LUDS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="external-link"
        >
          LNURL LUDs repository
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8z" />
          </svg>
        </a>
        .
      </p>
    </section>
  );
}
