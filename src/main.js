import "@fontsource/inter"; // Defaults to 400 weight
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";



// 2️⃣ Data and pagination setup
let allProjectData = [];
const chunkSize = 10;
let currentIndex = 0;

const cardContainer = document.querySelector("#card-container");
const loadMoreBtn = document.querySelector("#loadMoreBtn"); 
const searchInput = document.querySelector("#searchInput");
let filteredProjects =[]


// 3️⃣ Render function (chunked)
function renderProjectsChunk(startIndex, size, dataArray = filteredProjects.length ? filteredProjects : allProjectData) {  

  const fragment = document.createDocumentFragment();
  cardContainer.innerHTML = "";

  for (let i = startIndex; i < Math.min(startIndex + size, dataArray.length); i++) {
    const project = dataArray[i];

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

  //hide the loadmore button
  if (loadMoreBtn) {
    loadMoreBtn.style.display =
      currentIndex >= dataArray.length ? "none" : "block";
  }

}

// 4️⃣ Load more button click
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    renderProjectsChunk(currentIndex, chunkSize);
  });
}
if(searchInput){
  searchInput.addEventListener("input", (e)=>{
    const query = e.target.value.trim().toLowerCase();

    if(query == "") filteredProjects =[]
    else {
      filteredProjects = allProjectData.filter(
        (project)=> 
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
      )
    }
    currentIndex =0;
    renderProjectsChunk(0, chunkSize);
  })
}

// 5️⃣ Load projects module
async function loadProjects() {
   if (!allProjectData.length) {
    const module = await import("./lib/data.js");
    allProjectData = module.default.projects;
  }
  currentIndex = 0;
  renderProjectsChunk(0, chunkSize);
}

// 6️⃣ Initial load
loadProjects();
