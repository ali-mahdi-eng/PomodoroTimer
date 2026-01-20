
export default class PomodoroTimer {
    constructor(pomodoroTimeInMS){
        this.state = "idle";
        this.pomodoroTimeInMS = pomodoroTimeInMS;
        this.endTime = null;
        this.remainingTime = pomodoroTimeInMS;
    }
    
    startPomodoro() {
        this.endTime = Date.now() + this.remainingTime;
        this.state = "running";
        return "pomodoro started successfully";
    }
    
    pausePomodoro() {
        if (this.state !== "running") return "timer pausing rejected: 'pomodoro is not running'";
        this.remainingTime = this.endTime - Date.now();
        this.state = "paused";
        return "pomodoro paused";
    }
    
    resetPomodoro() {
        this.remainingTime = this.pomodoroTimeInMS;
        this.state = "idle";
    }
    
    isPomodoroEnded() {
        if (Date.now() >= this.endTime) {
            this.remainingTime = 0;
            this.state = "ended";
            return true;
        }
        return false;
    }
    
    getRemainingTime() {
        if (this.state === "running") {
            return this.endTime - Date.now();
        }
        return this.remainingTime;
    }
    
}

/*
let myTimeInMS = 5 * 1000;
let timer = new PomodoroTimer(myTimeInMS);

console.log(timer);
console.log(timer.startPomodoro());
setInterval(function() {
    console.log(timer.isPomodoroEnded());
}, 1000);
*/

