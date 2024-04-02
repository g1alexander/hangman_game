"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Button from "@/components/Button";
import ButtonPlay from "@/components/ButtonPlay";
import Card from "@/components/Card";

import logo from "@public/images/logo.svg";

export default function Home() {
  const router = useRouter();

  return (
    <main className="container container-2">
      <Card>
        <Image
          width={100}
          height={100}
          priority
          src={logo}
          alt="Hangman Game"
          className="card-image"
        />
        <span></span>
        <span></span>
        <span></span>
        <ButtonPlay onClick={() => router.push("/pick-a-category")} />

        <Button
          onClick={() => router.push("/how-to-play")}
          color="btn-blue btn"
        >
          How to play
        </Button>
        <span></span>
      </Card>
    </main>
  );
}
