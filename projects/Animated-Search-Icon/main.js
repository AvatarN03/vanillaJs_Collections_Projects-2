const searchBar = document.querySelector(".search-bar-container");
const magnifier = document.querySelector(".magnifier");
const input = document.querySelector("input");
const suggestions = document.querySelector(".suggestions");
const suggestionItems = document.querySelectorAll(".suggestion-item");

// Toggle search bar
magnifier.addEventListener("click", (e) => {
  e.stopPropagation();
  searchBar.classList.toggle("expanded");

  if (searchBar.classList.contains("expanded")) {
    setTimeout(() => {
      input.focus();
    }, 100);
  }
});

// Show suggestions on input focus
input.addEventListener("focus", () => {
  if (input.value.trim() === "") {
    suggestions.classList.add("show");
  }
});

// Hide suggestions on blur with delay
input.addEventListener("blur", () => {
  setTimeout(() => {
    suggestions.classList.remove("show");
  }, 200);
});

// Filter suggestions as user types
input.addEventListener("input", () => {
  const value = input.value.toLowerCase();

  if (value.trim() === "") {
    suggestionItems.forEach((item) => (item.style.display = "flex"));
    suggestions.classList.add("show");
  } else {
    let hasVisible = false;
    suggestionItems.forEach((item) => {
      const text = item.getAttribute("data-value").toLowerCase();
      if (text.includes(value)) {
        item.style.display = "flex";
        hasVisible = true;
      } else {
        item.style.display = "none";
      }
    });

    if (hasVisible) {
      suggestions.classList.add("show");
    } else {
      suggestions.classList.remove("show");
    }
  }
});

// Handle suggestion click
suggestionItems.forEach((item) => {
  item.addEventListener("click", () => {
    input.value = item.getAttribute("data-value");
    suggestions.classList.remove("show");
    input.focus();
  });
});


// Close search bar when clicking outside
document.addEventListener("click", (e) => {
  if (!searchBar.contains(e.target)) {
    searchBar.classList.remove("expanded");
    suggestions.classList.remove("show");
  }
});

// Prevent closing when clicking inside search bar
searchBar.addEventListener("click", (e) => {
  e.stopPropagation();
});
