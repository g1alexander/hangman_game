import { useContext, useEffect } from "react";
import { useAlphabet } from "./useAlphabet";
import { desactiveLetterAlphabet, fetchData } from "@/helpers/getGame";
import { ModalContext } from "@/context/ModalContext";
import { GameContext } from "@/context/GameContext";

export function useGame() {
  const { openModal } = useContext(ModalContext);
  const {
    letter,
    life,
    setLetter,
    setLife,
    category,
    setChangeAlphabet,
    alphabet,
    resetGame,
  } = useContext(GameContext);

  const getCategory = category?.split("_").join(" ");

  useEffect(() => {
    fetchData(category).then(({ word, hideWord }) => {
      setLetter({
        game: hideWord,
        original: word,
        positionLetterHide: [0, 0],
      });
    });
  }, [category, setLetter]);

  useEffect(() => {
    const desactive = desactiveLetterAlphabet(letter.original, letter.game);
    setChangeAlphabet(desactive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter]);

  const selectHideLetter = (positionLetter: number, positionWord: number) => {
    setLetter({
      ...letter,
      positionLetterHide: [positionLetter, positionWord],
    });
  };

  const checkLetter = (payload: string) => {
    const wordOriginalSplit = letter.original.split(" ");
    const wordSplit = letter.game.split(" ");

    const isCorrect =
      wordOriginalSplit[letter.positionLetterHide[1]].split("")[
        letter.positionLetterHide[0]
      ] === payload;

    if (!isCorrect) {
      setLife({
        ...life,
        value: life.value + 1,
      });

      if (life.value + 1 === life.max) {
        openModal("lose");
      }
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
      resetGame();
      openModal("win");
    }
  };

  return {
    alphabet,
    getCategory,
    getLetter: letter.game.split(" "),
    life,
    selectHideLetter,
    checkLetter,
    setChangeAlphabet,
  };
}
