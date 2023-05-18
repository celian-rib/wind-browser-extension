declare namespace chrome {
  namespace storage {
    interface StorageArea {
      set(items: object, callback?: () => void): void;
      get(keys: string | string[] | object | null, callback: (items: object) => void): void;
      remove(keys: string | string[], callback?: (items: object) => void): void;
    }
  
    const local: StorageArea;
  }
}

export async function setStorage(key: string, value: any) {
  const valueString = JSON.stringify(value);
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: valueString }, () => resolve(undefined));
  })
}

export async function getStorage(key: string) {
  const storageData = await new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result as { [key: string]: string });
    });
  }) as { [key: string]: string };
  if (!storageData[key])
    return undefined;
  return JSON.parse(storageData[key]);
}

export async function removeStorage(key: string) {
  return new Promise((resolve) => {
    chrome.storage.local.remove(key, () => resolve(undefined));
  })
}