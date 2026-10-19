var audio = document.getElementById("audio");
var song = document.getElementById("song");
var artist = document.getElementById("artist");
var play = document.getElementById("playButton");
var image = document.getElementById("playerImage");
var list = document.getElementById("playlist");
var bar = document.getElementById("progress");
var time = document.getElementById("currentTime");
var total = document.getElementById("duration");

var songs = [
    {
        name: "Slow Dancing in the Dark",
        artist: "Joji",
        file: "audio/song1.mp3",
        image: "img/joji slow dancing in the dark.jpg"
    },
    {
        name: "Wishes",
        artist: "Hassan Raheem",
        file: "audio/song2.mp3",
        image: "img/wishes.jpg"
    },
    {
        name: "Hum",
        artist: "Murtuza Qizilbash",
        file: "audio/song3.mp3",
        image: "img/hum.jpg"
    },
    {
        name: "Glimpse of Us",
        artist: "Joji",
        file: "audio/song4.mp3",
        image: "img/glimpse of us.jpg"
    },
    {
        name: "Taaron se",
        artist: "Arpit bala",
        file: "audio/song5.mp3",
        image: "img/taron se.jpg"
    },
    {
        name: "Bhool",
        artist: "Murtuza Qizilbash",
        file: "audio/song6.mp3",
        image: "img/bhool.jpg"
    }
];

var current = 0;

function load() {
    audio.src = songs[current].file;
    song.innerHTML = songs[current].name;
    artist.innerHTML = songs[current].artist;
    image.src = songs[current].image;
    bar.value = 0;
    time.innerHTML = "0:00";
    total.innerHTML = "0:00";
    showList();
}

function playSong(number) {
    current = number;
    load();

    audio.play().catch(function () {
        alert("Please add the audio files to the MeloWave folder first.");
    });

    document.getElementById("musicPlayer").scrollIntoView({
        behavior: "smooth"
    });
}

function pausePlay() {
    if (audio.paused) {
        audio.play().catch(function () {
            alert("Please add the audio files to the MeloWave folder first.");
        });
    } else {
        audio.pause();
    }
}

function next() {
    current++;

    if (current >= songs.length) {
        current = 0;
    }

    load();
    audio.play().catch(function () {});
}

function back() {
    current--;

    if (current < 0) {
        current = songs.length - 1;
    }

    load();
    audio.play().catch(function () {});
}

audio.onended = function () {
    next();
};

audio.onpause = function () {
    play.innerHTML = "▶";
};

audio.onplay = function () {
    play.innerHTML = "⏸";
};

audio.ontimeupdate = function () {
    if (audio.duration) {
        bar.value = (audio.currentTime / audio.duration) * 100;
        time.innerHTML = showTime(audio.currentTime);
    }
};

audio.onloadedmetadata = function () {
    total.innerHTML = showTime(audio.duration);
};

bar.oninput = function () {
    if (audio.duration) {
        audio.currentTime = (bar.value / 100) * audio.duration;
    }
};

function showTime(time) {
    if (isNaN(time)) {
        return "0:00";
    }

    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

function showList() {
    list.innerHTML = "";

    for (var i = 0; i < songs.length; i++) {
        var item = document.createElement("div");
        item.className = "playlist-item";

        if (i == current) {
            item.classList.add("active");
        }

        item.innerHTML =
            "<span>" + (i + 1) + ". " + songs[i].name + "</span>" +
            "<small>" + songs[i].artist + "</small>";

        item.onclick = function (number) {
            return function () {
                playSong(number);
            };
        }(i);

        list.appendChild(item);
    }
}

load();
var form = document.querySelector("form");
var message = document.getElementById("message");

form.addEventListener("submit", function(event) {

    if (message.value.trim() === "") {
        event.preventDefault();
        message.setCustomValidity("Message cannot contain only spaces");
        message.reportValidity();
    } else {
        message.setCustomValidity("");
    }

});
