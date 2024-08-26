var minutes = 25;
var seconds = 0;
var timer;
var isRunning = false;

document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const workTimeInput = document.getElementById('workTime');
    const breakTimeInput = document.getElementById('breakTime');
    const progressBar = document.getElementById('progressBar');
    const alarmSound = document.getElementById('alarmSound');
    const themeSwitch = document.getElementById('themeSwitch');

    startBtn.addEventListener('click', function () {
        if (!isRunning) {
            minutes = parseInt(workTimeInput.value);
            seconds = 0;
            startTimer();
        }
    });

    pauseBtn.addEventListener('click', function () {
        if (isRunning) {
            pauseTimer();
        }
    });

    resetBtn.addEventListener('click', function () {
        resetTimer();
    });

    themeSwitch.addEventListener('change', function () {
        document.body.classList.toggle('dark-mode');
    });

    function startTimer() {
        isRunning = true;
        timer = setInterval(function () {
            updateTimer();
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timer);
        isRunning = false;
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        minutes = parseInt(workTimeInput.value);
        seconds = 0;
        updateDisplay();
        resetProgressBar();
    }

    function updateTimer() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                isRunning = false;
                alarmSound.play();
                alert("Time's up!");
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay();
        updateProgressBar();
    }

    function updateDisplay() {
        document.getElementById('minutes').textContent = padTime(minutes);
        document.getElementById('seconds').textContent = padTime(seconds);
    }

    function updateProgressBar() {
        const totalSeconds = parseInt(workTimeInput.value) * 60;
        const elapsedSeconds = totalSeconds - (minutes * 60 + seconds);
        const progressPercentage = (elapsedSeconds / totalSeconds) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function resetProgressBar() {
        progressBar.style.width = '0%';
    }

    function padTime(time) {
        return time < 10 ? '0' + time : time;
    }
});
