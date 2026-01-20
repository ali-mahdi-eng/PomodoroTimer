import * as pages from "./render-page.js";
import * as ui from "./ui.js";
import PomodoroTimer from "./timer.js";


/* ------------------------------ */
/* ------------------------------ */

const main = document.querySelector(".main");
pages.renderHomePage(main);


let totalTimeInMin = 25;
let totalTimeInMS = totalTimeInMin * 60 * 1000;
let timer = new PomodoroTimer(totalTimeInMS);

const startPomodoroBtn = document.querySelector(".start-pomodoro-btn");
const pausePomodoroBtn = document.querySelector(".pause-pomodoro-btn");
const closePomodoroBtn = document.querySelector(".close-pomodoro-btn");

const allNavigationBtns = document.querySelectorAll(".navigation");
let currentActivePage = "home";
/* ------------------------------ */
/* ------------------------------ */







// Update Timer UI
setInterval(function() {
    // Pomodoro Running
    if (currentActivePage === "home" && timer.state === "running" && !timer.isPomodoroEnded()) {
        ui.updateTimerUI(timer.getRemainingTime(), totalTimeInMS);
    }
    // Pomodoro Finished
    else if (timer.state !== "idle" && timer.isPomodoroEnded()) {
        // Show Alert
        ui.showPomodoroAlert();
        // Update play & pause buttons
        ui.updatePlayPauseBtnUI("start");
    }
}, 1000);

// Set Total Time
document.querySelector(".timer-text").addEventListener("click", function() {
    // Update Total Time
    let inputPomodoroTotalTime = prompt("Enter Pomodoro Time In Minutes...");
    if (inputPomodoroTotalTime < 1) return;
    totalTimeInMin = inputPomodoroTotalTime;
    totalTimeInMS = totalTimeInMin * 60 * 1000;
    timer = new PomodoroTimer(totalTimeInMS);
    // Update Timer Text
    ui.updateTimerUI(timer.getRemainingTime(), totalTimeInMS);
    // Resize Timer Fonts Size Depending on length of time string.
    if(totalTimeInMS >= 3600000) {document.querySelector(".timer-text").style.fontSize = "48px";} /* if the total time is one hour or more */
    else {document.querySelector(".timer-text").style.fontSize = "56px";} /* if the total time is less than one hour */
});



// Resize Timer Fonts Size Depending on length of time string.
if(totalTimeInMS >= 3600000) {document.querySelector(".timer-text").style.fontSize = "48px";} /* if the total time is one hour or more */
else {document.querySelector(".timer-text").style.fontSize = "56px";} /* if the total time is less than one hour */


// Update play & pause buttons
startPomodoroBtn?.addEventListener("click", function(){ ui.updatePlayPauseBtnUI("pause"); timer.startPomodoro(); });
pausePomodoroBtn?.addEventListener("click", function(){ ui.updatePlayPauseBtnUI("start"); timer.pausePomodoro(); });
closePomodoroBtn?.addEventListener("click", function(){ ui.updatePlayPauseBtnUI("start"); timer.resetPomodoro(); ui.updateTimerUI(totalTimeInMS, totalTimeInMS); });



// Update Activate Page
allNavigationBtns?.forEach((e)=>{
    e.addEventListener("click", function() {
        ui.updateActivePageNavBtn(e.dataset.target);
        currentActivePage = e.dataset.target;
        switch (e.dataset.target) {
            case 'home':
                pages.renderHomePage(main);
                if (timer.state === "running") {
                    ui.updatePlayPauseBtnUI("pause");
                }
                else if (timer.state === "paused") {
                    ui.updatePlayPauseBtnUI("start");
                }
                ui.updateTimerUI(timer.getRemainingTime(), totalTimeInMS);
                // Resize Timer Fonts Size Depending on length of time string.
                if(totalTimeInMS >= 3600000) {document.querySelector(".timer-text").style.fontSize = "48px";} /* if the total time is one hour or more */
                else {document.querySelector(".timer-text").style.fontSize = "56px";} /* if the total time is less than one hour */
                const startPomodoroBtn = document.querySelector(".start-pomodoro-btn");
                const pausePomodoroBtn = document.querySelector(".pause-pomodoro-btn");
                const closePomodoroBtn = document.querySelector(".close-pomodoro-btn");
                // Update play & pause buttons
                startPomodoroBtn?.addEventListener("click", function(){ ui.updatePlayPauseBtnUI("pause"); timer.startPomodoro(); });
                pausePomodoroBtn?.addEventListener("click", function(){ ui.updatePlayPauseBtnUI("start"); timer.pausePomodoro(); });
                closePomodoroBtn?.addEventListener("click", function(){ ui.updatePlayPauseBtnUI("start"); timer.resetPomodoro(); ui.updateTimerUI(totalTimeInMS, totalTimeInMS); });
                break;
            case 'noise':
                pages.renderNoisePage(main);
                break;
            case 'settings':
                pages.renderSettingsPage(main);
                break;
            case 'profile':
                pages.renderProfilePage(main);
                break;
            default:
                pages.renderHomePage(main);
        }
        
    });
});
    



