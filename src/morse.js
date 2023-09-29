/* morse.js
 * morse code conversion operations
 */

var morseDict = {
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--.."
}

// convert a string to morse code
export function toMorseText(word) {
    var morseWord = "";

    for (var i = 0; i < word.length; i++) {
        morseWord += toMorseChar(word[i])

        if (i < word.length - 1) {
            morseWord += " ";
        }
    }
    return morseWord;
}

// convert a single character to a morse code character (dot or dash)
export function toMorseChar(char) {
    var c = char.toLowerCase();

    if (!(c in morseDict)) {
        return "?";
    }
    return morseDict[c];
}
