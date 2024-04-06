import { IndexedDB } from "@/db/indexedDB";

export async function getWord(category: string): Promise<string> {
  try {
    const indexedDB = await IndexedDB(category);

    const arrayValues = await indexedDB?.getAll();

    const response: string = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, array_values: arrayValues }),
    })
      .then((res) => res.json())
      .then((res) => res.message);

    const isExist = await indexedDB?.isExist(response);
    if (!isExist) {
      await indexedDB?.add(response);
    }

    if (arrayValues?.length === 40) {
      await indexedDB?.deleteAll();
    }

    indexedDB?.close();

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
