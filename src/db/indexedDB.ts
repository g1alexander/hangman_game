export interface IndexedDB {
  add: (payload: Payload) => Promise<number>;
  update: (payload: string) => Promise<number>;
  getAll: () => Promise<GetAll>;
  deleteAll: () => Promise<number>;
  isExist: (payload: string) => Promise<boolean>;
  close: () => void;
}

interface Payload {
  value: string;
  isWinner: boolean;
}

interface GetAll {
  winners: string[];
  notWinners: string[];
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
        const store = db.createObjectStore(nameDB, {
          keyPath: "id",
        });

        store.createIndex("value", "value", { unique: false });
        store.createIndex("isWinner", "isWinner", { unique: false });
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

  const add = (payload: Payload): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(400);
        return;
      }

      const transaction = db.transaction([nameDB], "readwrite");
      const objectStore = transaction.objectStore(nameDB);
      const request = objectStore.add({
        id: crypto.randomUUID(),
        value: payload.value,
        isWinner: payload.isWinner,
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

  const getAll = (): Promise<GetAll> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject({
          winners: [],
          notWinners: [],
        });
        return;
      }

      const transaction = db.transaction([nameDB], "readonly");
      const objectStore = transaction.objectStore(nameDB);
      const request = objectStore.getAll();

      request.onsuccess = () => {
        const result = request.result;
        const valuesWinners: string[] = result.filter
          ? result
              .filter((value: Payload) => value.isWinner)
              .map((value: Payload) => value.value)
          : [];

        const valuesNotWinners: string[] = result.filter
          ? result
              .filter((value: Payload) => !value.isWinner)
              .map((value: Payload) => value.value)
          : [];

        const uniqueValuesWinners = Array.from(new Set(valuesWinners));
        const uniqueValuesNotWinners = Array.from(new Set(valuesNotWinners));

        resolve({
          winners: uniqueValuesWinners,
          notWinners: uniqueValuesNotWinners,
        });
      };

      request.onerror = () => {
        reject({
          winners: [],
          notWinners: [],
        });
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

  const update = (payload: string): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(400);
        return;
      }

      const transaction = db.transaction([nameDB], "readwrite");
      const objectStore = transaction.objectStore(nameDB);
      const index = objectStore.index("value");
      const request = index.get(payload);

      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          result.isWinner = true;
          const updateRequest = objectStore.put(result);

          updateRequest.onsuccess = () => {
            resolve(200);
          };

          updateRequest.onerror = () => {
            reject(400);
          };
        }
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
    update,
    isExist,
    add,
    getAll,
    deleteAll,
    close,
  };
}
