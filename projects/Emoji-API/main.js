const Btn = document.getElementById("generate-btn");
const emojiName = document.getElementById("emoji-name");
const emojiDisplay = document.getElementById("emoji");
const copyBtn = document.getElementById("copy-btn");
const copyNotification = document.getElementById("copy-notification");

const emojis = [];

async function emojiFetch() {
  let response = await fetch(`${window.env.API_BASE_URL}${window.env.API_KEY}`);
  let data = await response.json();

  for (let i = 0; i < 1200; i++) {
    emojis.push({
      name: data[i].character,
      code: data[i].unicodeName,
    });
  }
}

emojiFetch();

async function copyToClipboard() {
  const emojiText = emojiDisplay.textContent;
  try {
    await navigator.clipboard.writeText(emojiText);
    showCopyNotification();
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = emojiText;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      showCopyNotification();
    } catch (err2) {
      alert("Failed to copy emoji");
    }
    document.body.removeChild(textArea);
  }
}

function showCopyNotification() {
  copyNotification.classList.add("show");
  setTimeout(() => {
    copyNotification.classList.remove("show");
  }, 2000);
}

copyBtn.addEventListener("click", copyToClipboard);

// Also allow clicking on the emoji itself to copy
emojiDisplay.addEventListener("click", copyToClipboard);
emojiDisplay.style.cursor = "pointer";

Btn.addEventListener("click", () => {
  const randomN = Math.floor(Math.random() * emojis.length);

  emojiDisplay.innerHTML = emojis[randomN].name;
  emojiName.innerHTML = emojis[randomN].code;
  console.log(emojis[randomN].name);
});
