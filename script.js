// 1) BURAYI DÜZENLE: aylık slaytlar
const slides = [
  {
    month: "Mart 2025",
    img: "assets/photos/2025-03.jpg",
    desc: "Mart 2025'te ...\nBuraya kısa ama gerçek bir anı yaz."
  },
  {
    month: "Nisan 2025",
    img: "assets/photos/2025-04.jpg",
    desc: "Nisan 2025'te ...\nDetay ekle, ama roman yazma."
  },
  // İstediğin kadar ekle:
  // { month:"Mayıs 2025", img:"assets/photos/2025-05.jpg", desc:"..." },
];

const el = (id) => document.getElementById(id);

const hero = el("hero");
const story = el("story");

const bgm = el("bgm");
const playMusicBtn = el("playMusic");
const toggleMusicBtn = el("toggleMusic");

const nextFromHero = el("nextFromHero");
const prevBtn = el("prev");
const nextBtn = el("next");

const slideImg = el("slideImg");
const slideMonth = el("slideMonth");
const slideDesc = el("slideDesc");
const counter = el("counter");

let idx = 0;
let musicStarted = false;

function showScreen(which){
  if (which === "hero"){
    hero.classList.add("active");
    story.classList.remove("active");
  } else {
    hero.classList.remove("active");
    story.classList.add("active");
  }
}

function safeStartMusic(){
  if (musicStarted) return;
  musicStarted = true;
  bgm.volume = 0.35; // istersen 0.2-0.5 arası oyna
  bgm.play().catch(() => {
    // Tarayıcı yine engellerse, kullanıcı tekrar tıklayınca çalacak.
    musicStarted = false;
  });
}

function toggleMusic(){
  if (!musicStarted){
    safeStartMusic();
    return;
  }
  if (bgm.paused) bgm.play();
  else bgm.pause();
}

function render(){
  if (!slides.length){
    slideMonth.textContent = "Henüz slayt yok";
    slideDesc.textContent = "script.js içindeki slides dizisine en az 1 öğe eklemelisin.";
    slideImg.removeAttribute("src");
    counter.textContent = "0 / 0";
    return;
  }
  const s = slides[idx];
  slideMonth.textContent = s.month;
  slideDesc.textContent = s.desc;
  slideImg.src = s.img;
  counter.textContent = `${idx + 1} / ${slides.length}`;

  prevBtn.disabled = idx === 0;
  nextBtn.textContent = (idx === slides.length - 1) ? "Son ✨" : "İleri →";
}

playMusicBtn.addEventListener("click", () => {
  safeStartMusic();
  playMusicBtn.textContent = "Müzik Açık ✓";
});

toggleMusicBtn.addEventListener("click", () => {
  toggleMusic();
  toggleMusicBtn.textContent = bgm.paused ? "♫ (Kapalı)" : "♫";
});

nextFromHero.addEventListener("click", () => {
  // Kullanıcı zaten tıkladığı için müzik başlatmayı da deneriz
  safeStartMusic();
  showScreen("story");
  render();
});

prevBtn.addEventListener("click", () => {
  if (idx > 0) idx--;
  render();
});

nextBtn.addEventListener("click", () => {
  if (idx < slides.length - 1) {
    idx++;
    render();
  } else {
    // son ekran: hero'ya dön ya da mini kapanış yazısı ekle
    showScreen("hero");
  }
});

// Klavye ile gezinme (opsiyonel)
window.addEventListener("keydown", (e) => {
  if (!story.classList.contains("active")) return;
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "ArrowRight") nextBtn.click();
});

// ilk yükleme
showScreen("hero");
