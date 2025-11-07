const cursor = document.querySelector(".cursor");
let timevar;
let mouseX = 0;
let mouseY = 0;

// Canvas setup
const bgCanvas = document.getElementById("backgroundCanvas");
const particlesCanvas = document.getElementById("particles");
const bgCtx = bgCanvas.getContext("2d");
const particlesCtx = particlesCanvas.getContext("2d");

// Set canvas sizes
function setCanvasSize() {
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;
}

setCanvasSize();
window.addEventListener("resize", setCanvasSize);

// Background animation
class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * bgCanvas.width;
    this.y = Math.random() * bgCanvas.height;
    this.size = Math.random() * 2;
    this.speed = Math.random() * 0.5 + 0.1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.y += this.speed;
    if (this.y > bgCanvas.height) this.reset();
  }

  draw() {
    bgCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    bgCtx.beginPath();
    bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    bgCtx.fill();
  }
}

// Particles system
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = color;
    this.life = 1;
    this.decay = Math.random() * 0.02 + 0.01;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= this.decay;
    this.size *= 0.99;
  }

  draw() {
    particlesCtx.globalAlpha = this.life;
    particlesCtx.fillStyle = this.color;
    particlesCtx.beginPath();
    particlesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    particlesCtx.fill();
  }

  isDead() {
    return this.life <= 0;
  }
}

// Initialize objects
const stars = Array.from({ length: 100 }, () => new Star());
const gridItems = document.querySelectorAll(".grid-item");

// Animation loops
function animateBackground() {
  bgCtx.fillStyle = "rgba(15, 15, 15, 0.1)";
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  stars.forEach((star) => {
    star.update();
    star.draw();
  });

  requestAnimationFrame(animateBackground);
}


// Start animations
animateBackground();

// Enhanced cursor functions
function showCursor(x, y) {
  mouseX = x;
  mouseY = y;

  cursor.style.top = y + "px";
  cursor.style.left = x + "px";
  cursor.style.display = "block";

  

  clearTimeout(timevar);
  timevar = setTimeout(() => {
    cursor.style.display = "none";
  }, 6000);
}

// Event listeners
document.addEventListener("mousemove", (e) => {
  showCursor(e.pageX, e.pageY);
});

document.addEventListener("mouseout", () => {
  cursor.style.display = "none";
});
document.addEventListener("mouseleave" ,() => {
  cursor.style.display = "none";
});

document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  showCursor(touch.pageX, touch.pageY);
  e.preventDefault();
});

document.addEventListener("touchend", () => {
  cursor.style.display = "none";
});

// Prevent default touch behavior
document.addEventListener(
  "touchstart",
  (e) => {
    if (e.target === particlesCanvas) {
      e.preventDefault();
    }
  },
  { passive: false }
);
