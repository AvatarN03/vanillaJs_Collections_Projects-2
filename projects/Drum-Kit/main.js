const kits = [
  { name: "crash1", key: "c" },
  { name: "snare1", key: "s" },
  { name: "tom1", key: "t" },
  { name: "kick", key: "k" },
];

const container = document.querySelector(".container");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

kits.forEach((kit) => {
  const kitElement = document.createElement("button");
  kitElement.classList.add("btn");
  kitElement.innerHTML = `
                ${kit.name.replace(/\d+$/, "")}
                <span class="key-hint">${kit.key.toUpperCase()}</span>
            `;

  container.appendChild(kitElement);

  // Create audio element
  const audioEle = document.createElement("audio");
  audioEle.src = `assets/${kit.name}.wav`;
  audioEle.preload = "auto";
  container.appendChild(audioEle);

  // Play sound function with visual feedback
  const playSound = () => {
    // Reset audio to start
    audioEle.currentTime = 0;
    audioEle.play().catch((e) => console.log("Audio play failed:", e));

    // Add visual feedback
    kitElement.classList.add("playing");
    setTimeout(() => {
      kitElement.classList.remove("playing");
    }, 150);
  };

  // Click event
  kitElement.addEventListener("click", playSound);

  // Keyboard event
  window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === kit.key) {
      playSound();
    }
  });
});

// Initialize audio context on first user interaction
document.addEventListener(
  "click",
  () => {
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
  },
  { once: true }
);
