"use client";

import Card from "./Card";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";

import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";

export default function Modal() {
  const router = useRouter();
  const { isOpen, image, action, closeModal } = useContext(ModalContext);

  return (
    isOpen && (
      <main className="modal">
        <Card>
          <Image
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
              onClick={() => {
                //TODO: new word in the same category
                closeModal();
              }}
              color="btn-blue btn"
            >
              play again!
            </Button>
          )}

          <Button
            onClick={() => {
              router.push("/pick-a-category");
              closeModal();
            }}
            color="btn-blue btn"
          >
            new category
          </Button>
          <Button
            onClick={() => {
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
