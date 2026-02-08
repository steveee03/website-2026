//Music

const bgMusic = document.getElementById("bg-music");

// Try autoplay on load
window.addEventListener("load", () => {
  bgMusic.volume = 0.4;

  const playAttempt = bgMusic.play();
  if (playAttempt !== undefined) {
    playAttempt.catch(() => {
      console.log("Autoplay blocked — will start on interaction");
    });
  }
});


// Elements
const openBtn = document.getElementById("open-btn");
const flap = document.getElementById("flap");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");

const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

const datePage = document.getElementById("date-page");

// Open envelope
openBtn.addEventListener("click", () => {

  // open envelope flap
  flap.style.transform = "rotateX(180deg)";

  // reveal scroll
  letter.classList.remove("hidden");

  // hide open button after click
  openBtn.style.display = "none";
});



// No button runs away on hover
noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

// Placeholder reaction on "No" click
noBtn.addEventListener("click", () => {
  alert("😤 Placeholder for emoji / GIF reaction");
});

// Yes button logic
yesBtn.addEventListener("click", () => {
  launchFireworks();

  letter.classList.add("scroll-down");

  setTimeout(() => {
    letter.classList.add("hidden");
    datePage.classList.remove("hidden");
  }, 900);
});


// Placeholder fireworks function
function launchFireworks() {
  console.log("🎆 Fireworks will go here");
}
