// Pagination and rendering logic
const chunkSize = 10;
let currentIndex = 0;
let filteredProjects = [];
let allProjects = [];

const cardContainer = document.querySelector("#card-container");
const loadMoreBtn = document.querySelector("#load-more");
const searchInput = document.querySelector("#searchInput");

// Fetch projects from JSON file
async function loadProjects() {
  try {
    const response = await fetch('./projects.json');
    if (!response.ok) {
      throw new Error('Failed to load projects');
    }
    const data = await response.json();
    allProjects = data.projects;
    console.log('Projects loaded:', allProjects);
    
    // Initial render after loading
    renderProjectsChunk(0, chunkSize);
  } catch (error) {
    console.error('Error loading projects:', error);
    if (cardContainer) {
      cardContainer.innerHTML = "<p class='no-results'>Failed to load projects. Please try again later.</p>";
    }
  }
}

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

// Load projects on page load
loadProjects();