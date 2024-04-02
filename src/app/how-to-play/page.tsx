"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import TutorialCard from "@/components/TutorialCard";

import HowToPlayImage from "@public/images/how_to_play.svg";
import Back from "@public/images/icon-back.svg";
import Button from "@/components/Button";

export default function HowToPlay() {
  const router = useRouter();

  return (
    <main className="how-to-play container-2">
      <header className="grid-header">
        <Button onClick={() => router.back()} color="btn-navigation">
          <Image src={Back} alt="back" width={20} height={40} priority />
        </Button>
        <Image
          src={HowToPlayImage}
          alt="HowToPlay"
          width={200}
          height={200}
          className="grid-header-title"
        />
      </header>
      <section className="how-to-play-grid">
        <TutorialCard
          step="01"
          title="Choose a category"
          description="First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word."
        />
        <TutorialCard
          step="02"
          title="Guess letters"
          description="Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it’s wrong, you lose some health, which empties after eight incorrect guesses."
        />
        <TutorialCard
          step="03"
          title="Win or lose"
          description="You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose."
        />
      </section>
    </main>
  );
}
