export interface IndexedDB {
  add: (payload: string) => Promise<number>;
  getAll: () => Promise<string[]>;
  deleteAll: () => Promise<number>;
  isExist: (payload: string) => Promise<boolean>;
  close: () => void;
}

export async function IndexedDB(
  nameDB: string
): Promise<IndexedDB | undefined> {
  const indexedDB = window.indexedDB;

  if (!indexedDB || !nameDB) return;

  const openDB = (): Promise<IDBDatabase | null> => {
    return new Promise((resolve, reject) => {
      const dbName = `${nameDB}DB`;
      const request = indexedDB.open(dbName, 1);
      let db: IDBDatabase;

      request.onupgradeneeded = (event) => {
        db = (event.target as IDBOpenDBRequest)?.result;
        const comicStore = db.createObjectStore(nameDB, {
          keyPath: "id",
        });

        comicStore.createIndex("value", "value", { unique: false });
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onerror = () => {
        reject(null);
      };
    });
  };

  const db = await openDB();

  const add = (payload: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(400);
        return;
      }

      const transaction = db.transaction([nameDB], "readwrite");
      const objectStore = transaction.objectStore(nameDB);
      const request = objectStore.add({
        id: crypto.randomUUID(),
        value: payload,
      });

      request.onsuccess = () => {
        resolve(200);
      };

      request.onerror = () => {
        reject(400);
      };
    });
  };

  const isExist = (payload: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(false);
        return;
      }

      const transaction = db.transaction(nameDB, "readonly");
      const objectStore = transaction.objectStore(nameDB);
      const index = objectStore.index("value");
      const request = index.get(payload);

      request.onsuccess = () => {
        const result = request.result;
        resolve(!!result);
      };

      request.onerror = () => {
        resolve(false);
      };
    });
  };

  const getAll = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject([]);
        return;
      }

      const transaction = db.transaction([nameDB], "readonly");
      const objectStore = transaction.objectStore(nameDB);
      const request = objectStore.getAll();

      request.onsuccess = () => {
        const result = request.result;
        const values: string[] = result.map(
          (item: { id: string; value: string }) => item.value
        );
        const uniqueValues = Array.from(new Set(values));

        resolve(uniqueValues);
      };

      request.onerror = () => {
        reject([]);
      };
    });
  };

  const deleteAll = (): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(400);
        return;
      }

      const transaction = db.transaction([nameDB], "readwrite");
      const objectStore = transaction.objectStore(nameDB);
      const request = objectStore.clear();

      request.onsuccess = () => {
        resolve(200);
      };

      request.onerror = () => {
        reject(400);
      };
    });
  };

  const close = () => {
    db?.close();
  };

  return {
    isExist,
    add,
    getAll,
    deleteAll,
    close,
  };
}
