import { useKeyStyle } from "../hooks/useTileStyle";

const BACKSPACE = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="32"
    viewBox="0 0 24 24"
    width="32"
    data-testid="icon-backspace"
  >
    <path
      fill="white"
      d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
    ></path>
  </svg>
);

const KEYS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", BACKSPACE],
];

interface KeyboardProps {
  addLetter: (letter: string) => void;
  backspace: () => void;
  guessWord: () => void;
  correctLetters: string[];
  misplacedLetters: string[];
  incorrectLetters: string[];
}

const Keyboard = ({
  addLetter,
  backspace,
  guessWord,
  correctLetters,
  misplacedLetters,
  incorrectLetters,
}: KeyboardProps) => {
  return (
    <>
      <div className="flex flex-col">
        {KEYS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row justify-between">
            {row.map((col, colIndex) => (
              <div
                key={colIndex}
                onClick={() => {
                  col === "Enter"
                    ? guessWord()
                    : typeof col !== "string"
                    ? backspace()
                    : addLetter(col);
                }}
                className={`flex-grow flex-shrink items-center justify-center text-xl md:text-2xl uppercase font-extrabold m-1 p-4 rounded-lg cursor-pointer ${
                  typeof col === "string" && col !== "Enter"
                    ? useKeyStyle(
                        col,
                        correctLetters,
                        misplacedLetters,
                        incorrectLetters
                      )
                    : "bg-neutral-700"
                }`}
              >
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Keyboard;
