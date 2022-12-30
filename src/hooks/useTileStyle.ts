import { findDuplicates } from "./useWordList";

interface IStyles {
    CORRECT: string;
    MISPLACED: string;
    INCORRECT: string;
    EMPTY: string;
}

const STYLES: IStyles = {
    CORRECT: "bg-green-700",
    MISPLACED: "bg-amber-500",
    INCORRECT: "bg-neutral-700",
    EMPTY: "bg-neutral-900"
}

// note: how to handle edge case in which there are duplicate letters and one is already guessed correctly?
export const useTileStyle = (char: string, index: number, word: string, currentRow: number, rowIndex: number, guess: string) => {
    if (rowIndex === currentRow) return STYLES.EMPTY
    if (char === " ") return STYLES.EMPTY
    const wordArr = [...word]
    const guessArr = [...guess]

    if (char === word[index]) return STYLES.CORRECT
    if (!wordArr.includes(char)) return STYLES.INCORRECT
    // if there are no duplicates in target word
    if (!findDuplicates(wordArr).includes(char)) { 
        if (guessArr[wordArr.indexOf(char)] === char) return STYLES.INCORRECT
        if (findDuplicates(guessArr).includes(char) && (wordArr.indexOf(char) < index)) return STYLES.INCORRECT
        return STYLES.MISPLACED
    } 
    return STYLES.MISPLACED
}

export const useKeyStyle = (char: string, correctLetters: string[], misplacedLetters: string[], incorrectLetters: string[]) => {
    if (correctLetters.includes(char)) return STYLES.CORRECT
    if (misplacedLetters.includes(char)) return STYLES.MISPLACED
    if (incorrectLetters.includes(char)) return STYLES.EMPTY
    return STYLES.INCORRECT
}