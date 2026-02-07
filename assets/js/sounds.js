// Sounds Path And Other Information
const allSoundsInfo = [
    {
        id: "rain",
        name: "Rain",
        src: "assets/sounds/rain.ogg",
        avatar: "assets/sounds/avatars/sound_wave_static.png"
    },
    {
        id: "storm-thunders",
        name: "Storm Thunders",
        src: "assets/sounds/storm_thunders.ogg",
        avatar: "assets/sounds/avatars/sound_wave_static.png"
    },
    {
        id: "storm-with-distant-thunder",
        name: "Storm With Distant Thunder",
        src: "assets/sounds/storm_with_distant_thunder.ogg",
        avatar: "assets/sounds/avatars/sound_wave_static.png"
    },
    {
        id: "white-noise",
        name: "White Noise",
        src: "assets/sounds/white_noise.ogg",
        avatar: "assets/sounds/avatars/sound_wave_static.png"
    }
];
// Icons
const svgIcons = {
    play: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"/></svg>`,
    pause: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M6.5,0A3.5,3.5,0,0,0,3,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,6.5,0Z"/><path d="M17.5,0A3.5,3.5,0,0,0,14,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,17.5,0Z"/></svg>`
}
// Default Sounds State.
let soundState = {
    isPaused: true,
    lastPlayedSoundInfo: {
        id: "rain",
        name: "Rain",
        src: "assets/sounds/rain.ogg",
        avatar: "assets/sounds/avatars/sound_wave_static.png"
    }
}


export function renderAllSounds() {
    const soundElement = document.querySelector("#soundElement");
    const soundsList = document.querySelector(".sounds-list");
          soundsList.innerHTML = ""; // Clean Sounds List.
    allSoundsInfo.forEach((soundInfo)=>{
        // Create Elements
        const li = document.createElement("li");
        const soundAvatar = document.createElement("img");
        const soundName = document.createElement("span");
        const soundPlayBtn = document.createElement("button");
        // Add Class For Elements
        li.className = "sound-item";
        li.id = "sound-id-" + soundInfo.id;
        soundAvatar.className = "sound-avatar";
        soundName.className = "sound-name";
        soundPlayBtn.className = "sound-play-btn";
        // Update Values
        soundAvatar.src = soundInfo.avatar;
        soundName.textContent = soundInfo.name;
        soundPlayBtn.innerHTML = svgIcons.play;
        soundPlayBtn.addEventListener("click", ()=>{
            updateSoundElement(soundInfo);
            soundPlayPause(soundElement, soundInfo);
        });
        li.appendChild(soundAvatar);
        li.appendChild(soundName);
        li.appendChild(soundPlayBtn);
        soundsList.appendChild(li);
    });
    autoUpdatePlayingState();
}



function soundPlayPause(soundElement, soundInfo) {
    if (!soundElement) return;
    // Clear All Items Active State.
    document.querySelectorAll(".sound-item").forEach((item)=>{ item.classList.remove("active-sound-item"); });
    // Clear All Avatar State.
    document.querySelectorAll(".sound-item .sound-avatar").forEach((item)=>{ item.src = "assets/sounds/avatars/sound_wave_static.png"; });
    // Clear All Buttons State (play icon).
    document.querySelectorAll(".sound-play-btn").forEach((btn)=>{ btn.innerHTML = svgIcons.play; });
    // Get current active play button 
    let soundItem = document.querySelector("#sound-id-" + soundInfo.id);
    let soundPlayBtn = soundItem.querySelector(".sound-play-btn");
    let soundAvatar = soundItem.querySelector(".sound-avatar");
    // Add active class to played sound box
    soundItem.classList.add("active-sound-item");
    // Play
    if(soundElement.paused) {
        soundElement.play();
        soundPlayBtn.innerHTML = svgIcons.pause;
        soundAvatar.src = "assets/sounds/avatars/sound_wave_animated.gif";
    }
    // Pause
    else {
        soundElement.pause();
        soundPlayBtn.innerHTML = svgIcons.play;
        // Clear All Items Active State.
        document.querySelectorAll(".sound-item").forEach((item)=>{ item.classList.remove("active-sound-item"); });

    }
    // Update Sounds State and Store It.
    soundState = {
        isPaused: soundElement.paused,
        lastPlayedSoundInfo: soundInfo
    }
}



function updateSoundElement(soundInfo) {
    // If Element Is undefined Or Source Is Not Changed Don't Do Anything.
    if (!soundElement || soundElement.src === (location.origin + "/" + soundInfo.src)) return;
    // (location.origin) = something like: "http://localhost:8158".
    // Update Source
    soundElement.src = soundInfo.src;
}



function autoUpdatePlayingState() {
    if (soundState && !soundState.isPaused && soundElement) {
        soundElement.play();
        // Update Icon State
        let soundItem = document.querySelector("#sound-id-" + soundState.lastPlayedSoundInfo.id);
        let soundPlayBtn = soundItem.querySelector(".sound-play-btn");
        let soundAvatar = soundItem.querySelector(".sound-avatar");
        // Add active class to played sound box
        soundItem.classList.add("active-sound-item");
        soundPlayBtn.innerHTML = svgIcons.pause;
        soundAvatar.src = "assets/sounds/avatars/sound_wave_animated.gif";
    }
}



