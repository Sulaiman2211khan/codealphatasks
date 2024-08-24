const music = new Audio()
// music.play()

const songs = [
    {
        id: "1",
        songname: `Aayi Nai </br> <div class="author">Sachin Jigar</div> `,
        poster: `images/1.jpg`,
        description: "Aayi Nai is a popular track by Sachin Jigar. Enjoy the rhythm and beats!"
    },
    {
        id: "2",
        songname: `Main Yaad Aaunga</br> <div class="author">Stebin Bin</div> `,
        poster: `images/2.jpg`,
        description: "Main Yaad Aaunga is a soulful melody by Stebin Bin."
    },
    {
        id: "3",
        songname: `Hauli Hauli</br> 
        <div class="author">Guru Randhawa</div> `,
        poster: `images/3.jpg`,
        description: "Main Yaad Aaunga is a soulful melody by Stebin Bin."
    },
    {
        id: "4",
        songname: `Satyanaas</br> 
        <div class="author">Arijit Singh</div> `,
        poster: "images/4.jpg",
        description: "Main Yaad Aaunga is a soulful melody by Stebin Bin."
    },
    {
        id: "5",
        songname: `Dil Mera</br> 
        <div class="author">Guru Randhawa</div> `,
        poster: `images/5.jpg`,
        description: "Main Yaad Aaunga is a soulful melody by Stebin Bin."
    },
    {
        id: "6",
        songname: `High Rated Gabru</br> 
        <div class="author">Guru Randhawa</div> `,
        poster: `images/6.jpg`,
        description: "Main Yaad Aaunga is a soulful melody by Stebin Bin."
    },
    {
        id: "7",
        songname: `Haste Haste</br> 
        <div class="author">Sachet Tandon</div> `,
        poster: `images/7.jpg`,
        description: "Main Yaad Aaunga is a soulful melody by Stebin Bin."
    },

]
Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    if (songs[i]) {
        // console.log(songs.length)
        element.getElementsByTagName('img')[0].src = songs[i].poster;
        element.getElementsByTagName('h5')[0].innerHTML = songs[i].songname;
    }
});

let masterplay = document.getElementById('masterplay')
let wave = document.getElementsByClassName('wave')[0]

masterplay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play().catch(error => console.error('Playback failed:', error));
        masterplay.classList.remove('bi-play-fill')
        masterplay.classList.add('bi-pause-fill')
        wave.classList.add('active2')
    } else {
        music.pause()
        masterplay.classList.add('bi-play-fill')
        masterplay.classList.remove('bi-pause-fill')
        wave.classList.remove('active2')
    }
})


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
        element.classList.add('bi-play-circle-fill')
        element.classList.remove('bi-pause-circle-fill')
    })
}

const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
        element.style.background = "rgb(105,105,170,0)"

    })
}

let index = 0
let poster_master_play = document.getElementById('poster_master_play')
let title = document.getElementById('title')

// Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
//     element.addEventListener('click', e => {
//         let index = e.target.id;

//         makeAllPlays();
//         e.target.classList.remove('bi-play-circle-fill');
//         e.target.classList.add('bi-pause-circle-fill');

//         music.src = `songs/${index}.mp3`;
//         poster_master_play.src = `images/${index}.jpg`;
//         music.play().catch(error => console.error('Playback failed:', error));

//         let song_title = songs.find(ele => ele.id === index);
//         if (song_title) {
//             title.innerHTML = song_title.songname;
//         } else {
//             console.error('Song not found for index:', index);
//         }

//         masterplay.classList.remove('bi-play-fill')
//         masterplay.classList.add('bi-pause-fill')
//         wave.classList.add('active2')

//         music.addEventListener('ended', () => {
//             masterplay.classList.add('bi-play-fill')
//             masterplay.classList.remove('bi-pause-fill')
//             wave.classList.remove('active2')
//         })
//         makeAllBackgrounds()
//         Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105,105,170,.1)"
//     });
// });

let currentstart = document.getElementById('currentstart')
let currentend = document.getElementById('currentend')
let seek = document.getElementById('seek')
let bar2 = document.getElementById('bar2')
let dot = document.getElementsByClassName('dot')[0]

// Helper function to format time in min:sec format
function formatTime(timeInSeconds) {
    let min = Math.floor(timeInSeconds / 60);
    let sec = Math.floor(timeInSeconds % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

// Event listener for updating time
music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    // Update current time display
    currentstart.innerText = formatTime(music_curr);

    // Update total duration display
    currentend.innerText = formatTime(music_dur);

    let progressbar = parseInt((music.currentTime / music.duration) * 100)
    seek.value = progressbar
    let seekbar = seek.value
    bar2.style.width = `${seekbar}%`
    dot.style.left = `${seekbar}%`
});

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100
})

let vol_icon = document.getElementById('vol_icon')
let vol = document.getElementById('vol')
let vol_dot = document.getElementById('vol_dot')
let vol_bar = document.getElementsByClassName('vol_bar')[0]

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.add('bi-volume-mute-fill')
        vol_icon.classList.remove('bi-volume-up-fill')
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill')
        vol_icon.classList.remove('bi-volume-mute-fill')
        vol_icon.classList.remove('bi-volume-up-fill')
    }

    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.remove('bi-volume-mute-fill')
        vol_icon.classList.add('bi-volume-up-fill')
    }
    let vol_a = vol.value
    vol_bar.style.width = `${vol_a}%`
    vol_dot.style.left = `${vol_a}%`
    music.volume = vol_a / 100
})

let back = document.getElementById('back'); // Ensure this is the correct ID for the back button
let next = document.getElementById('next'); // Ensure this is the correct ID for the next button

// Initialize index variable
index = 1; // Assuming you start from song 1

// Fixing the back button functionality
back.addEventListener('click', () => {
    index -= 1; // Decrement index
    if (index < 1) { // Check bounds
        index = songs.length; // Wrap around to the last song
    }
    loadAndPlaySong(index); // Load and play the previous song
});

// Fixing the next button functionality
next.addEventListener('click', () => {
    index += 1; // Increment index
    if (index > songs.length) { // Check bounds
        index = 1; // Wrap around to the first song
    }
    loadAndPlaySong(index); // Load and play the next song
});



let currentPlayingSongId = null;

// Function to handle loading and playing a song
function loadAndPlaySong(index) {
    // console.log('Clicked index:', index);

    // Ensure the index is within the valid range
    if (index < 1 || index > songs.length) {
        console.error('Index out of range:', index);
        return;
    }

    music.src = `songs/${index}.mp3`;
    poster_master_play.src = `images/${index}.jpg`;

    music.play()

    let song_title = songs.find(ele => ele.id === index.toString()); // Find song by ID
    if (song_title) {
        title.innerHTML = song_title.songname;
        currentPlayingSongId = song_title.id; // Set the current playing song ID
    } else {
        console.error('Song not found for index:', index);
    }

    // Update icon state
    masterplay.classList.remove('bi-play-fill');
    masterplay.classList.add('bi-pause-fill');
    wave.classList.add('active2');

    makeAllPlays();
    document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[index - 1].style.background = "rgb(105,105,170,.1)";
}




function extractSongDetails(song) {
    // Create a temporary DOM element to parse HTML
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = song.songname;

    // Extract song title and artist
    let songTitle = tempDiv.firstChild.textContent.trim();
    let songArtist = tempDiv.querySelector('.author') ? tempDiv.querySelector('.author').textContent.trim() : 'Unknown Artist';

    return { title: songTitle, artist: songArtist };
}

// Function to update song details in the UI
function updateSongDetails(song) {
    const { title, artist } = extractSongDetails(song);

    const songDescription = song.description || "Description not available.";

    // Update the UI with the extracted details
    document.getElementById('song-title').innerHTML = `${title} - ${artist}`;
    document.getElementById('song-description').innerHTML = songDescription;
}

// Event handler for clicking on a song item
document.querySelectorAll('.songItem').forEach((item, idx) => {
    item.addEventListener('click', () => {
        masterplay.classList.remove('bi-play-fill');
        masterplay.classList.add('bi-pause-fill');
        wave.classList.add('active2');

        // Get the song details
        let song = songs[idx];

        // Update the UI with the song details
        updateSongDetails(song);

        index = idx + 1; // Set index based on clicked song item (assuming index starts from 1)
        loadAndPlaySong(index); // Load and play the selected song
    });
});



// Handle search functionality
document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Filter songs based on the search query
    const filteredSongs = songs.filter(song => {
        const title = song.songname.split('<br>').shift().toLowerCase();
        const artist = song.songname.split('<br>').pop().toLowerCase();
        return title.includes(query) || artist.includes(query);
    });

    // Display filtered songs
    filteredSongs.forEach(song => {
        const songItem = document.createElement('div');
        songItem.className = 'searchResultItem';
        songItem.innerHTML = `
      <img src="${song.poster}" alt="${song.songname}" class="searchResultImage"/>
            <div class="searchResultText">
                <p class="searchResultTitle">${song.songname.split('<br>').pop()}</p>
            </div>
        `; songItem.addEventListener('click', () => {
            loadAndPlaySong(song.id);
            updateSongDetails(song);
            resultsContainer.innerHTML = ''; // Clear results after selection
        });
        resultsContainer.appendChild(songItem);
    });

    // If no results, show a message
    if (filteredSongs.length === 0) {
        resultsContainer.innerHTML = '<p>No songs found</p>';
    }
});



let left_scroll = document.getElementById('left_scroll')
let right_scroll = document.getElementById('right_scroll')
let pop_song = document.getElementsByClassName('pop_song')[0]

if (pop_song) {
    left_scroll.addEventListener('click', () => {
        pop_song.scrollLeft -= 330
    })
    right_scroll.addEventListener('click', () => {
        pop_song.scrollLeft += 330
    })

}
else {
    console.error('Element with class "pop_song" not found.');
}




document.addEventListener('DOMContentLoaded', function () {
    const discoverItem = document.getElementById('discover');
    const myLibraryItem = document.getElementById('my-library');

    discoverItem.classList.add('active');
    // Handle navigation to Discover (Popular Songs)
    discoverItem.addEventListener('click', () => {
        document.getElementById('discover-content').style.display = 'block';
        document.getElementById('library-content').style.display = 'none';
        document.querySelector('.popular_song').style.display = 'block'; // Show popular songs
        discoverItem.classList.add('active');
        myLibraryItem.classList.remove('active');
        updateColors(); // Update colors
    });

    // Handle navigation to My Library (Favorite Songs)
    myLibraryItem.addEventListener('click', () => {
        document.getElementById('discover-content').style.display = 'none';
        document.getElementById('library-content').style.display = 'block';
        document.querySelector('.popular_song').style.display = 'none'; // Hide popular songs
        myLibraryItem.classList.add('active');
        discoverItem.classList.remove('active');
        updateColors(); // Update colors
    });

    // Function to update colors for active and inactive items
    function updateColors() {
        const items = [discoverItem, myLibraryItem];
        items.forEach(item => {
            if (item.classList.contains('active')) {
                item.style.color = 'white';
            } else {
                item.style.color = '#4c5262';
            }
        });
    }
});


// Array to hold favorite songs
let favoriteSongs = [];

// Function to add a song to favorites
function addToFavorites(songId) {
    let song = songs.find(song => song.id === songId);
    if (song && !favoriteSongs.some(fav => fav.id === songId)) { // Prevent duplicates
        favoriteSongs.push(song);
        updateFavoritesUI();
    } else {
        console.warn(`Song with ID ${songId} is already in favorites or not found.`);
    }
}

console.log(favoriteSongs)
// Function to update the favorites UI

// Function to update the favorites UI
function updateFavoritesUI() {
    let favoriteSongsList = document.getElementById('favorite-songs-list');
    favoriteSongsList.innerHTML = ''; // Clear existing list

    // Create the wrapper div for favorite songs
    let favoriteSongsWrapper = document.createElement('div');
    favoriteSongsWrapper.className = 'popular_song'; // Use the same class as popular songs

    // Create the container for the list of favorite songs
    let songsContainer = document.createElement('div');
    songsContainer.className = 'pop_song'; // Use the same class as popular songs
    favoriteSongsWrapper.appendChild(songsContainer);

    favoriteSongs.forEach(song => {
        const { title, artist } = extractSongDetails(song);
        let songItem = document.createElement('li');
        songItem.className = 'songItem'; // Ensure this is 'songItem' for styling
        songItem.innerHTML = `
            <div class="img_play">
                <img src="${song.poster}" alt="${title}">
                <i class="bi playListPlay bi-play-circle-fill" id="${song.id}"></i>
            </div>
            <h5>${title}<br>
                <div class="author">${artist}</div>
            </h5>
        `;

        // Add click event to play the song when clicked
        songItem.addEventListener('click', () => {
            loadAndPlaySong(song.id); // Load and play the clicked song
            updateSongDetails(song);  // Update song details in the UI
        });

        // Append the song item to the songs container
        songsContainer.appendChild(songItem);
    });

    // Append the entire favorite songs wrapper to the list
    favoriteSongsList.appendChild(favoriteSongsWrapper);
}

// Function to add the currently playing song to favorites
function addCurrentSongToFavorites() {
    if (currentPlayingSongId) {
        addToFavorites(currentPlayingSongId);
    } else {
        console.warn('No song is currently playing.');
    }
}

// Event listener for "ADD" button
document.querySelectorAll('.buttons button:nth-child(2)').forEach(button => {
    button.addEventListener('click', addCurrentSongToFavorites);
});

