

function formatTime(time) {
    // Format Time As 00:00:00
    return String(Math.floor(time)).padStart(2, '0');
}

export function updateTimerUI(remainingTimeinMS, totalTimeInMS) {
    // Time In Milliseconds (MS)
    const timerText = document.querySelector(".timer-text");
    const timerCircleProgress = document.querySelector(".timer-circle-progress");
    let mm = formatTime((remainingTimeinMS/1000) / 60);
    let ss = formatTime(((remainingTimeinMS/1000) % 60));

    timerText.textContent = `${mm}:${ss}`;
    timerCircleProgress.style.strokeDashoffset = (totalTimeInMS > 0) ? (1-(remainingTimeinMS/totalTimeInMS)) : (0);
}


export function updatePlayPauseBtnUI(state="start") {
    const startPomodoroBtn = document.querySelector(".start-pomodoro-btn");
    const pausePomodoroBtn = document.querySelector(".pause-pomodoro-btn");
    const closePomodoroBtn = document.querySelector(".close-pomodoro-btn");
    
    switch (state) {
        case 'start':
            startPomodoroBtn.style.display = "flex";
            closePomodoroBtn.style.display = "none";
            pausePomodoroBtn.style.display = "none";
            break;
        case 'pause':
            startPomodoroBtn.style.display = "none";
            closePomodoroBtn.style.display = "flex";
            pausePomodoroBtn.style.display = "flex";
            break;
        
        default:
            startPomodoroBtn.style.display = "flex";
            closePomodoroBtn.style.display = "none";
            pausePomodoroBtn.style.display = "none";
    }
}


export function showPomodoroAlert() {
    console.log("Alert!: Pomodoro is Ended");
}


export function updateActivePageNavBtn(activePage) {
    const allNavigationBtns = document.querySelectorAll(".navigation");
    allNavigationBtns.forEach((e)=>{
        e.classList.remove("active-navigation-btn")
        if(e.dataset.target === activePage) { e.classList.add("active-navigation-btn") }
    });
}

