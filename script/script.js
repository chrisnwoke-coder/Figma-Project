/**sidebar*/
function openFolder(evt,content){

    if (!localStorage.getItem('tabClicked')) {
        localStorage.setItem('tabClicked', 'true');
        location.reload(); // Reload the page
        return;
    }
    
    var i, contnt, tabcontnt;
    contnt = document.getElementsByClassName('content');
    for(i=0; i<contnt.length; i++){
        contnt[i].className = contnt[i].className.replace(" active", "")
    }
    tabcontnt = document.getElementsByClassName('tabcontent');
    for(i=0; i<tabcontnt.length; i++){
        tabcontnt[i].style.display = "none";
    }

    document.getElementById(content).style.display = "block";
    evt.currentTarget.className += " active";

}

document.getElementById("openContent").click();




/* settings*/
function settingsInfo(evt, cont){
    
    if (!localStorage.getItem('tabClicked')) {
        localStorage.setItem('tabClicked', 'true');
        location.reload(); // Reload the page
        return;
    }
    
    var i, gen_content, general;
    gen_content = document.getElementsByClassName('general-tabcontent');
    for(i=0; i<gen_content.length; i++){
    gen_content[i].style.display = "none";
    }
    
    general = document.getElementsByClassName('general');
    for(i=0; i<general.length; i++){
        general[i].className = general[i].className.replace(" active", "");
    }

    document.getElementById(cont).style.display = "block";
    evt.currentTarget.className += " active";
    
}

document.getElementById("defaultOpen").click();


/* video*/
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');    
    const playButton = document.querySelector('.play');
    const pauseButton = document.querySelector('.pause');
    const progress = document.querySelector('.progress');
    const volumeControl = document.querySelector('.volume');
    const muteButton = document.querySelector('.mute');
    const fullscreenButton = document.querySelector('.fullscreen');
    const mirrorButton = document.querySelector('.mirror');
    const currentTimeDisplay = document.querySelector('.current-time');
    const durationDisplay = document.querySelector('.duration-time');

    // Function to format time
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Function to update button visibility based on video state
    function updatePlayPauseButtons() {
        if (video.paused) {
            playButton.style.display = 'block';
            pauseButton.style.display = 'none';
        } else {
            playButton.style.display = 'none';
            pauseButton.style.display = 'block';
        }
    }

    // Event listeners
    video.addEventListener('loadedmetadata', () => {
        console.log('Metadata loaded');
        console.log('Duration:', video.duration); // Debugging line
        durationDisplay.textContent = formatTime(video.duration);
    });

    video.addEventListener('timeupdate', () => {
        console.log('Current Time:', video.currentTime); // Debugging line
        const percent = (video.currentTime / video.duration) * 100;
        progress.value = percent;
        currentTimeDisplay.textContent = formatTime(video.currentTime);
        updatePlayPauseButtons(); // Update buttons on time update
    });

    playButton.addEventListener('click', () => {
        video.play();
        updatePlayPauseButtons();
    });

    pauseButton.addEventListener('click', () => {
        video.pause();
        updatePlayPauseButtons();
    });

    progress.addEventListener('input', () => {
        video.currentTime = (progress.value / 100) * video.duration;
    });

    volumeControl.addEventListener('input', () => {
        video.volume = volumeControl.value / 100;
        muteButton.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });

    muteButton.addEventListener('click', () => {
        video.muted = !video.muted;
        muteButton.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });

    fullscreenButton.addEventListener('click', () => {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });

    mirrorButton.addEventListener('click', () => {
        video.style.transform = video.style.transform === 'scaleX(-1)' ? 'scaleX(1)' : 'scaleX(-1)';
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            video.pause(); // Pause the video when the tab is not active
        }
    });

    // Initial call to set button visibility
    updatePlayPauseButtons();
});




