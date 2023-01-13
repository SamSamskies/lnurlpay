export const useGetBaseUrl = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.origin;
};
