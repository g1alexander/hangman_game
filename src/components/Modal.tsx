"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useContext } from "react";

import { ModalContext } from "@/context/ModalContext";

import Card from "./Card";
import Button from "./Button";
import { GameContext } from "@/context/GameContext";

export default function Modal() {
  const router = useRouter();
  const { isOpen, image, action, closeModal } = useContext(ModalContext);
  const { resetGame, newGameWithSameCategory } = useContext(GameContext);

  return (
    isOpen && (
      <main className="modal">
        <Card>
          <Image
            width={0}
            height={0}
            priority
            src={image}
            alt="Hangman Game"
            className="card-image"
          />

          <span></span>
          <span></span>
          <span></span>

          <span></span>
          {action === "paused" ? (
            <Button onClick={() => closeModal()} color="btn-blue btn">
              continue
            </Button>
          ) : (
            <Button
              onClick={async () => {
                await newGameWithSameCategory();
                closeModal();
              }}
              color="btn-blue btn"
            >
              play again!
            </Button>
          )}

          <Button
            onClick={() => {
              resetGame();
              router.push("/pick-a-category");
              closeModal();
            }}
            color="btn-blue btn"
          >
            new category
          </Button>
          <Button
            onClick={() => {
              resetGame();
              router.push("/");
              closeModal();
            }}
            color="btn-pink btn"
          >
            quit game
          </Button>
          <span></span>
          <span></span>
        </Card>
      </main>
    )
  );
}
