import { useContext, useEffect, useState } from "react";
import { desactiveLetterAlphabet, fetchData } from "@/helpers/getGame";
import { ModalContext } from "@/context/ModalContext";
import { GameContext } from "@/context/GameContext";
import { IndexedDB } from "@/db/indexedDB";

export function useGame() {
  const { openModal } = useContext(ModalContext);
  const {
    captchaCode,
    letter,
    life,
    setLetter,
    setLife,
    category,
    setCategory,
    setChangeAlphabet,
    alphabet,
    resetGame,
  } = useContext(GameContext);
  const [isLoading, setIsLoading] = useState(false);

  let getCategory = category?.split("_").join(" ");

  useEffect(() => {
    if (!category && sessionStorage.getItem("category")) {
      const category = sessionStorage.getItem("category");
      setCategory(category || "");
    }

    if (category) {
      setIsLoading(true);
      fetchData(category, captchaCode).then(({ word, hideWord }) => {
        const hide = sessionStorage.getItem("hideWord");

        setLetter({
          game: hide || hideWord,
          original: word,
          positionLetterHide: [0, 0],
        });
        sessionStorage.setItem("hideWord", hide || hideWord);

        setIsLoading(false);
      });

      sessionStorage.setItem("category", category);
    }
  }, [category, captchaCode, setLetter, setCategory]);

  useEffect(() => {
    if (letter.game && life.value === life.max) {
      sessionStorage.setItem("hideWord", letter.game);
    }

    const desactive = desactiveLetterAlphabet(letter.original, letter.game);
    setChangeAlphabet(desactive);
  }, [letter, setChangeAlphabet, life]);

  useEffect(() => {
    const storedLife = sessionStorage.getItem("life");

    if (life && storedLife) {
      const lifeParse = JSON.parse(storedLife || `${life}`);
      if (lifeParse.value === life.value) return;

      setLife(lifeParse);
    } else {
      sessionStorage.setItem("life", JSON.stringify(life));
    }
  }, [life, setLife]);

  const selectHideLetter = (positionLetter: number, positionWord: number) => {
    setLetter({
      ...letter,
      positionLetterHide: [positionLetter, positionWord],
    });
  };

  const checkLetter = async (payload: string) => {
    const wordOriginalSplit = letter.original.split(" ");
    const wordSplit = letter.game.split(" ");

    const isCorrect =
      wordOriginalSplit[letter.positionLetterHide[1]].split("")[
        letter.positionLetterHide[0]
      ] === payload;

    if (!isCorrect) {
      if (life.value + 1 === life.max) {
        sessionStorage.removeItem("life");
        sessionStorage.removeItem("hideWord");

        setLife({
          ...life,
          value: 0,
        });
        openModal("lose");
        return;
      }

      const data = {
        ...life,
        value: life.value + 1,
      };
      setLife(data);
      sessionStorage.setItem("life", JSON.stringify(data));
      return;
    }

    const newWord = wordSplit[letter.positionLetterHide[1]].split("");
    newWord[letter.positionLetterHide[0]] = payload;

    wordSplit[letter.positionLetterHide[1]] = newWord.join("");

    setLetter({
      ...letter,
      game: wordSplit.join(" "),
    });

    if (wordOriginalSplit.join("") === wordSplit.join("")) {
      const indexedDB = await IndexedDB(category);

      await indexedDB?.update(letter.original);
      sessionStorage.removeItem("hideWord");
      sessionStorage.removeItem("life");
      resetGame();
      openModal("win");
    }
  };

  return {
    isLoading,
    alphabet,
    getCategory,
    getLetter: letter.game.split(" "),
    life,
    selectHideLetter,
    checkLetter,
    setChangeAlphabet,
  };
}
