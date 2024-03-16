import Button from "./components/Button";
import PlayableLetter from "./components/PlayableLetter";
import KeyboardLetter from "./components/KeyboardLetter";
import SelectableCategory from "./components/SelectableCategory";
import TutorialCard from "./components/TutorialCard";
import ButtonPlay from "./components/ButtonPlay";
import Image from "next/image";
import logo from "@public/images/logo.svg";
import Card from "./components/Card";

export default function Home() {
  return (
    <main className="container">
      <Card>
        <Image priority src={logo} alt="Hangman Game" className="card-image" />
        <span></span>
        <ButtonPlay />
        <Button color="btn-blue">How to play</Button>
      </Card>
    </main>
  );
}
