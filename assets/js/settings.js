
export default function applySettings() {

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
    timeSettings = !(localStorage.getItem("timeSettings")) ? (timeSettings) : (JSON.parse(localStorage.getItem("timeSettings")));
let timeToCustomise = null;

const settingsTimeItems = document.querySelectorAll(".settings-items.time-to-customise");
const selectContainer = document.querySelector("#select-container");
const selectBoxBG = document.querySelector("#select-box-bg");
const selectList = document.querySelector("#select-list");

// Update Settings UI
settingsTimeItems.forEach((e)=>{
    e.querySelector(".settings-button").textContent = timeSettings[e.dataset.timetocustomise]["selected"];
})


// Open select box
settingsTimeItems.forEach((item)=>{
    item.addEventListener("click", ()=>{
        timeToCustomise = item.dataset.timetocustomise;
        selectList.innerHTML = "";
        timeSettings[timeToCustomise]["allSelects"].forEach((timeValue)=>{
            let createdItem = document.createElement("button");
                createdItem.className = "select-items";
                createdItem.dataset.time = timeValue; 
                createdItem.textContent = timeValue + " min";
            if (timeValue === +timeSettings[timeToCustomise]["selected"]) { createdItem.classList.add("active-select-items"); }
            // Update and Save New Settings
            createdItem.addEventListener("click", ()=>{
                // Update Settings
                timeSettings[timeToCustomise]["selected"] = timeValue;
                // Update Active Button
                const selectItems = document.querySelectorAll(".select-items");
                selectItems.forEach((e)=>{ e.classList.remove("active-select-items"); });
                createdItem.classList.add("active-select-items");
                // Update displayed Time in settings UI.
                item.querySelector(".settings-button").textContent = timeValue;
                // Save Settings in Local Storage 
                localStorage.setItem("timeSettings", JSON.stringify(timeSettings));
            });
            selectList.appendChild(createdItem);
        })
        selectContainer.style.display = "flex";
    });
});

// Close select box
selectBoxBG.addEventListener("click", ()=>{
    selectContainer.style.display = "none";
});








}


