


let allMusic=[{
    name:"Dull",
    artist:"Asake",
    img:"listImage/asake.jpg",
    song:"list/Asake_Dull.mp3",
    detail:"one"

},{
    name:"It's Plenty",
    artist:"Burna Boy",
    img:"listImage/burna.jpg",
    song:"list/Burna Boy_It's Plenty.mp3"
    ,
    detail:"two"
},{
    name:"For My Hand",
    artist:"Burna Boy ft Ed Sheeran",
    img:"listImage/burnaedsh.jpg",
    song:"list/Burna  Boy_Ft_Ed_Sheeran_For_My_Hand.mp3"
    ,
    detail:"three"
},{
    name:"Spiritual Gbedu",
    artist:"Joeboy",
    img:"listImage/joeboy.jpg",
    song:"list/Joeboy_Spiritual_Gbedu.mp3"
    ,
    detail:"four"
},{
    name:"Champagne",
    artist:"KiDi",
    img:"listImage/KIDI.jpg",
    song:"list/KiDi_Champagne.mp3"
    ,
    detail:"five"
},{
    name:"Run My way",
    artist:"Melvitto ft WANI",
    img:"listImage/wani.jpg",
    song:"list/Melvitto_Ft_WANI_Run_My_Way.mp3"
    ,
    detail:"six"
},{
    name:"Bend You",
    artist:"Omah Lay",
    img:"listImage/omahlay.jpg",
    song:"list/Omah_Lay_Bend_You.mp3"
    ,
    detail:"seven"
},{
    name:"Call of Duty",
    artist:"Zinoleesky",
    img:"listImage/Zinoleesky.jpg",
    song:"list/Zinoleesky_Call_Of_Duty.mp3"
    ,
    detail:"eight"
}]

let container=document.querySelector(".container")
let musicImage=document.querySelector(".image-container img")
let musicName=document.querySelector(".songs-details .name")
let musicArtist=document.querySelector(".songs-details .artist")
let mainAudio=document.querySelector(".main-audio")
let playPauseBtn=document.querySelector(".play-pause")

let nextBtn=document.querySelector("#nextlist")
let prevBtn=document.querySelector("#prevlist")
let progressBar=document.querySelector(".progress-bar")
let progressArea=document.querySelector(".progress-container")
let showMoreMusicBtn=document.querySelector("#more-music")
let hideMusicBtn=document.querySelector("#close")
let musicList=document.querySelector(".music-list")

let listSection=document.querySelector(".list-section")




window.addEventListener("DOMContentLoaded",DisplayMusic())

showMoreMusicBtn.addEventListener("click",()=>{
musicList.classList.toggle("show")
})

hideMusicBtn.addEventListener("click",()=>{
    showMoreMusicBtn.click()
   

    // or  musicList.classList.remove("show")// to reclick and remove since we are using toggle
    })
    

let currentMusic=Math.floor((Math.random()*allMusic.length)) 

window.addEventListener("load",loadMusic(currentMusic))




//Functions

function  loadMusic(songNumber){
    musicName.textContent=allMusic[songNumber].name;
    musicArtist.textContent=allMusic[songNumber].artist;
musicImage.src=allMusic[songNumber].img
mainAudio.src=allMusic[songNumber].song
playingNow()
}


function playMusic(){
    container.classList.add("paused")
    playPauseBtn.querySelector("i").innerText="pause"
    mainAudio.play()
}

function pauseMusic(){
    container.classList.remove("paused")
    playPauseBtn.querySelector("i").innerText="play_arrow"
    mainAudio.pause()

}

function NextMusic(){
    currentMusic++
   if(currentMusic>allMusic.length-1){currentMusic=0}
   loadMusic(currentMusic)
   playMusic()
   playingNow()
   }

   function PreviousMusic(){
    currentMusic--
   if(currentMusic<0){currentMusic=allMusic.length-1}
   loadMusic(currentMusic)
   playMusic()
   playingNow()
   }
// Eventlisteners

playPauseBtn.addEventListener("click",()=>{
const ispaused=container.classList.contains("paused")
ispaused ? pauseMusic():playMusic()
playingNow()
})

nextBtn.addEventListener("click",NextMusic)
prevBtn.addEventListener("click",PreviousMusic)

mainAudio.addEventListener("timeupdate",(e)=>{
    console.log(e)
    const currentTime=e.target.currentTime
    const duration=e.target.duration;
    let progressWidth=(currentTime/duration)*100
    progressBar.style.width=`${progressWidth}%`
   
    let maincurrentTime=container.querySelector(".currentTime")
    let currentMin=Math.floor(currentTime/60)
    let currentSec=Math.floor(currentTime%60)
    if(currentSec<10){currentSec=`0${currentSec}`}
    maincurrentTime.innerText=`${currentMin}:${currentSec}`
    mainAudio.addEventListener("loadeddata",()=>{ 
let mainduration=document.querySelector(".duration")
 let audioDuration=mainAudio.duration

let totalMin=Math.floor(audioDuration/60)
let totalSec=Math.floor(audioDuration%60)
if(totalSec<10){totalSec=`0${totalSec}`}

 mainduration.innerText=`${totalMin}:${totalSec}`

   })
   
})


   //moving the current time to where the progressbar is clicked

   progressArea.addEventListener("click",(e)=>{
let progresswidthval=progressArea.clientWidth
let clickedoffSetX=e.offsetX
let songDuration=mainAudio.duration
mainAudio.currentTime=(clickedoffSetX/progresswidthval)*songDuration
playMusic()
   })

   let repeatBtn=document.querySelector("#repeat-plist")
   repeatBtn.addEventListener("click",()=>{

    let getText=repeatBtn.innerText

    switch (getText) {
        case "repeat": 
        repeatBtn.innerText="repeat_one";
     repeatBtn.setAttribute("title","song looped")
            break;
           case "repeat_one":
            repeatBtn.innerText="shuffle";
            repeatBtn.setAttribute("title","playback shuffle")
      break;
      case "shuffle":
        repeatBtn.innerText="repeat";
        repeatBtn.setAttribute("title","playlist looped")
  break;
    }
   })

   mainAudio.addEventListener("ended",()=>{
    let getText=repeatBtn.innerText

    switch (getText) {
        case "repeat": 
       NextMusic()
            break;


           case "repeat_one":
        mainAudio.currentTime=0
        loadMusic(currentMusic)
        playMusic()
    
      break;
      case "shuffle":
       let randMusic=Math.floor((Math.random()*allMusic.length)) 
       do{ randMusic=Math.floor((Math.random()*allMusic.length)) }
       while( currentMusic==randMusic)
       currentMusic=randMusic
       loadMusic(randMusic)
       playMusic()
       playingNow()
  break;
    }

   })






   function DisplayMusic(){



   let allmusicList=allMusic.map((music,index)=>{

    //adding the attribute of music in add li tag to know which song is clicked later
    return `<li li-index=${index}> 
    <div class="row"><span>${music.name}</span>
    <p>${music.artist}</p></div>
    <audio src="${music.song}" class="${music.detail}"></audio>
    <span id="${music.detail}" class="audio-duration">1</span>
</li>`}).join("")

listSection.innerHTML=allmusicList


allMusic.forEach((music)=>{


    let LiAudioTagDuration=document.querySelector(`#${music.detail}`)
    let LiAudioTagAudio=listSection.querySelector(`.${music.detail}`)
        
    
    LiAudioTagAudio.addEventListener("loadeddata",()=>{ 
       
        let AudioDuration=LiAudioTagAudio.duration
        let totalMin=Math.floor(AudioDuration/60)
        let totalSec=Math.floor(AudioDuration%60)
       if(totalSec<10){totalSec=`0${totalSec}`}
    // `${totalMin}:${totalSec}`
    LiAudioTagDuration.innerText=`${totalMin}:${totalSec}`
    //console.log(`${totalMin}:${totalSec}`)
     // setting atribute to mahe time accessible
    LiAudioTagDuration.setAttribute("t-duration",`${totalMin}:${totalSec}`)       })

})
    
    }
 

    //playing song on clicking particulasr song
function playingNow(){
  
    const allLiList=document.querySelectorAll("li")
    allLiList.forEach((list)=>{
        let audioTag=list.querySelector(".audio-duration")
if(list.classList.contains("playing"))
{list.classList.remove("playing")
//getting the set atribute of time back and assigning it
let tDuration=audioTag.getAttribute("t-duration")
audioTag.innerText=tDuration}

if(list.getAttribute("li-index")==currentMusic){
    list.classList.add("playing")
    audioTag.innerText="Playing"
}

list.setAttribute("onclick","clicked(this)")

    })}

  function clicked(element){
let getListindex=element.getAttribute("li-index")
currentMusic=getListindex
loadMusic(currentMusic)
playMusic()
playingNow()

  }
