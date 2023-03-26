const gameArea = document.getElementById('gameArea');
const correctCountElement = document.getElementById('correctCount');
const failsCountElement = document.getElementById('failCount');
const lifeCountElement = document.getElementById('lifeCount');
const timeRange = document.getElementById('timeRange');
var audiocai = document.getElementById("cai");
var audiolife = document.getElementById("life");
var audioeat = document.getElementById("eat");
var audiofail = document.getElementById("fail");
var audiobrick = document.getElementById("brick");
var bgaudio = document.getElementById("myAudio");
var timer = document.getElementById("timer");

var intervalTimer;
var seconds = 0;
var minutes = 0;
var hours = 0;

const maxFails = 5;
let letters = [];
let fails = 0;
let correctCount = 0;
let lifeCount = 0;
let gameInterval;

function createLetter() {
    const letter = document.createElement('div');
    letter.className = 'letter';
    letter.textContent = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    letter.style.left = Math.floor(Math.random() * (gameArea.clientWidth - 120)) + 'px';
    letter.style.top = '20px';
    letter.style.color = 'lightgray';
    gameArea.appendChild(letter);
    letters.push(letter);
    console.log((3500 - timeRange.value) / 1000 + 's 生成一个字母');
}

function moveLetters() {
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        let currentTop = parseInt(letter.style.top);
        currentTop += 20;
        letter.style.top = currentTop + 'px';

        if (currentTop > gameArea.clientHeight - 30) {
            gameArea.removeChild(letter);
            letters.splice(i, 1);
            fails++;
            failsCountElement.textContent = fails;

            if (fails >= maxFails) {
                // alert('任务失败');
                audiofail.play();
                stopTimer();
                clearInterval(gameInterval);
            }
        }
    }
}

function handleKeyPress(e) {
    const key = e.key.toUpperCase();

    for (let i = 0; i < letters.length; i++) {
        if (letters[i].textContent === key) {
            letters[i].style.color = 'red';

            setTimeout(function () {
                gameArea.removeChild(letters[i]);
                letters.splice(i, 1);
            }, 200);

            if(letters.length < 3){
                createLetter();
            }
            correctCount++;
            musicPlay(correctCount);
            correctCountElement.textContent = correctCount;
            break;
        }
    }
}

gameArea.addEventListener('keydown', handleKeyPress);


function musicPlay(count) {
    if (count % 100 == 0) {
        lifeCount++;
        lifeCountElement.textContent = lifeCount;
        audioeat.play();
        audioeat.currentTime = 0;
    }
    if (count > 0 & count % 10 != 0) {
        if (count % 3 == 0) {
            audiobrick.play();
            audiobrick.currentTime = 0;
        } else {
            audiocai.play();
            audiocai.currentTime = 0;
        }
    } else {
        audiolife.play();
        audiolife.currentTime = 0;
    }
}



function startGame() {
    this.innerText = '游戏进行中。。。'
    playAudio();
    startTimer();
    gameInterval = setInterval(() => {
        gameArea.focus();
        createLetter();
        moveLetters();
    }, 2500);
}


function playAudio() {
    bgaudio.volume = 0.2;
    bgaudio.play();
}


// Timer 



function startTimer() {
    intervalTimer = setInterval(function() {
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
    }
    timer.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalTimer);
}

timeRange.addEventListener('change', function () {
    clearInterval(gameInterval);
    gameArea.focus();
    gameInterval = setInterval(() => {
        createLetter();
        moveLetters();
    }, 3500 - timeRange.value);
});