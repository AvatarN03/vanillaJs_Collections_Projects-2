const input = document.querySelector("input");
const body = document.querySelector("body");

// Load saved preference
function loadPreference() {
  const isDark = localStorage.getItem("darkMode") === "true";
  input.checked = isDark;
  updateTheme();
}

// Update theme based on checkbox state
function updateTheme() {
  if (input.checked) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  }
}

// Listen for toggle changes
input.addEventListener("input", () => {
  localStorage.setItem("darkMode", input.checked);
  updateTheme();
});

// Initialize
loadPreference();
