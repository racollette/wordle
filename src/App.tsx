import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Alert from "./components/Alert";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import Toast from "./components/Toast";
import {
  findDuplicates,
  generateRandomWord,
  isInDictionary,
} from "./hooks/useWordList";

const WORD_SIZE: number = 5;
const GUESS_LIMIT = 5;
const initialState = new Array<string>(WORD_SIZE).fill(
  "".padStart(WORD_SIZE, " ")
);

function App() {
  const [word, setWord] = useState<string>("");
  const [gameOver, setGameOver] = useState<string>("");
  const [board, setBoard] = useState<string[]>(initialState);
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [misplacedLetters, setMisplacedLetters] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    setWord(generateRandomWord());
  }, []);

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
    [currentGuess, gameOver]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      e.preventDefault();
      if (key === "Enter" && gameOver) {
        resetGame();
        return;
      }
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

  const backspace = useCallback(() => {
    const rebuiltWord = currentGuess.slice(0, -1);
    setCurrentGuess(rebuiltWord);
    const newBoard = [...board];
    newBoard[currentRow] = rebuiltWord.padEnd(WORD_SIZE, " ");
    setBoard(newBoard);
  }, [currentGuess, board]);

  const guessWord = useCallback(() => {
    // if not correct lenth, do nothing or add a warning
    if (currentGuess.length < WORD_SIZE) {
      handleToast("Too short");
      return;
    }

    if (!isInDictionary(currentGuess)) {
      handleToast("Not a word");
      return;
    }

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
  }, [
    currentGuess,
    board,
    word,
    correctLetters,
    misplacedLetters,
    incorrectLetters,
  ]);

  const handleToast = (message: string) => {
    setShowToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage("");
    }, 1000);
  };

  const resetGame = useCallback(() => {
    setWord(generateRandomWord());
    setBoard(initialState);
    setCurrentRow(0);
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setMisplacedLetters([]);
    setGameOver("");
  }, []);

  return (
    <div className="App">
      <div className="mb-8">
        {showToast && <Toast message={toastMessage} />}
        {gameOver && (
          <Alert type={gameOver} resetGame={resetGame} word={word} />
        )}
        <Board board={board} word={word} currentRow={currentRow} />
      </div>

      <Keyboard
        addLetter={addLetter}
        backspace={backspace}
        guessWord={guessWord}
        correctLetters={correctLetters}
        misplacedLetters={misplacedLetters}
        incorrectLetters={incorrectLetters}
      />
    </div>
  );
}

export default App;
