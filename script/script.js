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


/*messages*/

document.addEventListener("DOMContentLoaded", function() {
    window.openChat = function(evt, chat) { // Bind to the window object
        var i, chat_tab, chat_content;

        chat_content = document.getElementById('chat-content');
        // console.log(chat_content); // Check if this is null

        // if (!chat_content) {
        //     console.error('Chat content element not found!');
        //     return; // Exit the function if the element is not found
        // }

        chat_content.style.display = "flex";

        chat_tab = document.getElementsByClassName('chat-messages-info');
        for (i = 0; i < chat_tab.length; i++) {
            chat_tab[i].className = chat_tab[i].className.replace(" active", "");
        }

        evt.currentTarget.className += " active";

        document.getElementById(chat).style.display = "flex";
    };
});



/*carousel*/
const tabsBox = document.querySelector(".mentor-carousel-slider-content"),
      allTabs = tabsBox.querySelectorAll(".carousel-slides"),
      arrowIcons = document.querySelectorAll(".arrow");

let isDragging = false;

// Function to handle arrow visibility
const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "flex" : "flex"; // Hide left arrow if at start
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "flex" : "flex"; // Hide right arrow if at end
}

// Arrow click event listeners
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        // Scroll left or right based on which arrow is clicked
        let scrollWidth = tabsBox.scrollLeft += icon.id === "carousel-arrow-left" ? -410 : 410;
        handleIcons(scrollWidth);
    });
});

// Function to set the width of each carousel slide
const setCarouselSlideWidth = (width) => {
    allTabs.forEach(tab => {
        tab.style.setProperty('width', width, 'important'); // Set the desired width with !important
    });
};

// Set the width of the carousel slides on page load
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        setCarouselSlideWidth('400px'); // Change to your desired width
    }, 100);
});

// Dragging functionality
const dragging = (e) => {
    if (!isDragging) return;
    tabsBox.classList.add("dragging");
    tabsBox.scrollLeft -= e.movementX; // Move the scroll based on mouse movement
    handleIcons(tabsBox.scrollLeft); // Update arrow visibility
}

const dragStop = () => {
    isDragging = false; // Stop dragging
    tabsBox.classList.remove("dragging");
}

// Mouse event listeners for dragging
tabsBox.addEventListener("mousedown", () => isDragging = true);
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
