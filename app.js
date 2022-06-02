const audio_continer = document.querySelector(".audio_continer"),
  audio_image = document.querySelector(".audio_tumb_img img"),
  audio_title = document.querySelector(".audio_title p"),
  progress_bar = document.querySelector(".progress_bar"),
  progress = document.querySelector(".progress"),
  current_time = document.querySelector("#current_time"),
  total_time = document.querySelector("#total_time"),
  repeat = document.querySelector("#repeat_icon"),
  previousAudioEl = document.querySelector("#previous_audio"),
  play_pausebtn = document.querySelector("#play_pause"),
  nextAudioEl = document.querySelector("#next_audio"),
  queue_music = document.querySelector("#queue_music"),
  play_list_container = document.querySelector(".play_list_container"),
  close_queue = document.querySelector("#close_icon"),
  audioEl = document.querySelector("audio"),
  songs_list = document.querySelector("#songs"),
  song = document.querySelector("#song"),
  song_title = document.querySelector(".song_title"),
  song_categories = document.querySelector(".categories");

let currentSong = 0;
const songsData = [
  {
    id: 0,
    title: "mustafa-المصطفى",
    img: "/src/assets/image/mustafa.jpg",
    audio: "/src/assets/audio/mustafa-المصطفى.mp3",
    author: "mishary bin rashid alafasy",
    category: "islamic",
  },
  {
    id: 1,
    title: "Arabic-Kuthu---Halamithi-Habibo",
    img: "/src/assets/image/arabickuthu.jpg",
    audio: "/src/assets/audio/Arabic-Kuthu---Halamithi-Habibo.mp3",
    author: "aniruth",
    category: "kutthu",
  },
  {
    id: 2,
    title: "Beast-Mode",
    img: "/src/assets/image/Beast-Mode.jpg",
    audio: "/src/assets/audio/Beast-Mode.mp3",
    author: "aniruth",
    category: "classic-kutthu",
  },
  {
    id: 3,
    title: "Bullet-Song",
    img: "/src/assets/image//bullet song.jpg",
    audio: "/src/assets/audio/Bullet-Song.mp3",
    author: "devi sri prasad",
    category: "kutthu",
  },
  {
    id: 4,
    title: "Jolly-O-Gymkhana",
    img: "/src/assets/image/jolly o gymkhana.jpg",
    audio: "/src/assets/audio/Jolly-O-Gymkhana.mp3",
    author: "aniruth",
    category: "classic",
  },
];

const changeAudio = (currentSong) => {
  const { title, img, audio } = songsData[currentSong];
  audio_title.textContent = title;
  audio_image.src = img;
  audioEl.src = audio;
  current_time.textContent = formatTime(audioEl.currentTime);
};
audioEl.addEventListener("loadeddata", () => {
  total_time.textContent = formatTime(audioEl.duration);
});
window.addEventListener("load", () => {
  const uniqueCategory = [
    "All",
    ...new Set(
      songsData.map((song) => {
        return song.category;
      })
    ),
  ];
  const categoryBtn = uniqueCategory
    .map((category) => {
      return `<li class="category"><button id="categoryBtn">${category}</button></li>`;
    })
    .join("");
  const songs = songsData
    .map(({ id, title }) => {
      return `<li class="song" data-id=${id}>
                  <p class="title">${
                    title.length > 20 ? title.substring(0, 20) + "..." : title
                  }</p>
              <img class="animate_audio" src="/src/assets/animate_audio.gif"/>
            </li>`;
    })
    .join("");
  song_categories.innerHTML = categoryBtn;
  songs_list.innerHTML = songs;

  changeAudio(currentSong);
  changeActiveSongList();
});

function changeActiveSongList() {
  const currentSong_list = document.querySelectorAll(".song");
  currentSong_list.forEach((item) => {
    item.classList.remove("active");
  });
  currentSong_list[currentSong].classList.add("active");
}

function pervious() {
  currentSong === 0 ? (currentSong = songsData.length - 1) : currentSong--;
  changeAudio(currentSong);
  audioEl.play();
  changeActiveSongList();
}

function next() {
  currentSong === songsData.length - 1 ? (currentSong = 0) : currentSong++;
  changeAudio(currentSong);
  audioEl.play();
  changeActiveSongList();
}

const formatNumber = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function formatTime(time) {
  const hours = Math.floor(time / 3600);
  const min = Math.floor(time / 60) % 60;
  const sec = Math.floor(time % 60);
  if (hours === 0) {
    return `${formatNumber.format(min)}:${formatNumber.format(sec)}`;
  }
  return `${formatNumber.format(hours)}:${formatNumber.format(
    min
  )}:${formatNumber.format(sec)}`;
}

const play_pause = () => {
  audioEl.paused ? audioEl.play() : audioEl.pause();
};

function changeWidth(e) {
  const progressWidth = progress_bar.clientWidth;
  const currentWidth = e.offsetX;
  audioEl.currentTime = (currentWidth / progressWidth) * audioEl.duration;
}

// event listeners
audioEl.addEventListener("timeupdate", () => {
  current_time.textContent = formatTime(audioEl.currentTime);
  progress.style.width = `${(audioEl.currentTime / audioEl.duration) * 100}%`;
  audioEl.ended && next();
});

queue_music.addEventListener("click", () =>
  play_list_container.classList.add("open")
);

close_queue.addEventListener("click", () =>
  play_list_container.classList.remove("open")
);

audioEl.addEventListener("play", () => {
  audio_continer.classList.add("paused");
});

audioEl.addEventListener("pause", () => {
  audio_continer.classList.remove("paused");
});
play_pausebtn.addEventListener("click", play_pause);

nextAudioEl.addEventListener("click", next);
previousAudioEl.addEventListener("click", pervious);

progress_bar.addEventListener("click", changeWidth);

songs_list.addEventListener("click", (e) => {
  const target = e.currentTarget.children;
  const clicked = e.target.closest(".song");
  if (!clicked) return;
  [...target].forEach((song) => {
    song.classList.remove("active");
  });
  clicked.classList.add("active");
  currentSong = Number.parseInt(clicked.dataset.id);
  changeAudio(currentSong);
  audioEl.play();
});

const categoryBtn = document.querySelectorAll("#categoryBtn");

song_categories.addEventListener("click", (e) => {
  const target = e.currentTarget.children;

  const clicked = e.target.closest(".category");
  if (!clicked) return;
  const [children] = clicked.children;

  [...target].forEach((category) => {
    const [btn] = category.children;
    btn.classList.remove("active__category");
  });
  children.classList.add("active__category");
});
