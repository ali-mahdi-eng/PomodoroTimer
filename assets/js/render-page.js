

export function renderHomePage(main) {
    const homePage = `
	    <section data-page="home">
    	    <div class="timer-container">
                <svg class="timer-svg" viewBox="0 0 100 100">
                    <!-- Gray Circle Of Total Time -->
                    <circle class="timer-circle-track" cx="50" cy="50" r="45"></circle>
                    <!-- Colored Circle Of Remaining Time -->
                    <circle class="timer-circle-progress" pathLength="1" cx="50" cy="50" r="45"></circle>
                </svg>
    	        <span class="timer-text">25:00</span>
    	    </div>
    	    <button class="start-pomodoro-btn" aria-label="start pomodoro">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"><path fill="#fff" d="M20.494,7.968l-9.54-7A5,5,0,0,0,3,5V19a5,5,0,0,0,7.957,4.031l9.54-7a5,5,0,0,0,0-8.064Zm-1.184,6.45-9.54,7A3,3,0,0,1,5,19V5A2.948,2.948,0,0,1,6.641,2.328,3.018,3.018,0,0,1,8.006,2a2.97,2.97,0,0,1,1.764.589l9.54,7a3,3,0,0,1,0,4.836Z"/></svg>
            </button>
    	    <button class="hidden pause-pomodoro-btn" aria-label="pause pomodoro">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path fill="#fff" d="M6.5,0A3.5,3.5,0,0,0,3,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,6.5,0ZM8,20.5a1.5,1.5,0,0,1-3,0V3.5a1.5,1.5,0,0,1,3,0Z"/><path fill="#fff" d="M17.5,0A3.5,3.5,0,0,0,14,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,17.5,0ZM19,20.5a1.5,1.5,0,0,1-3,0V3.5a1.5,1.5,0,0,1,3,0Z"/></svg>
            </button>
    	    <button class="hidden close-pomodoro-btn" aria-label="close pomodoro">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30"><path fill="#fff" d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z"/></svg>
            </button>
        </section>
    `;
    if (main) main.innerHTML = homePage;
    return homePage;
}


export function renderNoisePage(main) {
    const noisePage = `
        No White Noise yet
    `;
    
    if (main) main.innerHTML = noisePage;
    return noisePage;
}

export function renderSettingsPage(main) {
    const settingsPage = `
        No Settings yet
    `;
    
    if (main) main.innerHTML = settingsPage;
    return settingsPage;
}

export function renderProfilePage(main) {
    const profilePage = `
        No Profile yet
    `;
    
    if (main) main.innerHTML = profilePage;
    return profilePage;
}



