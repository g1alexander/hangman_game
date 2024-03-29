import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAlphabet } from "./useAlphabet";
import { getWord } from "@/services/getWord";
import { Alphabet } from "@/types/Alphabet";

export function useGame() {
  const { alphabet, setChangeAlphabet } = useAlphabet();

  const category = useSearchParams().get("category") || "";
  const getCategory = category?.split("_").join(" ");

  const [letter, setLetter] = useState({
    game: "",
    original: "",
  });
  const [life, setLife] = useState({
    max: 3,
    value: 0,
  });

  function hideRandomLetters(word: string, percentageToHide = 0.5) {
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
  }

  useEffect(() => {
    const fetchData = async () => {
      const word = await getWord(category);
      const hideWord = hideRandomLetters(word);
      setLetter({
        game: hideWord,
        original: word,
      });
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    const desactiveLetterAlphabet = (word: string, hideWord: string) => {
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

      setChangeAlphabet(desactive);
    };

    desactiveLetterAlphabet(letter.original, letter.game);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter]);

  return { alphabet, getCategory, getLetter: letter.game.split(" "), life };
}
