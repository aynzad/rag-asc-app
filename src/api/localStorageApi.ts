import { API_DELAY } from "@src/constants/api.constants";

export const localStorageApiCall = <T>(
  url: string,
  emptyState: T
): Promise<T> => {
  console.log(`API call to ${url}`);
  return new Promise((resolve) =>
    setTimeout(() => {
      const data = window.localStorage.getItem(url);
      resolve(data ? JSON.parse(data) : emptyState);
    }, API_DELAY)
  );
};
