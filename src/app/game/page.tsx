"use client";

import Image from "next/image";
import Button from "@/components/Button";
import MenuIcon from "@public/images/icon-menu.svg";
import lifeGame from "@public/images/icon-heart.svg";
import KeyboardLetter from "@/components/KeyboardLetter";
import { alphabet } from "@/helpers/alphabet";
import { useState } from "react";
import PlayableLetter from "@/components/PlayableLetter";

export default function Page() {
  // console.log("hello world".split(" ").length);

  const [letter, setLetter] = useState("h-l-o word");

  return (
    <main className="game">
      <header>
        <article>
          <Button onClick={() => console.log("h")} color="btn-pink">
            <Image src={MenuIcon} alt="back" width={20} height={40} priority />
          </Button>
          <h1>Countries</h1>
        </article>
        <article>
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
