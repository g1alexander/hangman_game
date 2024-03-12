import Button from "./components/Button";
import PlayableLetter from "./components/PlayableLetter";
import KeyboardLetter from "./components/KeyboardLetter";
import SelectableCategory from "./components/SelectableCategory";

export default function Home() {
  return (
    <main>
      <Button color="btn-blue">How to play</Button>
      <h1>-</h1>
      <Button color="btn-pink">How to play</Button>
      <h1>-</h1>

      <PlayableLetter isActive={true}>A</PlayableLetter>
      <h1>-</h1>

      <KeyboardLetter isActive={true}>A</KeyboardLetter>
      <h1>-</h1>

      <SelectableCategory>Movies</SelectableCategory>
    </main>
  );
}
