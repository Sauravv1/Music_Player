// Get references to the HTML elements
const audioElement = document.getElementById('audio');
const musicNameElement = document.querySelector('.music-name');
const artistNameElement = document.querySelector('.artist-name');
const diskElement = document.querySelector('.disk');
const songSliderElement = document.querySelector('.seek-bar');
const currentTimeElement = document.querySelector('.current-time');
const songDurationElement = document.querySelector('.song-duration');
const playPauseButton = document.querySelector('.play-btn');
const forwardButton = document.querySelector('.forward-btn');
const backwardButton = document.querySelector('.backward-btn');

// Initialize variables
let currentSongIndex = 0;
let isPlaying = false;

// Function to load a song
function loadSong(songIndex) {
  const song = songs[songIndex];
  musicNameElement.textContent = song.name;
  artistNameElement.textContent = song.artist;
  audioElement.src = song.path;
  diskElement.style.backgroundImage = `url('${song.cover}')`;
}

// Function to play the loaded song
function playSong() {
  isPlaying = true;
  audioElement.play();
  diskElement.classList.add('play');
  playPauseButton.classList.remove('pause');
  playPauseButton.classList.add('play');
}

// Function to pause the currently playing song
function pauseSong() {
  isPlaying = false;
  audioElement.pause();
  diskElement.classList.remove('play');
  playPauseButton.classList.remove('play');
  playPauseButton.classList.add('pause');
}

// Function to update the song progress on the slider and time display
function updateSongProgress() {
  const currentTime = audioElement.currentTime;
  const duration = audioElement.duration;
  const progressPercent = (currentTime / duration) * 100;
  songSliderElement.value = progressPercent;
  currentTimeElement.textContent = formatTime(currentTime);
  songDurationElement.textContent = formatTime(duration);
}

// Function to format time in MM:SS format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Function to load and play the next song
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

// Function to load and play the previous song
function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

// Event listeners
playPauseButton.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

forwardButton.addEventListener('click', () => {
  playNextSong();
});

backwardButton.addEventListener('click', () => {
  playPreviousSong();
});

audioElement.addEventListener('timeupdate', updateSongProgress);

songSliderElement.addEventListener('input', () => {
  const seekTime = (audioElement.duration / 100) * songSliderElement.value;
  audioElement.currentTime = seekTime;
});

// Load the first song on page load
loadSong(currentSongIndex);
