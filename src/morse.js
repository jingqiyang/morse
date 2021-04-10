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


/*

var dotAudio = document.getElementById("dot_audio");
var dashAudio = document.getElementById("dash_audio");

document.getElementById("button").onclick = function() {
    if (this.textContent == "play") {
        this.textContent = "stop";
        dotAudio.muted = false;
        dashAudio.muted = false;

        var randWord = getRandomWord();
        var morseWord = toMorseText(randWord);
        var container = document.getElementById("container");
        container.innerHTML = randWord + " = " + morseWord;
        playMorseAudio(morseWord)
    } else {
        this.textContent = "play";

        dashAudio.pause();
        dashAudio.currentTime = 0;
        dotAudio.pause();
        dotAudio.currentTime = 0;
    }

};

// audio delay between dots and dashes within a word in morse code
var charDelay = 500;
var wordDelay = 10000;
var delay = 0;

var i = 0;
var currWord = "";

// play morse code audio for a morse code string
function playMorseAudio(word) {
    i = 0;
    currWord = word;
    playNextSound();

}

dotAudio.onended = playNextSound;
dashAudio.onended = playNextSound;

// play dot or dash audio sound
function playNextSound() {
    if (i >= currWord.length) {
        return;
    }

    c = currWord[i];
    delay = 0;

    if (c == ' ') {
        i += 1;
        if (i >= currWord.length) {
            return;
        }
        c = currWord[i];
        delay = charDelay;
    }

    if (c == '.') {
        dotAudio.play();
    } else {
        dashAudio.play();
    }
    i += 1;
}

function playSound(audio) {
    setTimeout(function() {
        audio.play();
    }, delay);
}

*/
