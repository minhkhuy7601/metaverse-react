// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setLocalStorageData(key: string, data: any): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Function to get data from localStorage based on a specific key
export function getLocalStorageData<T>(key: string): T | null {
  const dataString = localStorage.getItem(key);
  if (dataString) {
    return JSON.parse(dataString);
  }
  return null;
}
