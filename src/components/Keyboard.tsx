import { useKeyStyle } from "../hooks/useTileStyle";

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

interface KeyboardProps {
  addLetter: (letter: string) => void;
  correctLetters: string[];
  misplacedLetters: string[];
  incorrectLetters: string[];
}

const Keyboard = ({
  addLetter,
  correctLetters,
  misplacedLetters,
  incorrectLetters,
}: KeyboardProps) => {
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4 place-content-center">
      {KEYS.map((char) => (
        <div
          key={char}
          className={`text-4xl uppercase font-extrabold border-4 p-4 aspect-square rounded-lg cursor-pointer ${useKeyStyle(
            char,
            correctLetters,
            misplacedLetters,
            incorrectLetters
          )}`}
          onClick={() => addLetter(char)}
        >
          {char}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
