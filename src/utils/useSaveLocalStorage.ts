export const setLocalStorageValue = (key: string, value: object) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const getLocalStorageValue = <T>(key: string): T | undefined => {
  try {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(error);
  }
};
