"use client";

import Image from "next/image";
import Button from "../components/Button";
import MenuIcon from "@public/images/icon-menu.svg";
import lifeGame from "@public/images/icon-heart.svg";

export default function page() {
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
      <section className="grid-category"></section>
    </main>
  );
}
