"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { useSearchParams } from "next/navigation";

import PlayableLetter from "@/components/PlayableLetter";
import Button from "@/components/Button";
import KeyboardLetter from "@/components/KeyboardLetter";

import { alphabet } from "@/helpers/alphabet";

import MenuIcon from "@public/images/icon-menu.svg";
import lifeGame from "@public/images/icon-heart.svg";
import { ModalContext } from "../../context/ModalContext";

export default function Page() {
  const category = useSearchParams().get("category") || "";
  const { openModal } = useContext(ModalContext);
  // ---------
  const [letter, setLetter] = useState("uni--d -in-do-");

  return (
    <main className="container-2">
      <header className="game-grid-header">
        <article className="game-grid-header-article justify-start">
          <Button onClick={() => openModal("paused")} color="btn-navigation">
            <Image src={MenuIcon} alt="back" width={20} height={40} priority />
          </Button>
          <h1>{category?.split("_").join(" ")}</h1>
        </article>
        <article className="game-grid-header-article justify-end">
          <progress max="3" value="2" />
          <Image src={lifeGame} alt="back" width={20} height={40} priority />
        </article>
      </header>

      <section className="playable_letter">
        {letter.split(" ").map((word, index) => (
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
          <KeyboardLetter key={letter} isActive={isActive}>
            {letter}
          </KeyboardLetter>
        ))}
      </section>
    </main>
  );
}
