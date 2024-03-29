import { Alphabet } from "@/types/Alphabet";
import { alphabet as alphabetInit } from "@/helpers/alphabet";
import { useState } from "react";

export function useAlphabet() {
  const [alphabet, setAlphabet] = useState<Alphabet[]>(alphabetInit);

  const setChangeActive = (letter: string) => {
    setAlphabet((prev) =>
      prev.map((item) =>
        item.letter === letter ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const setChangeAlphabet = (alphabetChange: Record<string, boolean>) => {
    const newAlphabet = alphabet.map((item) => {
      if (alphabetChange[item.letter] !== undefined) {
        item.isActive = alphabetChange[item.letter];
      }
      return item;
    });

    setAlphabet([...newAlphabet]);
  };

  return { alphabet, setChangeActive, setChangeAlphabet };
}
