console.log("Welcome to Spotify");

let audioElement = new Audio('1.mp3');
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Audio-1", filepath: "1.mp3", coverpath: "1.jpg"},
    {songName: "Audio-2", filepath: "2.mp3", coverpath: "2.jpg"},
    {songName: "Audio-3", filepath: "3.mp3", coverpath: "3.jpg"},
    {songName: "Audio-4", filepath: "4.mp3", coverpath: "4.jpg"},
    {songName: "Audio-5", filepath: "5.mp3", coverpath: "5.jpg"},
    {songName: "Audio-6", filepath: "6.mp3", coverpath: "6.jpg"},
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //update seekBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        index = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `${index + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

