"use client";

import { createContext, useState } from "react";
import { Alphabet } from "@/types/Alphabet";
import { alphabet as alphabetInit } from "@/helpers/alphabet";
import { desactiveLetterAlphabet, fetchData } from "@/helpers/getGame";

export interface TypeGameContext {
  category: string;
  setCategory: (category: string) => void;
  letter: Letter;
  setLetter: (letter: Letter) => void;
  life: Life;
  setLife: (life: Life) => void;
  alphabet: Alphabet[];
  setAlphabet: React.Dispatch<React.SetStateAction<Alphabet[]>>;
  resetGame: () => void;
  newGameWithSameCategory: () => void;
}
export interface Letter {
  game: string;
  original: string;
  positionLetterHide: [number, number];
}
export interface Life {
  max: number;
  value: number;
}

export const GameContext = createContext<TypeGameContext>({
  category: "",
  letter: {
    game: "",
    original: "",
    positionLetterHide: [0, 0],
  },
  life: {
    max: 3,
    value: 0,
  },
  alphabet: alphabetInit,
  setCategory: () => {},
  setLetter: () => {},
  setLife: () => {},
  setAlphabet: () => {},
  resetGame: () => {},
  newGameWithSameCategory: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [category, setCategory] = useState<string>("");
  const [letter, setLetter] = useState<Letter>({
    game: "",
    original: "",
    positionLetterHide: [0, 0],
  });
  const [life, setLife] = useState<Life>({
    max: 3,
    value: 0,
  });
  const [alphabet, setAlphabet] = useState<Alphabet[]>(alphabetInit);

  const resetGame = () => {
    setLetter({
      game: "",
      original: "",
      positionLetterHide: [0, 0],
    });
    setLife({
      max: 3,
      value: 0,
    });
    setAlphabet(alphabetInit);
  };

  const newGameWithSameCategory = async () => {
    const { word, hideWord } = await fetchData(category);

    setLetter({
      game: hideWord,
      original: word,
      positionLetterHide: [0, 0],
    });

    // todo: reset alphabet
  };

  return (
    <GameContext.Provider
      value={{
        category,
        setCategory,
        letter,
        setLetter,
        life,
        setLife,
        alphabet,
        setAlphabet,
        resetGame,
        newGameWithSameCategory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
