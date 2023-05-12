export const useGetBaseUrl = () => {
  const defaultBaseUrl = "https://lnurlpay.com";

  if (typeof window === "undefined") {
    return defaultBaseUrl;
  }

  return window.location.origin || defaultBaseUrl;
};
