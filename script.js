let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        running = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.innerHTML = "00:00:00";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    lapCount = 0;
    lapList.innerHTML = '';
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" +
                        (minutes < 10 ? "0" + minutes : minutes) + ":" +
                        (seconds < 10 ? "0" + seconds : seconds);
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = display.innerHTML;
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`Lap ${lapCount}: ${lapTime}`));
        lapList.appendChild(li);
    }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
zz