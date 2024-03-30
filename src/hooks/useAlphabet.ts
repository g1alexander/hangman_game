import { Alphabet } from "@/types/Alphabet";
import { useContext } from "react";
import { GameContext } from "@/context/GameContext";

export function useAlphabet() {
  const { alphabet, setAlphabet } = useContext(GameContext);

  const setChangeActive = (letter: string) => {
    setAlphabet((prev: Alphabet[]) =>
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
