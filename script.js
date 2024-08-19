const FULL_DASH_ARRAY = 2 * Math.PI * 90;  // Circumference of the circle
const TIME_LIMIT = 25 * 60;  // 25 minutes in seconds
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

const timeDisplay = document.querySelector('.time-display');
const progressRingCircle = document.querySelector('.progress-ring__circle');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

progressRingCircle.style.strokeDasharray = `${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`;
progressRingCircle.style.strokeDashoffset = `${FULL_DASH_ARRAY}`;

function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        timeDisplay.textContent = formatTime(timeLeft);
        setCircleDashoffset();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Pomodoro complete! Take a break.");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    timePassed = 0;
    timeLeft = TIME_LIMIT;
    timeDisplay.textContent = formatTime(timeLeft);
    setCircleDashoffset();
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setCircleDashoffset() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    const circleDashoffset = FULL_DASH_ARRAY * (1 - rawTimeFraction);
    progressRingCircle.style.strokeDashoffset = circleDashoffset;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);