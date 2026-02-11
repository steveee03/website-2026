//Music
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById('music-toggle');
let musicStarted = false;
let isMusicPlaying = false;

// Try autoplay on load
window.addEventListener("load", () => {
  bgMusic.volume = 0.3;

  const playAttempt = bgMusic.play();
  if (playAttempt !== undefined) {
    playAttempt.then(() => {
      console.log("Music started automatically");
      isMusicPlaying = true;
      musicStarted = true;
      musicToggle.textContent = '🔇 Music';
    }).catch(() => {
      console.log("Autoplay blocked — click to start");
      musicToggle.textContent = '🔊 Music';
    });
  }
});

// IMPORTANT FOR MOBILE: Start music on "Open me" button click
const openBtn = document.getElementById("open-btn");
openBtn.addEventListener("click", () => {
  // Start music if not started
  if (!musicStarted && bgMusic.paused) {
    bgMusic.play().then(() => {
      isMusicPlaying = true;
      musicStarted = true;
      musicToggle.textContent = '🔇 Music';
    }).catch(err => console.log("Play failed:", err));
  }
  
  // open envelope flap
  flap.style.transform = "rotateX(180deg)";
  // reveal scroll
  letter.classList.remove("hidden");
  // hide open button after click
  openBtn.style.display = "none";
});

// Music toggle button
musicToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.textContent = '🔊 Music';
    isMusicPlaying = false;
  } else {
    bgMusic.play().then(() => {
      musicToggle.textContent = '🔇 Music';
      isMusicPlaying = true;
      musicStarted = true;
    }).catch(err => {
      console.log("Play failed:", err);
    });
  }
});

// Google Form submission
function sendToGoogleForm(entryId, answer) {
  const formId = '1FAIpQLSf4awAMcdGyDOzwRHGVlpI3QpKRMDOsNSdxh9dpblzwLSX_ng';
  const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
  
  const data = new FormData();
  data.append(entryId, answer);
  
  fetch(formUrl, {
    method: 'POST',
    body: data,
    mode: 'no-cors'
  }).then(() => {
    console.log('Sent to Google Form:', answer);
  }).catch(err => {
    console.log('Form submission (silent):', err);
  });
}

// Elements
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

// No button logic - moves around and gets dramatic
let noClickCount = 0;

// Function to create crying emoji rain
function emojiRain() {
  const emojis = ['😭', '😢', '🥺', '😿'];
  const emojiCount = 25; // Number of falling emojis
  
  for (let i = 0; i < emojiCount; i++) {
    setTimeout(() => {
      const emoji = document.createElement('div');
      emoji.className = 'emoji-fall';
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.left = Math.random() * 100 + 'vw';
      emoji.style.animationDuration = (Math.random() * 2 + 2) + 's';
      document.body.appendChild(emoji);
      
      // Remove emoji after animation
      setTimeout(() => {
        emoji.remove();
      }, 4000);
    }, i * 100); // Stagger the emojis
  }
}

// Function to show custom popup
function showPopup(message) {
  const popup = document.getElementById('custom-popup');
  const popupMessage = document.getElementById('popup-message');
  
  popupMessage.textContent = message;
  popup.classList.remove('popup-hidden');
}

// Close popup
document.getElementById('popup-close').addEventListener('click', () => {
  document.getElementById('custom-popup').classList.add('popup-hidden');
});

noBtn.addEventListener("click", (e) => {
  noClickCount++;
  
  console.log("No button clicked! Count:", noClickCount);
  
  if (noClickCount === 1) {
    // First click - emoji rain + popup
    emojiRain();
    setTimeout(() => {
      const x = Math.random() * 150 - 75;
      const y = Math.random() * 150 - 75;
      noBtn.style.transform = `translate(${x}px, ${y}px)`;
      noBtn.style.transition = "transform 0.3s ease";
    }, 100);
  } 
  else if (noClickCount === 2) {
    // Second click
    emojiRain();
    setTimeout(() => {
      const x = Math.random() * 150 - 75;
      const y = Math.random() * 150 - 75;
      noBtn.style.transform = `translate(${x}px, ${y}px)`;
    }, 100);
  }
  else if (noClickCount === 3) {
    // Third click - main popup
    emojiRain();
    setTimeout(() => {
      showPopup("So you always wanna play hard to get huh?");
      const x = Math.random() * 150 - 75;
      const y = Math.random() * 150 - 75;
      noBtn.style.transform = `translate(${x}px, ${y}px)`;
    }, 100);
  } 
  else if (noClickCount >= 4) {
    // Fourth click - give up
    emojiRain();
    noBtn.textContent = "JUST CLICK YES - COULDN'T CODE MORE 😭";
    noBtn.style.fontSize = "14px";
    noBtn.style.padding = "12px 20px";
    noBtn.style.background = "#ffb3b3";
    noBtn.style.fontWeight = "600";
    noBtn.style.transform = "translate(0, 0)";
    noBtn.style.transition = "all 0.3s ease";
  }
});

// Yes button logic
yesBtn.addEventListener("click", () => {
  sendToGoogleForm('entry.1821016454', 'YES'); // Track YES
  // Launch fireworks AND celebration emojis
  launchFireworks();
  celebrationEmojiRain(); // NEW!
  
  // Fold up and move letter to the side
  setTimeout(() => {
    letter.style.animation = "foldAndSlide 1.2s ease forwards";
  }, 1500); // Wait for fireworks
  
  // Show next question
  setTimeout(() => {
    letter.classList.add("hidden");
    datePage.classList.remove("hidden");
  }, 2700);
});

// NEW FUNCTION: Celebration emoji rain for YES button
function celebrationEmojiRain() {
  const emojis = [
    // Drinks (most common) - 60% of emojis
    '🍻', '🍷', '🍾', '🍻', '🍷', '🍾', 
    '🥂', '🍹', '🍻', '🍷', '🍾', '🥂',
    '🍻', '🍷', '🍾', '🍹', '🥂', '🍻',
    // Party vibes
    '🎉', '🥳', '😄', '🎊', '✨', '💃', '🕺',
    // Food (just 3)
    '🍕', '🍔', '🌮',
    // Happy faces
    '😍', '🤩', '💖'
  ];
  const emojiCount = 25; // Lots of celebration!
  
  for (let i = 0; i < emojiCount; i++) {
    setTimeout(() => {
      const emoji = document.createElement('div');
      emoji.className = 'emoji-fall';
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.left = Math.random() * 100 + 'vw';
      emoji.style.animationDuration = (Math.random() * 2 + 2) + 's';
      emoji.style.fontSize = (Math.random() * 20 + 30) + 'px'; // Vary sizes
      document.body.appendChild(emoji);
      
      // Remove emoji after animation
      setTimeout(() => {
        emoji.remove();
      }, 4000);
    }, i * 80); // Faster cascade
  }
}
// Fireworks function - BIGGER AND BETTER
function launchFireworks() {
  const colors = [
    '#ff0844', '#ffb199', '#4ecca3', '#45b7d1', 
    '#f9ca24', '#ff9ff3', '#54a0ff', '#ff6348',
    '#00d2d3', '#ee5a6f', '#feca57', '#48dbfb'
  ];
  const fireworkCount = 15; // More fireworks!
  
  for (let i = 0; i < fireworkCount; i++) {
    setTimeout(() => {
      createFirework(colors[Math.floor(Math.random() * colors.length)]);
    }, i * 150); // Faster succession
  }
}

function createFirework(color) {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * (window.innerHeight * 0.5) + 50; // Upper half of screen
  
  const particles = 50; // More particles per explosion!
  
  for (let i = 0; i < particles; i++) {
    const particle = document.createElement('div');
    particle.className = 'firework-particle';
    particle.style.background = color;
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    const angle = (Math.PI * 2 * i) / particles;
    const velocity = 150 + Math.random() * 150; // Bigger explosion radius
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1500);
  }
  
  // Add a bright flash at the center
  const flash = document.createElement('div');
  flash.style.position = 'fixed';
  flash.style.left = x + 'px';
  flash.style.top = y + 'px';
  flash.style.width = '20px';
  flash.style.height = '20px';
  flash.style.borderRadius = '50%';
  flash.style.background = color;
  flash.style.boxShadow = `0 0 40px 20px ${color}`;
  flash.style.zIndex = '9999';
  flash.style.animation = 'flashFade 0.5s ease-out';
  document.body.appendChild(flash);
  
  setTimeout(() => flash.remove(), 500);
}

// Get new page elements
const panicPage = document.getElementById('panic-page');
const chillPage = document.getElementById('chill-page');
const finalPage = document.getElementById('final-page');

const panicBtn = document.getElementById('panic-btn');
const chillBtn = document.getElementById('chill-btn');
const panicContinue = document.getElementById('panic-continue');
const chillContinue = document.getElementById('chill-continue');
const fridayBtn = document.getElementById('friday-btn');
const saturdayBtn = document.getElementById('saturday-btn');

// Panic button click - show panic response
panicBtn.addEventListener('click', () => {
  sendToGoogleForm('entry.992802424', 'Panic'); // Track Panic
  datePage.classList.add('hidden');
  panicPage.classList.remove('hidden');
});

// Chill button click - show chill response
chillBtn.addEventListener('click', () => {
  sendToGoogleForm('entry.992802424', 'Chill'); // Track Chill
  datePage.classList.add('hidden');
  chillPage.classList.remove('hidden');
});

// Both continue buttons lead to final page
panicContinue.addEventListener('click', () => {
  panicPage.classList.add('hidden');
  finalPage.classList.remove('hidden');
});

chillContinue.addEventListener('click', () => {
  chillPage.classList.add('hidden');
  finalPage.classList.remove('hidden');
});

// Final choices - show confirmation
fridayBtn.addEventListener('click', () => {
  sendToGoogleForm('entry.868471388', 'Friday after office'); // Track Friday
  console.log('She chose: Friday after office');
  showConfirmation('Friday');
});

saturdayBtn.addEventListener('click', () => {
  sendToGoogleForm('entry.868471388', 'Saturday'); // Track Saturday
  console.log('She chose: Saturday');
  showConfirmation('Saturday');
});

// Show confirmation page
function showConfirmation(day) {
  // Launch celebration fireworks
  launchFireworks();
  
  // Hide final page and show confirmation
  setTimeout(() => {
    finalPage.classList.add('hidden');
    document.getElementById('confirmation-page').classList.remove('hidden');
  }, 1000);
  
  // Store the choice (for backend later)
  console.log('Final choice:', day);
}
