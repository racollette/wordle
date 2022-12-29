import targets from '../constants/targets.json'
import dictionary from '../constants/dictionary.json'

export const generateRandomWord = (length: number = 5) => {
    const filterByLength = targets.filter((word => word.length === length))
    const randomIndex = Math.floor(Math.random()*filterByLength.length)
    const randomWord = filterByLength[randomIndex]
    return randomWord
}

export const isInDictionary = (word: string) => {
    const wordIsValid = dictionary.find(item => item === word)
    return wordIsValid
}

export const findDuplicates = (arr: string[]) => {
    // function that checks if any letters are repeated
    return arr.filter((currentValue, currentIndex) =>
    arr.indexOf(currentValue) !== currentIndex);
}