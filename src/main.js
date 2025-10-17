import "@fontsource/inter"; // Defaults to 400 weight
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";



// 2️⃣ Data and pagination setup
let allProjectData = [];
const chunkSize = 10;
let currentIndex = 0;

const cardContainer = document.querySelector("#card-container");
const loadMoreBtn = document.querySelector("#loadMoreBtn"); // Make sure this exists in HTML!

// 3️⃣ Render function (chunked)
function renderProjectsChunk(startIndex, size) {
  

  const fragment = document.createDocumentFragment();

  for (let i = startIndex; i < Math.min(startIndex + size, allProjectData.length); i++) {
    const project = allProjectData[i];

    const card = document.createElement("div");
    card.className = "card";
    card.id = project.id;

    const imageContainer = document.createElement("div");
    imageContainer.className = "imageContainer";

    const image = document.createElement("img");
    image.src = project.image;
    image.loading = "lazy";
    imageContainer.appendChild(image);

    const content = document.createElement("div");
    content.className = "content";

    const title = document.createElement("h1");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    content.appendChild(title);
    content.appendChild(description);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "buttonContainer";

    const button = document.createElement("button");
    const anchor = document.createElement("a");
    anchor.href = project.link;
    anchor.target = "_blank";
    anchor.textContent = "View Project";
    button.appendChild(anchor);
    buttonContainer.appendChild(button);

    card.appendChild(imageContainer);
    card.appendChild(content);
    card.appendChild(buttonContainer);

    fragment.appendChild(card);
  }

  cardContainer.appendChild(fragment);
  currentIndex += size;

}

// 4️⃣ Load more button click
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    renderProjectsChunk(currentIndex, chunkSize);
  });
}

// 5️⃣ Load projects module
async function loadProjects() {
  if (!allProjectData.length) {
    const module = await import('./lib/data.js'); // dynamic import
    const res = module.default;
    allProjectData = res.projects
    console.log(allProjectData)
  }
  renderProjectsChunk(0, chunkSize);
}

// 6️⃣ Initial load
loadProjects();
