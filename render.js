const allProjectData = {
  projects: [
    {
      id: 1,
      title: "Age Calc",
      description: "Compute age from a birthdate.",
      image: "./assets/AgeCalculator-min.jpg",
      link: "./projects/Age-Calculator/index.html",
    },
    {
      id: 2,
      title: "Analog Clock",
      description: "Real-time analog clock.",
      image: "./assets/Analog-Clock-min.jpg",
      link: "./projects/Analog-Clock/index.html",
    },
    {
      id: 3,
      title: "Search Icon",
      description: "Animated expandable search control.",
      image: "./assets/Animated-Search-min.png",
      link: "./projects/Animated-Search-Icon/index.html",
    },
    {
      id: 4,
      title: "Auto Text",
      description: "Typing-style text animation.",
      image: "./assets/AutoText-min.jpg",
      link: "./projects/Auto-Text-Animation/index.html",
    },
    {
      id: 5,
      title: "Parallax Scroll",
      description: "Background moves at a different speed.",
      image: "./assets/Scroll.jpg",
      link: "./projects/Background-Scroll-Effect/index.html",
    },
    {
      id: 6,
      title: "Ripple Button",
      description: "Click ripple effect on buttons.",
      image: "./assets/Ripple.jpg",
      link: "./projects/Button-Ripple-Effect/index.html",
    },
    {
      id: 7,
      title: "Counter Timer",
      description: "Animated numeric counter/timer.",
      image: "./assets/Timer.jpg",
      link: "./projects/Counter-Timer/index.html",
    },
    {
      id: 8,
      title: "Cursor Trail",
      description: "Stylized cursor effects and trails.",
      image: "./assets/Cursor-min.jpg",
      link: "./projects/Cursor_Animation/index.html",
    },
    {
      id: 9,
      title: "Dark Mode",
      description: "Toggle site theme to dark/light.",
      image: "./assets/DarkMode-min.jpg",
      link: "./projects/Dark-Mode/index.html",
    },
    {
      id: 10,
      title: "Digital Clock",
      description: "Live digital time display.",
      image: "./assets/Digital-Clock-min.jpg",
      link: "./projects/DigitalClock/index.html",
    },
    {
      id: 11,
      title: "Drum Kit",
      description: "Play drum sounds via keyboard.",
      image: "./assets/Drum-min.jpg",
      link: "./projects/Drum-Kit/index.html",
    },
    {
      id: 12,
      title: "Emoji API",
      description: "Fetch and show emojis.",
      image: "./assets/Emoji-min.jpg",
      link: "./projects/Emoji-API/index.html",
    },
    {
      id: 13,
      title: "Expense Tracker",
      description: "Track expenses using localStorage.",
      image: "./assets/expense-min.jpg",
      link: "./projects/Expense_Tracker/index.html",
    },
    {
      id: 14,
      title: "Filter Gallery",
      description: "Filter images by category.",
      image: "./assets/Filter-min.jpg",
      link: "./projects/Filter-Gallery/index.html",
    },
    {
      id: 15,
      title: "Ring Trail",
      description: "Cursor-following ring animation.",
      image: "./assets/Heart-min.jpg",
      link: "./projects/RingTrail/index.html",
    },
    {
      id: 16,
      title: "Image Search",
      description: "Search and display images via API.",
      image: "./assets/ImageSearch-min.jpg",
      link: "./projects/Image-Search/index.html",
    },
    {
      id: 17,
      title: "Mini Calendar",
      description: "Compact month view with navigation.",
      image: "./assets/Calender-min.png",
      link: "./projects/Mini-Calender/index.html",
    },
    {
      id: 18,
      title: "Miranda Clone",
      description: "Animated landing built with GSAP.",
      image: "./assets/miranda.jpg",
      link: "./projects/Miranda-Clone/index.html",
    },
    {
      id: 19,
      title: "Pomodoro",
      description: "Work/break Pomodoro timer.",
      image: "./assets/Timer2.jpg",
      link: "./projects/Pomerdo-TImer/index.html",
    },
    {
      id: 20,
      title: "Ramufy Player",
      description: "Simple music player UI.",
      image: "./assets/music-player.jpg",
      link: "./projects/Ramufy/index.html",
    },
    {
      id: 21,
      title: "Random Meme",
      description: "Show random memes from an API.",
      image: "./assets/Random.jpg",
      link: "./projects/Random-Meme/index.html",
    },
    {
      id: 22,
      title: "Color Generator",
      description: "Generate random colors.",
      image: "./assets/Random-Color.jpg",
      link: "./projects/Random-Color-Generator/index.html",
    },
    {
      id: 23,
      title: "Char Counter",
      description: "Live character count for inputs.",
      image: "./assets/Realtime-Count.jpg",
      link: "./projects/Realtime-Character-Count/index.html",
    },
    {
      id: 24,
      title: "Rotating Gallery",
      description: "Rotating image carousel.",
      image: "./assets/Rotating-Image.jpg",
      link: "./projects/Rotating-Image-Gallery/index.html",
    },
    {
      id: 25,
      title: "Shoes Store",
      description: "Product showcase layout.",
      image: "./assets/shoes.jpg",
      link: "./projects/Shoes-Website/index.html",
    },
    {
      id: 26,
      title: "Todo List",
      description: "Add, remove, and persist tasks.",
      image: "./assets/todo.jpg",
      link: "./projects/Todo-List/index.html",
    },
    {
      id: 27,
      title: "Video Pop",
      description: "Play video in a modal overlay.",
      image: "./assets/VideoPop.jpg",
      link: "./projects/Video-Pop/index.html",
    },
    {
      id: 28,
      title: "Lucy Education",
      description: "Responsive educational landing page.",
      image: "./assets/lucy-min.png",
      link: "./projects/Lucy-Education/index.html",
    },
    {
      id: 29,
      title: "MemoryFlash",
      description: "A Memory Flash Game tests players' memory by matching card pairs as quickly as possible.",
      image: "./assets/memory.jpg",
      link: "./projects/MemoryFlash/index.html",
    }
  ],
};


// Pagination and rendering logic
const chunkSize = 10;
let currentIndex = 0;
let filteredProjects = [];

const cardContainer = document.querySelector("#card-container");
const loadMoreBtn = document.querySelector("#load-more");
const searchInput = document.querySelector("#searchInput");

const allProjects = allProjectData.projects;
console.log(allProjectData);
console.log(allProjects);

function renderProjectsChunk(startIndex, size) {
  const isSearching = searchInput && searchInput.value.trim() !== "";
  const activeData = isSearching ? filteredProjects : allProjects;

  if (!activeData || activeData.length === 0) {
    if (cardContainer)
      cardContainer.innerHTML = "<p class='no-results'>No projects found ☹️</p>";
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
    currentIndex = 0;
    return;
  }

  if (startIndex === 0) cardContainer.innerHTML = "";

  const fragment = document.createDocumentFragment();
  const endIndex = Math.min(startIndex + size, activeData.length);

  for (let i = startIndex; i < endIndex; i++) {
    const project = activeData[i];
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="imageContainer">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="content">
        <h1>${project.title}</h1>
        <p>${project.description}</p>
      </div>
      <div class="buttonContainer">
        <button><a href="${project.link}" target="_blank" rel="noopener">View Project</a></button>
      </div>
    `;
    fragment.appendChild(card);
  }

  cardContainer.appendChild(fragment);
  currentIndex = endIndex;
  loadMoreBtn.style.display = currentIndex >= activeData.length ? "none" : "block";

  // 🔥 Trigger GSAP animation after rendering cards
  if (typeof window.animateCards === 'function') {
    setTimeout(() => window.animateCards(), 50);
  }
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    renderProjectsChunk(currentIndex, chunkSize);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    filteredProjects = query
      ? allProjects.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        )
      : [];
    currentIndex = 0;
    renderProjectsChunk(0, chunkSize);
  });
}

// Initial render
renderProjectsChunk(0, chunkSize);