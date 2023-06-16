let progressbar = document.getElementById("progressorSong");
let playButton = document.getElementById("mainPlaybtn");
let gif = document.getElementById("gif");
let volumebtn = document.getElementById("volumControlbtn");
let audio = new Audio("sounds/1.mp3");
let songAtScreen = Array.from(document.getElementsByClassName("Songs"));
let playbtn = Array.from(document.getElementsByClassName("playing"));
let songindex = 0;
let playsong = document.getElementById('playedSong');

let songs =
    [
        { songName: "Kahani Suno 2.0 song.mp3", filePath: "sounds/1.mp3", coverImg: "img/coverimg/1.png" },
        { songName: "Kesariya song.mp3", filePath: "sounds/2.mp3", coverImg: "img/coverimg/2.jpg" },
        { songName: "Malang Sajna song.mp3", filePath: "sounds/3.mp3", coverImg: "img/coverimg/3.jpg" },
        { songName: "Raatan Lambiyan song.mp3", filePath: "sounds/4.mp3", coverImg: "img/coverimg/4.jpg" },
    ]

songAtScreen.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverImg;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})

playButton.addEventListener("click", function () {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        playsong.innerText = songs[songindex].songName;
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else {
        audio.pause();
        playButton.classList.remove("fa-circle-pause");
        playButton.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
});
audio.addEventListener("timeupdate", function () {
    let time = parseInt((audio.currentTime / audio.duration) * 100);
    progressbar.value = time;

})
progressbar.addEventListener('change', () => {
    audio.currentTime = (progressbar.value * audio.duration) / 100;
})
volumebtn.addEventListener("change", () => {
    audio.volume = volumebtn.value / 100;
})
const makeallplay = () => {
    playbtn.forEach(element => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    })
}

document.getElementById('next').addEventListener('click', () => {
        if (songindex >= 3) {
        songindex = 0
    }
    else {
        songindex += 1;
    }
    audio.src = `sounds/${songindex + 1}.mp3`;
    playsong.innerText = songs[songindex].songName;
    audio.currentTime = 0;
    audio.play();
    gif.style.opacity = 1;
    playButton.classList.remove('fa-play-circle');
    playButton.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = 3
    }
    else {
        songindex -= 1;
    }
    audio.src = `sounds/${songindex + 1}.mp3`;
    playsong.innerText = songs[songindex].songName;
    audio.currentTime = 0;
    audio.play();
    gif.style.opacity = 1;
    playButton.classList.remove('fa-play-circle');
    playButton.classList.add('fa-pause-circle');
})

playbtn.forEach(element => {
    element.addEventListener('click', (e) => {
        makeallplay();
        e.target.classList.remove("fa-circle-play");
        songindex = parseInt(e.target.id) - 1;
        e.target.classList.add("fa-circle-pause");
        audio.src = `sounds/${songindex+1}.mp3`;
        playsong.innerText = songs[songindex].songName;
        audio.currentTime = 0;
        audio.play();
        gif.style.opacity = 1;
        playButton.classList.remove("fa-circle-play");
        playButton.classList.add("fa-circle-pause");
    })
})