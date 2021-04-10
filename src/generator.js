/* generator.js
 * generates random morse code words to enter into the text box
 */

import { toMorseText } from './morse.js';
import { getRandomWord } from './dict.js';

// gaps between morse code words, characters, and beeps (seconds)
wordDelay = 1
charDelay = 0.45
beepDelay = 0.075

var initialized = false;
var ctx = null;
var dot = null, dash = null;
var randWord = null;
var morseWord = null;

var playbutton = document.getElementById("playbutton");
var stopbutton = document.getElementById("stopbutton");
var container = document.getElementById("container");
var textbox = document.getElementById("textbox");


/* * * * * buttons * * * * */

// on play button click, play/replay current word
playbutton.onclick = async () => {
    if (!initialized) {
        await initAudio().then(() => {
            initialized = true;
            generateWord();
            playMorseAudio(morseWord);
        })
    }
    else {
        playMorseAudio(morseWord);
    }
};

// on stop button click, stop current word
stopbutton.onclick = async () => await ctx.close();


/* * * * * audio * * * * */

// initialize audio
async function initAudio() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    [dot, dash] = await fetchBuffers(ctx);
}

// get audio files
function fetchBuffers(ctx) {
  return Promise.all(
    [
        'https://jingqiyang.github.io/morse/resources/dot.wav',
        'https://jingqiyang.github.io/morse/resources/dash.wav'
    ].map(url => fetch(url)
        .then(r => r.arrayBuffer())
        .then(buf => ctx.decodeAudioData(buf))
    )
  );
}

// play audio of a morse code string
function playMorseAudio(str) {
    console.log(str)
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    let time = 0;

    for (i = 0; i < str.length; i++) {
        c = str[i];
        if (c === ' ') {
            time += charDelay;
            continue;
        }

        let node = ctx.createBufferSource();
        node.buffer = c === '-' ? dash : dot;
        node.connect(ctx.destination);
        node.start(ctx.currentTime + time);
        time += node.buffer.duration + beepDelay;
    }
}


/* * * * * word generation and matching * * * * */

// generate new random word
function generateWord() {
    randWord = getRandomWord();
    morseWord = toMorseText(randWord);
    container.innerHTML = randWord + " = " + morseWord;
}

// when text box input matches, genenerate new word
textbox.addEventListener('input', async () => {
    let response = textbox.value;

    if (randWord == response) {
        textbox.value = "";
        await ctx.close().then(() => {
            generateWord();
            playMorseAudio(morseWord);
        });
    }
});
