var morseDict = {
    "a": ".-",
    "b": "_...",
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
function toMorseChar(char) {
    var c = char.toLowerCase();

    if (!(c in morseDict)) {
        return "?";
    }
    return morseDict[c];
}

// audio delay between dots and dashes within a word in morse code
var charDelay = 0;
var wordDelay = 500;

var dotAudio = document.getElementById("dot_audio");
var dashAudio = document.getElementById("dash_audio");

// play morse code audio for a string
export function toMorseAudio(word, isMorse=false) {
    for (var i = 0; i < word.length; i++) {
        var delay = i == 0 ? wordDelay : charDelay;
        var morseChar = isMorse ? word[i] : toMorseChar(word[i]);
        
        for (d in morseChar) {
            if (d == '.') {
                playSingleSound(dotAudio)
            } else {
                playSingleSound(dashAudio)
            }
        }
    }

}

// play dot or dash audio sound
function playSingleSound(audio, delay) {
    setTimeout(() => audio.play(), delay);
}
