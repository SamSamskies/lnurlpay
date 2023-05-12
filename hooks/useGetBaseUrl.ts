export const useGetBaseUrl = () => {
  if (typeof window === "undefined") {
    return "https://lnurlpay.com";
  }

  return window.location.origin;
};
