const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist')
const quran = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Quran
const Surahs = [
    {
        name: 'muminun',
        displayName: 'خواتيم سورة المؤمنون',
        artist: 'اسلام صبحي'
    },
    {
        name: 'moon',
        displayName: 'سورة القمر ',
        artist: 'رعد الكردي'
    },
    {
        name: 'yunus',
        displayName: 'سورة يونس',
        artist: 'رعد الكردي'
    },
    {
        name: 'ghafir',
        displayName: 'ما تيسر من سورة غافر',
        artist: 'محمد المنشاوي'
    }
]

// Check if Playing
let isPlaying = false;

// Play
function playSurah() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    quran.play();
}

// Pause
function pauseSurah() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    quran.pause();
}

// Play or Pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSurah() : playSurah()));

// Update DOM 
function loadSurah (surah) {
    title.textContent = surah.displayName;
    artist.textContent = surah.artist;
    quran.src = `quran/${surah.name}.mp3`;
    image.src = `img/${surah.name}.jpg`;
}

// Current Surah
let surahIndex = 0;

// Previous Surah
function prevSurah() {
    surahIndex--;
    if (surahIndex < 0)
        surahIndex = Surahs.length - 1
    loadSurah(Surahs[surahIndex]);
    playSurah();
}
// Next Surah
function nextSurah() {
    surahIndex++;
    if (surahIndex > Surahs.length - 1)
        surahIndex = 0;
    loadSurah(Surahs[surahIndex]);
    playSurah();
}

// Update Progress Bar & Time
function updateProgressBar(e) {
    const { duration , currentTime} = e.srcElement;
    // Update progress bar width
    const progressPrecent = (currentTime/duration) * 100;
    progress.style.width = `${progressPrecent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10) 
        durationSeconds = `0${durationSeconds}`;
    // Delay Switching the duration elment to avoid Nan
    if(durationSeconds)
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10) 
        currentSeconds = `0${currentSeconds}`;
     currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

}

//  Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = quran;
    quran.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSurah);
nextBtn.addEventListener('click', nextSurah);
quran.addEventListener('ended', nextSurah);
quran.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar)