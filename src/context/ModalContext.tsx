"use client";

import { createContext, useState } from "react";

import YouLose from "@public/images/you_lose.svg";
import YouWin from "@public/images/you_win.svg";
import Paused from "@public/images/paused.svg";

interface TypeModalContext {
  isOpen: boolean;
  image: string;
  action: Action;
  openModal: (action: Action) => void;
  closeModal: () => void;
}

type Action = "lose" | "win" | "paused" | "";

export const ModalContext = createContext<TypeModalContext>({
  isOpen: false,
  action: "",
  image: "",
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<Action>("");

  const openModal = (action: Action) => {
    setIsOpen(true);
    setAction(action);
  };

  const closeModal = () => {
    setIsOpen(false);
    setAction("");
  };

  const images = {
    lose: YouLose as string,
    win: YouWin as string,
    paused: Paused as string,
    "": "",
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, isOpen, action, image: images[action] }}
    >
      {children}
    </ModalContext.Provider>
  );
};
