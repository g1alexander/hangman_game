import { IndexedDB } from "@/db/indexedDB";
import { prompts } from "@/utils/prompts";

export async function getWord(
  category: string,
  captchaCode: string
): Promise<string> {
  try {
    console.log("getWord", captchaCode);
    const indexedDB = await IndexedDB(category);

    const arrayValues = await indexedDB?.getAll();

    if (arrayValues && arrayValues.notWinners.length > 0) {
      const randomIndex = Math.floor(
        Math.random() * arrayValues.notWinners.length
      );
      const word = arrayValues.notWinners[randomIndex];
      return word;
    }

    const prompt = prompts[category](arrayValues?.winners);

    const response: string = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        captchaCode,
      }),
    })
      .then((res) => res.json())
      .then((res) => res.message);

    console.log("response", response);

    const isExist = await indexedDB?.isExist(response);
    if (!isExist) {
      await indexedDB?.add({
        value: response,
        isWinner: false,
      });
    }

    if (arrayValues && arrayValues.winners.length === 40) {
      await indexedDB?.deleteAll();
    }

    indexedDB?.close();

    return response;
  } catch (error) {
    const indexedDB = await IndexedDB(category);
    const arrayValues = await indexedDB?.getAll();

    if (arrayValues && arrayValues.notWinners.length !== 0) {
      const randomIndex = Math.floor(
        Math.random() * arrayValues.notWinners.length
      );
      const word = arrayValues.notWinners[randomIndex];

      return word;
    } else if (arrayValues && arrayValues.winners.length !== 0) {
      const randomIndex = Math.floor(
        Math.random() * arrayValues.winners.length
      );
      const word = arrayValues.winners[randomIndex];

      return word;
    }

    return "";
  }
}
