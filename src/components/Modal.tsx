"use client";

import Card from "./Card";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";
import YouLose from "@public/images/you_lose.svg";
import YouWin from "@public/images/you_win.svg";

export default function Modal() {
  const router = useRouter();
  return (
    <main className="modal">
      <Card>
        <Image
          priority
          src={YouLose}
          alt="Hangman Game"
          className="card-image"
        />

        <span></span>
        <span></span>
        <span></span>

        <span></span>
        <Button
          onClick={() => router.push("/how-to-play")}
          color="btn-blue btn"
        >
          play again!
        </Button>
        <Button
          onClick={() => router.push("/how-to-play")}
          color="btn-blue btn"
        >
          new category
        </Button>
        <Button
          onClick={() => router.push("/how-to-play")}
          color="btn-pink btn"
        >
          quit game
        </Button>
        <span></span>
        <span></span>
      </Card>
    </main>
  );
}
