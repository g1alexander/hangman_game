"use client";

import Image from "next/image";
import { useContext } from "react";

import { ModalContext } from "@/context/ModalContext";
import { useGame } from "@/hooks/useGame";

import PlayableLetter from "@/components/PlayableLetter";
import Button from "@/components/Button";
import KeyboardLetter from "@/components/KeyboardLetter";

import MenuIcon from "@public/images/icon-menu.svg";
import lifeGame from "@public/images/icon-heart.svg";

export default function Page() {
  const { openModal } = useContext(ModalContext);
  const { alphabet, getCategory, getLetter, life } = useGame();

  return (
    <main className="container-2">
      <header className="game-grid-header">
        <article className="game-grid-header-article justify-start">
          <Button onClick={() => openModal("paused")} color="btn-navigation">
            <Image src={MenuIcon} alt="back" width={20} height={40} priority />
          </Button>
          <h1>{getCategory}</h1>
        </article>
        <article className="game-grid-header-article justify-end">
          <progress max={life.max} value={life.value} />
          <Image src={lifeGame} alt="back" width={20} height={40} priority />
        </article>
      </header>

      <section className="playable_letter">
        {getLetter.map((word, index) => (
          <div key={index}>
            {word.split("").map((letter, index) => (
              <PlayableLetter key={index} isActive={letter !== "-"}>
                {letter}
              </PlayableLetter>
            ))}
          </div>
        ))}
      </section>

      <section className="grid-letters">
        {alphabet.map(({ letter, isActive }) => (
          <KeyboardLetter
            key={letter}
            isActive={isActive}
            onClick={console.log}
          >
            {letter}
          </KeyboardLetter>
        ))}
      </section>
    </main>
  );
}
