const songName = document.getElementById("song-name")
const singerName = document.getElementById("singer-name")
const images = document.querySelector(".img")
const progressBar = document.getElementById("progress")
const currentTime = document.querySelector(".start-time")
const songDuration = document.querySelector(".end-time")
const prevBtn = document.querySelector("#backward")
const playBtn = document.querySelector(".fa-play")
const nextBtn = document.querySelector("#forward")
const music = document.getElementById("audio")

let currentMusic = 0

function setMusic(i){
  progressBar.value = 0
  let song = songQueue[i]
  currentMusic = i
  music.src = song.src
  songName.innerText = song.title
  singerName.innerText = song.singer
  images.src = song.image
  currentTime.innerText = "00:00"
  // setTimeout(() => {
  //   progressBar.max = music.duration
  //   songDuration.innerText = formatTime(music.duration)
  // }, 300);
  music.addEventListener("loadedmetadata",()=>{
    progressBar.max = music.duration
    songDuration.innerText = formatTime(music.duration)
  })
}
setMusic(0)


//change the time format
function formatTime(time){
  let min = Math.floor(time/60)
  if(min < 10){
    min = `0${min}`
  }
  let sec = Math.floor(time%60)
  if(sec < 10){
    sec = `0${sec}`
  }
  return `${min}:${sec}`
}

//play pause button
playBtn.addEventListener("click",()=>{
  if(music.paused){
    playBtn.classList.remove("fa-play")
    playBtn.classList.add("fa-pause")
    music.play()

    //update the initial time
    setInterval(() => { 
      progressBar.value = music.currentTime;
      currentTime.innerText = formatTime(music.currentTime)
      if(currentTime.innerText == songDuration.innerText){
        nextBtn.click()    //automatically play the next song
      }
    }, 1000);
  }else{
    playBtn.classList.remove("fa-pause")
    playBtn.classList.add("fa-play")
    music.pause()
  }
})


//previous button
prevBtn.addEventListener("click",()=>{
  if(currentMusic == 0){
    currentMusic = songQueue.length -1
  }else{
    currentMusic--
  }
  setMusic(currentMusic)
  playBtn.click()
})

//forward button
nextBtn.addEventListener("click",()=>{
  if(currentMusic == songQueue.length -1){
    currentMusic = 0
  }else{
    currentMusic++
  }
  setMusic(currentMusic)
  playBtn.click()
})

//progress bar change on drag
progressBar.addEventListener("change",()=>{
  music.currentTime = progressBar.value
})
     
