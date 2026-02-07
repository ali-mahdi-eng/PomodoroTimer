import * as pages from "./render-page.js";
import * as ui from "./ui.js";
import PomodoroTimer from "./timer.js";
import applySettings from "./settings.js";
import * as sounds from "./sounds.js";

/* ------------------------------ */
/* ------------------------------ */
// !!! Code Below, Will (Render Home Page) Before Calling Any DOM Element (to avoid runtime error of calling undefined element).
const main = document.querySelector(".main");
pages.renderHomePage(main);
pages.renderSelectBoxComponent(main);
// !!! Code Above, Will (Render Home Page) Before Calling Any DOM Element (to avoid runtime error of calling undefined element).
let currentActivePage = "home";
history.pushState({page:currentActivePage},"");

// Set Default Time Settings
let timeSettings = {
    "pomodoro": {
        "selected": 45,
        "allSelects": [25, 30, 45, 60, 90, 120]
    },
    "short-break": {
        "selected": 5,
        "allSelects": [5, 10, 15]
    },
    "long-break": {
        "selected": 20,
        "allSelects": [15, 20, 30, 60]
    }
}
// Get Time Settings From Storage.
timeSettings = !(localStorage.getItem("timeSettings")) ? (timeSettings) : (JSON.parse(localStorage.getItem("timeSettings")));
// ------------------------------
// ------------------------------


const allNavigationBtns = document.querySelectorAll(".navigation");
// let timeToCustomise = ["pomodoro"];
let timeToCustomise = "pomodoro";

// Calling DOM Of "home" page.
const startPomodoroBtn = document.querySelector(".start-pomodoro-btn");
const pausePomodoroBtn = document.querySelector(".pause-pomodoro-btn");
const closePomodoroBtn = document.querySelector(".close-pomodoro-btn");


// Update Timer & It's UI
let totalTimeInMin = (timeSettings) ? (timeSettings[timeToCustomise]["selected"]) : (45);
let totalTimeInMS = totalTimeInMin * 60 * 1000;
let timer = new PomodoroTimer(totalTimeInMS);
ui.updateTimerUI(totalTimeInMS, totalTimeInMS)


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
    // Update Ability To Edit Time
    if (timer.state === "running" && currentActivePage === "home") {
        document.querySelector(".timer-edit").style.display = "none";
        document.querySelector(".timer-container").style.pointerEvents = "none";
    }
    else if (timer.state !== "running" && timer.state !== "paused" && currentActivePage === "home") {
        document.querySelector(".timer-edit").style.display = "flex";
        document.querySelector(".timer-container").style.pointerEvents = "auto";
    }
}, 1000);


// Set Total Time
document.querySelector(".timer-container").addEventListener("click", editTimer);
function editTimer() {
    // Open Select Box
    document.querySelector("#select-container").style.display = "flex";
    // Settings Variables
    const settingsTimeItems = document.querySelectorAll(".settings-items.time-to-customise");
    const selectContainer = document.querySelector("#select-container");
    const selectBoxBG = document.querySelector("#select-box-bg");
    const selectList = document.querySelector("#select-list");
    // Open select box
    selectList.innerHTML = "";
    timeSettings[timeToCustomise]["allSelects"].forEach((timeValue)=>{
        let createdItem = document.createElement("button");
            createdItem.className = "select-items";
            createdItem.dataset.time = timeValue; 
            createdItem.textContent = timeValue + " min";
        if (timeValue === +timeSettings[timeToCustomise]["selected"]) { createdItem.classList.add("active-select-items"); }
        // Update and Save New Settings
        createdItem.onclick = ()=>{
            // Update Settings
            timeSettings[timeToCustomise]["selected"] = timeValue;
            // Update Active Button
            const selectItems = document.querySelectorAll(".select-items");
            selectItems.forEach((e)=>{ e.classList.remove("active-select-items"); });
            createdItem.classList.add("active-select-items");
           // Save Settings in Local Storage 
            localStorage.setItem("timeSettings", JSON.stringify(timeSettings));
            // Update Time
            totalTimeInMin = timeValue;
            totalTimeInMS = totalTimeInMin * 60 * 1000;
            // Apply New Timer 
            timer = new PomodoroTimer(totalTimeInMS);
            // Update Timer Text
            ui.updateTimerUI(timer.getRemainingTime(), totalTimeInMS);
            // Auto Close Select Box
            selectContainer.style.display="none";
        }
        selectList.appendChild(createdItem);
        selectContainer.style.display = "flex";
    });
    // Close select box
    selectBoxBG.onclick = ()=>{ selectContainer.style.display="none"; }
}





// Update play & pause buttons
startPomodoroBtn?.addEventListener("click", function(){ ui.updatePlayPauseBtnUI("pause"); timer.startPomodoro(); });
pausePomodoroBtn?.addEventListener("click", function(){ ui.updatePlayPauseBtnUI("start"); timer.pausePomodoro(); });
closePomodoroBtn?.addEventListener("click", function(){ ui.updatePlayPauseBtnUI("start"); timer.resetPomodoro(); ui.updateTimerUI(totalTimeInMS, totalTimeInMS); });






// Update Activate Page
allNavigationBtns?.forEach((e)=>{
    e.addEventListener("click", function() {
        // Always Get Updated Settings.
        timeSettings = !(localStorage.getItem("timeSettings")) ? (timeSettings) : (JSON.parse(localStorage.getItem("timeSettings")));
        // Update Active Page
        currentActivePage = e.dataset.target;
        // Update UI Of Active Page
        ui.updateActivePageNavBtn(currentActivePage);
        switch (e.dataset.target) {
            case 'home':
                pages.renderHomePage(main);
                pages.renderSelectBoxComponent(main)
                if (timer.state === "running") {
                    ui.updatePlayPauseBtnUI("pause");
                }
                else if (timer.state === "paused") {
                    ui.updatePlayPauseBtnUI("start");
                }
                if (timer.state !== "running" && timer.state !== "paused") {
                    // Update Time
                    if (!timeSettings) {
                        console.error("Ops! «timeSettings» is not defined.");
                        alert("!!! \n Ops!, there is a problem in settings.. \n\n >> You can fix that by changing time settings from settings page. \n\n - We are really sorry about this!.");
                        return; // Stop Function.
                    };
                    totalTimeInMin = timeSettings[timeToCustomise]["selected"];
                    totalTimeInMS = totalTimeInMin * 60 * 1000;
                    // Apply New Timer
                    timer = new PomodoroTimer(totalTimeInMS);
                }
                // Update Time Text In UI
                ui.updateTimerUI(timer.getRemainingTime(), totalTimeInMS);
                const startPomodoroBtn = document.querySelector(".start-pomodoro-btn");
                const pausePomodoroBtn = document.querySelector(".pause-pomodoro-btn");
                const closePomodoroBtn = document.querySelector(".close-pomodoro-btn");
                // Update play & pause buttons
                startPomodoroBtn?.addEventListener("click", function(){ ui.updatePlayPauseBtnUI("pause"); timer.startPomodoro(); });
                pausePomodoroBtn?.addEventListener("click", function(){ ui.updatePlayPauseBtnUI("start"); timer.pausePomodoro(); });
                closePomodoroBtn?.addEventListener("click", function(){ ui.updatePlayPauseBtnUI("start"); timer.resetPomodoro(); ui.updateTimerUI(totalTimeInMS, totalTimeInMS); });
                // Update Edit timer
                document.querySelector(".timer-container").addEventListener("click", editTimer);
                break;
            case 'sounds':
                pages.renderSoundsPage(main);
                sounds.renderAllSounds();
                break;
            case 'settings':
                pages.renderSettingsPage(main);
                pages.renderSelectBoxComponent(main);
                applySettings();
                break;
            default:
                pages.renderHomePage(main);
        }
        
        // When going to "settings" or "sounds".
        if (currentActivePage /*!== "home"*/) {
            // history.replaceState({page:currentActivePage},"");
            if (history.state === null) history.pushState({page:currentActivePage},"");
            if (history.state !== null) history.replaceState({page:currentActivePage},"");
        }
    });
});
    

// Handle Back button on mobile or browser
/*
window.onpopstate = () => {
    if (currentActivePage !== "home") {
        // From any internal page → go back to Home
        pages.renderHomePage(main);
        currentActivePage = "home";
        ui.updateActivePageNavBtn("home");
        // Push Home back to history so next Back triggers exit confirmation
        history.pushState({page:"home"},"");
    }
    else {
        // From Home → ask for exit
        const wantExit = confirm("Do you want to exit?");
        if (!wantExit) {
            // User canceled exit → push Home again to prevent leaving
            history.pushState({ page: "home" }, "");
            console.log("home, don't exit", history);
        }
        // If user confirms → browser exits as normal
        else {
            history.go(-1);
            console.log("home, exit", history);
            // history.popState()
        }
    }
    console.log("anywhere, onpopstate", history);
};
*/

window.onpopstate = () => {
    if (history.state.page !== "home") {
        // From any internal page → go back to Home
        pages.renderHomePage(main);
        currentActivePage = "home";
        ui.updateActivePageNavBtn("home");
        // Push Home back to history so next Back triggers exit confirmation
        // history.pushState({page:"home"},"");
    }
    else {
        // From Home → ask for exit
        const wantExit = confirm("Do you want to exit?");
        if (!wantExit) {
            // User canceled exit → push Home again to prevent leaving
            history.pushState({ page: "home" }, "");
            console.log("home, don't exit", history);
        }
        // If user confirms → browser exits as normal
        else {
            history.go(-1);
            console.log("home, exit", history);
            // history.popState()
        }
    }
    console.log("anywhere, onpopstate", history);
};




