import { API_DELAY } from "@src/constants/api.constants";

export const apiCall = <T>(url: string, res: T): Promise<T> => {
  console.log(`API call to ${url}`);
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(res);
    }, API_DELAY)
  );
};
