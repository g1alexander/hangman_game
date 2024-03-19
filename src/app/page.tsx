"use client";
import { useRouter } from "next/navigation";

import Button from "./components/Button";
import ButtonPlay from "./components/ButtonPlay";
import Image from "next/image";
import logo from "@public/images/logo.svg";
import Card from "./components/Card";

export default function Home() {
  const router = useRouter();

  return (
    <main className="container">
      <Card>
        <Image priority src={logo} alt="Hangman Game" className="card-image" />
        <span></span>
        <ButtonPlay onClick={() => router.push("/pick-a-category")} />
        <Button onClick={() => router.push("/how-to-play")} color="btn-blue">
          How to play
        </Button>
      </Card>
    </main>
  );
}
