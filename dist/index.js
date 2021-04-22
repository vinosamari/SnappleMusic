// GET ALL DOM/HTML ELEMENTS IN VARIABLES
const albumArt = document.querySelector("#album-art");
const songTitle = document.querySelector("#song-title");
const artistName = document.querySelector("#artist-name");
const progressBar = document.querySelector("#progress-bar");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audioMP3 = document.querySelector("#audio");
const cover = document.querySelector("#cover-art");
const baseURL = "http://localhost:1337";
const songs = `${baseURL}/songs`;
let songsArray = [];
let currentSongIndex = 3;

//
//  FUNCTION DEFINITIONS
// POPULATE SONGS ARRAY ON PAGE LOAD
const loadSongs = () => {
	axios
		.get(songs)
		.then((response) => {
			songsArray = response.data;
		})
		.catch((error) => console.error(error));
};

const playSong = () => {
	const isPlaying = albumArt.classList.contains("play");
	let audioMP3Url = songsArray[currentSongIndex].audio.url;
	let audioMP3Title = songsArray[currentSongIndex].title;
	let audioMP3ArtistsNames = songsArray[currentSongIndex].artists;
	let artistNames = [];
	audioMP3ArtistsNames.forEach((artist) => {
		artistNames.push(`${artist.name}`);
	});
	let formattedArtists =
		artistNames.length === 1
			? `${artistNames[0]}`
			: `${artistNames[0]} ft. ${artistNames.splice(
					1,
					artistNames.length - 1
			  )}`;
	audioMP3.src = `${baseURL}${audioMP3Url}`;

	if (isPlaying) {
		albumArt.classList.remove("play");
		albumArt.classList.add("pause");
		playBtn.classList.remove("fa-pause");
		playBtn.classList.add("fa-play");
		audioMP3.pause();
	} else {
		albumArt.classList.remove("pause");
		songTitle.innerHTML = audioMP3Title;
		artistName.innerHTML = formattedArtists;
		cover.src = `${baseURL}${songsArray[currentSongIndex].album_art.formats.small.url}`;
		albumArt.classList.add("play");
		playBtn.classList.remove("fa-play");
		playBtn.classList.add("fa-pause");
		audioMP3.play();
	}
};
//
//  FUNCTION CALLS
loadSongs();

//
//  FUNCTION DEFINITIONS
playBtn.addEventListener("click", playSong);

prevBtn.addEventListener("click", () => {
	currentSongIndex--;
	if (currentSongIndex < 0) {
		currentSongIndex = songsArray.length - 1;
		playSong();
		// console.log(currentSongIndex);
	} else {
		console.log(currentSongIndex);
	}
});
