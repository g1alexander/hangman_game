import { IndexedDB } from "@/db/indexedDB";

export async function getWord(category: string): Promise<string> {
  //TODO: Implement the logic to get the word from the api
  try {
    const indexedDB = await IndexedDB(category);

    const arrayValues = await indexedDB?.getAll();

    console.log(arrayValues);

    const response = await Promise.resolve("united kingdom");

    const isExist = await indexedDB?.isExist(response);
    if (!isExist) {
      await indexedDB?.add(response);
    }

    if (arrayValues?.length === 2) {
      await indexedDB?.deleteAll();
    }

    indexedDB?.close();
    console.log(response);

    return response;
  } catch (error) {
    const indexedDB = await IndexedDB(category);
    const arrayValues = await indexedDB?.getAll();

    if (arrayValues && arrayValues.length !== 0) {
      const randomIndex = Math.floor(Math.random() * arrayValues.length);
      const word = arrayValues[randomIndex];

      return word;
    }

    return "";
  }
}
