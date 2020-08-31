/**
 * @method getLetterMatchCount
 * @param {string} guessedWord - Guessed word.
 * @param {string} secretWord - Secret word.
 * @returns {number} - Number of letters matched between guessed word and hidden word
 */


export function getLetterMatchCount(guessedWord, secretWord) {
    const secretLetterSet = secretWord.split('')
    const guessedLetterSet = new Set(guessedWord)
    return [...secretLetterSet].filter(letter => guessedLetterSet.has(letter)).length
}
