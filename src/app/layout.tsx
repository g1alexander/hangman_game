import type { Metadata } from "next";
import { Mouse_Memoirs } from "next/font/google";

import Modal from "@/components/Modal";
import { ModalProvider } from "@/context/ModalContext";

import "@/styles/main.css";

const MouseMemoirs = Mouse_Memoirs({
  style: "normal",
  weight: "400",
  subsets: ["latin-ext", "latin"],
});

export const metadata: Metadata = {
  title: "Hangman Game",
  description: "A simple hangman game with open ai integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={MouseMemoirs.className}>
        <ModalProvider>
          <Modal />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
