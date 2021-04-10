/* generator.js
 * generates random morse code words to enter into the text box
 */

import { toMorseText } from './morse.js';
import { getRandomWord } from './dict.js';

// gaps between morse code words, characters, and beeps (seconds)
var wordDelay = 1
var charDelay = 0.45
var beepDelay = 0.075

var initialized = false;
var ctx = null;
var dot = null, dash = null;
var hiddenHint = true;
var randWord = null;
var morseWord = null;

var playbutton = document.getElementById("playbutton");
var stopbutton = document.getElementById("stopbutton");
var textbox = document.getElementById("textbox");
var hint = document.getElementById("hint");
var result = document.getElementById("result");


/* * * * * buttons * * * * */

// on play button click, play current word
playbutton.onclick = playCurrWord;


// on enter key, play current word
textbox.addEventListener("keyup", async function(event) {
    if (event.keyCode === 13) {
        playCurrWord();
    }
});

// start or go to next word, or replay current word
async function playCurrWord() {
    if (!initialized) {
        await initAudio().then(async () => {
            initialized = true;
            // hint.innerHTML = "click to show/hide hint";
            generateNext();
        })
    } else if (correct) {
        correct = false;
        textbox.value = "";

        hiddenHint = true;
        // hint.innerHTML = "click to show/hide hint";

        // fade out success message
        setTimeout(function() {
            var timerId = setInterval(function() {
                let opacity = result.style.opacity;
                if (opacity == 0) {
                    clearInterval(timerId);
                } else {
                    result.style.opacity = opacity - 0.05;
                }
            }, 50);
        }, 100);

        generateNext();
    } else {
        await playMorseAudio(morseWord);
    }
}

// show/hide hint
// window.onload = function() {
//     hint.onclick = function () {
//         if (hiddenHint) {
//             hiddenHint = false;
//             hint.innerHTML = morseWord;
//         } else {
//             hiddenHint = true;
//             hint.innerHTML = "click to show/hide hint";
//         }
//     };
// }

// on stop button click, stop current word
stopbutton.onclick = async () => {
    if (ctx) {
        await ctx.close().then(() => ctx = null);
    }
};


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
async function playMorseAudio(str) {
    if (ctx) {
        await ctx.close().then(() => {
            ctx = null;
            createMorseBuffer(str);
        });
    } else {
        createMorseBuffer(str);
    }
}

function createMorseBuffer(str) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    let time = 0;

    for (let i = 0; i < str.length; i++) {
        let c = str[i];
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

// when text box input matches, genenerate new word
textbox.addEventListener('input', async () => {
    let response = textbox.value;

    if (randWord == response) {
        if (ctx) {
            await ctx.close().then(async () => {
                ctx = null;
                handleSuccess();
                
            });
        } else {
            handleSuccess();
        } 
    }
});

var correct = false;

// set response when entered correct answer
function handleSuccess() {
    correct = true;
    result.style.opacity = 1;
    result.innerHTML = "correct!<br />" + randWord;
}

// start next round
async function generateNext() {
    generateWord();
    await playMorseAudio(morseWord);
}

// generate new random word
function generateWord() {
    randWord = getRandomWord();
    morseWord = toMorseText(randWord);
    console.log(randWord + "\n" + morseWord);
}
