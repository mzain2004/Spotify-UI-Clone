console.log('Lets write JavaScript');

let currentSong = new Audio();
let songs;
let currFolder;
let currentSongIndex = -1; // Cache the current song index

// Cache frequently used DOM elements
const domCache = {
    songList: null,
    songInfo: null,
    songTime: null,
    circle: null,
    playButton: null,
    volumeImg: null,
    rangeInput: null,
    previousButton: null,
    nextButton: null
};

// Initialize DOM cache after page load
function initDOMCache() {
    domCache.songList = document.querySelector(".songList ul");
    domCache.songInfo = document.querySelector(".songinfo");
    domCache.songTime = document.querySelector(".songtime");
    domCache.circle = document.querySelector(".circle");
    domCache.playButton = document.getElementById("play");
    domCache.volumeImg = document.querySelector(".volume>img");
    domCache.rangeInput = document.querySelector(".range input");
    domCache.previousButton = document.getElementById("previous");
    domCache.nextButton = document.getElementById("next");
}

// Debounce function for high-frequency events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function getSongs(folder) {
    currFolder = folder;
    // Fetch the index.json or directory listing
    // Here, you fetch the folder directly and parse the HTML for mp3 links
    let a = await fetch(`/Spotify-Clone/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }

    // Show all the songs in the playlist - optimized to use DocumentFragment
    const songUL = domCache.songList;
    songUL.innerHTML = "";
    const fragment = document.createDocumentFragment();
    
    for (const song of songs) {
        const li = document.createElement("li");
        li.innerHTML = `<img class="invert" width="34" src="img/music.svg" alt="">
            <div class="info">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>Harry</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="img/play.svg" alt="">
            </div>`;
        
        // Attach click event directly to each li
        li.addEventListener("click", () => {
            playMusic(li.querySelector(".info").firstElementChild.innerHTML.trim());
        });
        
        fragment.appendChild(li);
    }
    
    songUL.appendChild(fragment);

    return songs;
}

const playMusic = (track, pause = false) => {
    currentSong.src = `/Spotify-Clone/${currFolder}/${track}`;
    
    // Update the cached song index
    currentSongIndex = songs.indexOf(track);
    
    domCache.songInfo.innerHTML = decodeURI(track);
    domCache.songTime.innerHTML = "00:00 / 00:00";

    // Remove previous listener to prevent memory leaks
    currentSong.onloadedmetadata = () => {
        domCache.songTime.innerHTML = `00:00 / ${secondsToMinutesSeconds(currentSong.duration)}`;
    };

    if (!pause) {
        currentSong.play();
        domCache.playButton.src = "img/pause.svg";
    }
};

async function displayAlbums() {
    console.log("displaying albums");
    let a = await fetch(`/Spotify-Clone/Songs/index.json`);
    let albums = await a.json();

    let cardContainer = document.querySelector(".cardContainer");
    cardContainer.innerHTML = "";
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();

    for (const album of albums) {
        let folder = album.folder;
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.folder = folder;
        card.innerHTML = `<div class="play">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <img src="/Spotify-Clone/Songs/${folder}/cover.jpg" alt="">
            <h2>${album.title}</h2>
            <p>${album.description}</p>`;
        
        // Attach click event directly to each card
        card.addEventListener("click", async () => {
            console.log("Fetching Songs");
            songs = await getSongs(`Songs/${card.dataset.folder}`);
            playMusic(songs[0]);
        });
        
        fragment.appendChild(card);
    }
    
    cardContainer.appendChild(fragment);
}

async function main() {
    // Initialize DOM cache
    initDOMCache();
    
    songs = await getSongs("Songs/ncs");
    if (songs.length > 0) {
        playMusic(songs[0], true);
    }

    await displayAlbums();

    domCache.playButton.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            domCache.playButton.src = "img/pause.svg";
        } else {
            currentSong.pause();
            domCache.playButton.src = "img/play.svg";
        }
    });

    // Debounce timeupdate for better performance
    const updateTimeDisplay = debounce(() => {
        domCache.songTime.innerHTML =
            `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        domCache.circle.style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    }, 100);

    currentSong.addEventListener("timeupdate", updateTimeDisplay);

    document.querySelector(".seekbar").addEventListener("click", e => {
        if (isNaN(currentSong.duration)) return;
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        domCache.circle.style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });

    // Navigate to previous/next songs using cached index
    domCache.previousButton.addEventListener("click", () => {
        currentSong.pause();
        if ((currentSongIndex - 1) >= 0) {
            playMusic(songs[currentSongIndex - 1]);
        }
    });

    domCache.nextButton.addEventListener("click", () => {
        currentSong.pause();
        if ((currentSongIndex + 1) < songs.length) {
            playMusic(songs[currentSongIndex + 1]);
        }
    });

    domCache.rangeInput.addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        if (currentSong.volume > 0) {
            domCache.volumeImg.src = domCache.volumeImg.src.replace("mute.svg", "volume.svg");
        }
    });

    domCache.volumeImg.addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            domCache.rangeInput.value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = 0.1;
            domCache.rangeInput.value = 10;
        }
    });
}

main();
