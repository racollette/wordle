
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
export const useTileStyle = (char: string, index: number, word: string, currentRow: number, rowIndex: number) => {
    if (rowIndex === currentRow) return STYLES.EMPTY
    if (char === " ") return STYLES.EMPTY

    const wordArr = word.split("")
    // if guessed character does not exist in word
    if (!wordArr.includes(char)) return STYLES.INCORRECT
    // if the guessed character exists in the word but is in the wrong position
    if (char !== wordArr[index]) return STYLES.MISPLACED
    // otherwise it must be the correct letter in the correct position
    return STYLES.CORRECT
}

export const useKeyStyle = (char: string, correctLetters: string[], misplacedLetters: string[], incorrectLetters: string[]) => {
    if (correctLetters.includes(char)) return STYLES.CORRECT
    if (misplacedLetters.includes(char)) return STYLES.MISPLACED
    if (incorrectLetters.includes(char)) return STYLES.INCORRECT
    return STYLES.EMPTY
}