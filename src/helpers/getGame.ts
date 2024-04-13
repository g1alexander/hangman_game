import { getWord } from "@/services/getWord";

export const desactiveLetterAlphabet = (word: string, hideWord: string) => {
  const mapWordWithCount = word
    .split(" ")
    .join("")
    .split("")
    .reduce((acc: Record<string, { [x: string]: number }>, letter) => {
      if (!acc[letter]) {
        let count = 0;
        for (let i = 0; i < word.length; i++) {
          if (word[i] === letter) {
            count++;
          }
        }
        acc[letter] = {
          [letter]: count,
        };
      }
      return acc;
    }, {});

  const wordWithCount = Object.values(mapWordWithCount);

  const wordCount = wordWithCount.reduce((acc, obj) => {
    return { ...acc, ...obj };
  }, {});

  const result = hideWord.replace(/[-\s]/g, "");
  let desactive: Record<string, boolean> = {};

  result.split("").forEach((letter) => {
    wordCount[letter] -= 1;

    if (wordCount[letter] === 0) {
      desactive = {
        ...desactive,
        [letter]: false,
      };
    }
  });

  return desactive;
};

export const hideRandomLetters = (word: string, percentageToHide = 0.5) => {
  const characters = word.split("");

  const lettersToHide = Math.floor(
    word.replace(/[^a-z]/gi, "").length * percentageToHide
  );

  let hiddenLetters = 0;

  while (hiddenLetters < lettersToHide) {
    const index = Math.floor(Math.random() * characters.length);

    if (characters[index].match(/[a-z]/i) && characters[index] !== "-") {
      characters[index] = "-";
      hiddenLetters++;
    }
  }

  return characters.join("");
};

export const fetchData = async (category: string, captchaCode: string) => {
  const word = await getWord(category, captchaCode);
  const hideWord = hideRandomLetters(word);

  return { word, hideWord };
};
