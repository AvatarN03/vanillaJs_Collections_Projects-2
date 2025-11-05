const dynamicText = document.getElementById("dynamic-text");

const careers = [
"A Full-Stack Developer",
"A Web Artisan",
"A Software Engineer",
"A Tech Enthusiast",
"A Problem Solver",
"An AI Explorer",
"A Digital Creator"
];

let careerIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeEffect() {
  const currentCareer = careers[careerIndex];

  if (isPaused) {
    isPaused = false;
    setTimeout(typeEffect, 2000); // Pause at full text
    return;
  }

  if (!isDeleting) {
    // Typing
    dynamicText.textContent = currentCareer.slice(0, charIndex);
    charIndex++;

    if (charIndex > currentCareer.length) {
      isPaused = true;
      isDeleting = true;
      setTimeout(typeEffect, 100);
      return;
    }

    setTimeout(typeEffect, 150);
  } else {
    // Deleting
    dynamicText.textContent = currentCareer.slice(0, charIndex);
    charIndex--;

    if (charIndex < 0) {
      isDeleting = false;
      careerIndex = (careerIndex + 1) % careers.length;
      charIndex = 0;
      setTimeout(typeEffect, 500);
      return;
    }

    setTimeout(typeEffect, 100);
  }
}

// Start the typing effect
typeEffect();
