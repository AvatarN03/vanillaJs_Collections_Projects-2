import "@fontsource/inter"; // Defaults to 400 weight
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";



// 2️⃣ Data and pagination setup
let allProjectData = [];
const chunkSize = 10;
let currentIndex = 0;

const cardContainer = document.querySelector("#card-container");
const loadMoreBtn = document.querySelector("#load-more"); 
const searchInput = document.querySelector("#searchInput");
let filteredProjects =[]


// 3️⃣ Render function (chunked, append when startIndex > 0)
function renderProjectsChunk(startIndex, size /* dataArray not used any more */) {
  // choose active data explicitly:
  // - if user has a non-empty search term -> use filteredProjects (even if it's an empty array)
  // - otherwise use full allProjectData
  const isSearching = searchInput && searchInput.value.trim() !== "";
  const activeData = isSearching ? filteredProjects : allProjectData;

  // if no data, show message and hide load more
  if (!activeData || activeData.length === 0) {
    if (cardContainer) cardContainer.innerHTML = "<p class='no-results'>No projects found.☹️🥲</p>";
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
    currentIndex = 0;
    return;
  }

  // clear only when starting from 0 (new render / search / initial load)
  if (startIndex === 0 && cardContainer) {
    cardContainer.innerHTML = "";
  }

  const fragment = document.createDocumentFragment();
  const endIndex = Math.min(startIndex + size, activeData.length);

  for (let i = startIndex; i < endIndex; i++) {
    const project = activeData[i];

    const card = document.createElement("div");
    card.className = "card";
    card.id = project.id;

    const imageContainer = document.createElement("div");
    imageContainer.className = "imageContainer";

    const image = document.createElement("img");
    image.src = project.image;
    image.alt = project.title || "project image";
    image.loading = "lazy";
    imageContainer.appendChild(image);

    const content = document.createElement("div");
    content.className = "content";

    const title = document.createElement("h1");
    title.textContent = project.title;
    title.style.color = "#333333";

    const description = document.createElement("p");
    description.textContent = project.description;
    description.style.color = "#121212";

    content.appendChild(title);
    content.appendChild(description);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttonContainer";

    const button = document.createElement("button");
    const anchor = document.createElement("a");
    anchor.href = project.link;
    anchor.target = "_blank";
    anchor.rel = "noopener";
    anchor.textContent = "View Project";
    button.appendChild(anchor);
    buttonContainer.appendChild(button);

    card.appendChild(imageContainer);
    card.appendChild(content);
    card.appendChild(buttonContainer);

    fragment.appendChild(card);
  }

  if (cardContainer) cardContainer.appendChild(fragment);

  // update currentIndex to reflect how many items are now shown for the activeData
  currentIndex = endIndex;

  // hide or show load more button based on remaining items in the activeData
  if (loadMoreBtn) {
    loadMoreBtn.style.display = currentIndex >= activeData.length ? "none" : "block";
  }
}

// 4️⃣ Load more button click
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    // append next chunk (do not clear existing cards)
    renderProjectsChunk(currentIndex, chunkSize);
  });
}
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();

    if (query === "") {
      filteredProjects = [];
    } else {
      filteredProjects = allProjectData.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
      );
    }

    // reset index and render from start (this will clear the container)
    currentIndex = 0;
    renderProjectsChunk(0, chunkSize);
  })
}

// 5️⃣ Load projects module
async function loadProjects() {
   if (!allProjectData.length) {
    const module = await import("./lib/data.js");
    // module.default is expected to be the object { projects: [...] } or an array depending on your data.js
    allProjectData = module.default.projects || module.default || [];
  }
  currentIndex = 0;
  renderProjectsChunk(0, chunkSize);
}

// 6️⃣ Initial load
loadProjects();
