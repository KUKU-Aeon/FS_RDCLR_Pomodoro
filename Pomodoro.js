document.addEventListener('DOMContentLoaded', function (){
    let workTime = document.getElementById('work-time').value * 60; // время работы в секундах
    let shortBreakTime = document.getElementById('short-break-time').value * 60; // время короткого перерыва в секундах
    let longBreakTime = document.getElementById('long-break-time').value * 60; // время длинного перерыва в секундах
    let pomodoroCount = document.getElementById('pomodoro-count').value; // количество помодоро до длинного перерыва
    let count = 0; // счетчик циклов
    let timerInterval; // переменная для хранения интервала таймера
    let isPaused = false; // флаг для проверки, находится ли таймер на паузе
    let audioPlayer = new Audio('content/ticking-slow.mp3')

    document.addEventListener('click', function (event){
        let elementId = event.target.id;
        switch (elementId)
        {
            case 'start': startWork(elementId);
                break;
            case 'pause': startWork(elementId);
                break;
            case 'reset': resetTimer();
                break;
            case 'work-time-button': setWorkTime(document.getElementById('work-time').value);
                break;
            case 'short-break-time-button': setShortBreakTime(document.getElementById('short-break-time').value);
                break;
            case 'long-break-time--button': setLongBreakTime(document.getElementById('long-break-time').value);
                break;
            case 'pomodoro-count-button': setPomodoroCount(document.getElementById('pomodoro-count').value);
                break;
            default:
                break;
        }
    })

    function startTimer(duration, display) {
        isPaused = false;
        let timer = duration, minutes, seconds;
        timerInterval = setInterval(function () {
            audioPlayer.play();
            if (!isPaused) {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;
                workTime -= 1;

                if (--timer < 0) {
                    clearInterval(timerInterval);
                    if (count % pomodoroCount === 0) {
                        startBreak(longBreakTime);
                    } else {
                        startBreak(shortBreakTime);
                    }
                }
            }
        }, 1000);
        workTime = document.getElementById('work-time').value * 60;
    }


    function startWork(id) {
        if (id === 'start')
        {
            count++;
            startTimer(workTime, document.getElementById("timer"));
            document.getElementById('start').textContent = 'Пауза'
            document.getElementById('start').id = 'pause';

        }
        else
        {
            isPaused = true;
            audioPlayer.pause();
            clearInterval(timerInterval);
            document.getElementById('pause').textContent = 'Старт'
            document.getElementById('pause').id = 'start';

        }

    }

    function startBreak(breakTime) {
        startTimer(breakTime, document.getElementById("timer"));
    }


    function resetTimer() {
        audioPlayer.pause();
        clearInterval(timerInterval);
        document.getElementById('pause').textContent = 'Старт';
        document.getElementById('pause').id = 'start';
        document.getElementById("timer").textContent = `${document.getElementById('work-time').value}:00`;
    }

    function setWorkTime(minutes) {
        workTime = minutes * 60;
        resetTimer();
    }

    function setShortBreakTime(minutes) {
        shortBreakTime = minutes * 60;
        resetTimer();
    }

    function setLongBreakTime(minutes) {
        longBreakTime = minutes * 60;
        resetTimer();
    }

    function setPomodoroCount(count) {
        pomodoroCount = count;
        resetTimer();
    }

    console.log(workTime)
})