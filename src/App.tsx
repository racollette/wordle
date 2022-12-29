import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";

const WORD_SIZE: number = 5;
const GUESS_LIMIT = 5;
const RANDOM_WORD = "lunge";
const initialState = new Array<string>(WORD_SIZE).fill(
  "".padStart(WORD_SIZE, " ")
);
function App() {
  const [word, setWord] = useState<string>(RANDOM_WORD);
  const [gameOver, setGameOver] = useState<string>("");
  const [board, setBoard] = useState<string[]>(initialState);
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [misplacedLetters, setMisplacedLetters] = useState<string[]>([]);

  const addLetter = useCallback(
    (letter: string) => {
      if (gameOver) return;
      if (currentGuess.length >= WORD_SIZE) return;
      const builtWord = [...currentGuess, letter].join("");
      setCurrentGuess(builtWord);
      const newBoard = [...board];
      newBoard[currentRow] = builtWord.padEnd(WORD_SIZE, " ");
      setBoard(newBoard);
    },
    [currentGuess]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      e.preventDefault();
      if (key === "Enter") guessWord();
      if (key === "Backspace") backspace();
      if (!key.match(/^[a-z]$/)) return;
      addLetter(key);
    };

    document.addEventListener("keypress", handler);
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keypress", handler);
      document.removeEventListener("keydown", handler);
    };
  }, [addLetter]);

  const backspace = () => {
    const rebuiltWord = currentGuess.slice(0, -1);
    setCurrentGuess(rebuiltWord);
    const newBoard = [...board];
    newBoard[currentRow] = rebuiltWord.padEnd(WORD_SIZE, " ");
    setBoard(newBoard);
  };

  const guessWord = () => {
    // if not correct lenth, do nothing or add a warning
    if (currentGuess.length < WORD_SIZE) return;

    // build used letter categories
    const guessArr = currentGuess.split("");
    const wordArr = word.split("");
    let newCorrectLetters: string[] = [];
    let newMisplacedLetters: string[] = [];
    let newIncorrectLetters: string[] = [];
    for (let i = 0; i < guessArr.length; i++) {
      if (wordArr.includes(guessArr[i])) {
        if (wordArr[i] === guessArr[i]) {
          newCorrectLetters.push(guessArr[i]);
        } else {
          newMisplacedLetters.push(guessArr[i]);
        }
      } else {
        newIncorrectLetters.push(guessArr[i]);
      }
    }

    setCorrectLetters([...correctLetters.concat(newCorrectLetters)]);
    setMisplacedLetters([...misplacedLetters.concat(newMisplacedLetters)]);
    setIncorrectLetters([...incorrectLetters.concat(newIncorrectLetters)]);

    if (currentGuess === word) {
      // end game or proceed to next row
      setGameOver("win");
    } else if (currentRow === GUESS_LIMIT - 1) {
      // check win or lose
      setGameOver("lose");
    }

    setCurrentRow(currentRow + 1);
    setCurrentGuess("");
  };

  return (
    <div className="App">
      <div className="container relative">
        {gameOver && <Alert type={gameOver} />}
        <Board board={board} word={word} currentRow={currentRow} />
        <Keyboard
          addLetter={addLetter}
          correctLetters={correctLetters}
          misplacedLetters={misplacedLetters}
          incorrectLetters={incorrectLetters}
        />
        <button
          className="text-4xl border-red-600 text-red-600 border-2 p-4 rounded-lg mt-10 mr-5"
          onClick={() => backspace()}
        >
          Backspace
        </button>
        <button
          className="text-4xl border-green-700 text-green-700 border-2 p-4 rounded-lg mt-10 ml-5"
          onClick={() => guessWord()}
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default App;