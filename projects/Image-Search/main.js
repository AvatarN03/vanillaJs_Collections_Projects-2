const input = document.getElementById("input");
const ImageWrapper = document.querySelector(".search-results");
const form = document.querySelector("form");
const showMore = document.getElementById("show-more");

let inputData = "";
let page = 1;

async function searchImage() {
  inputData = input.value;
  
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${window.env.ACCESS_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;
  
  if (page === 1) {
    ImageWrapper.innerHTML = "";
  }
  
  results.map((c) => {
    const res = document.createElement("div");
    res.classList.add("result");
    
    const image = document.createElement("img");
    image.src = c.urls.small;
    image.alt = c.alt_description;
    
    // Create info container for title and icons
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    
    // Create title span
    const title = document.createElement("span");
    title.classList.add("image-title");
    title.textContent = c.alt_description || "Untitled";
    
    // Create icons container
    const iconsContainer = document.createElement("div");
    iconsContainer.classList.add("icons-container");
    
    // Link icon
    const link = document.createElement("a");
    link.href = c.links.html;
    link.target = "_blank";
    link.classList.add("link-btn");
    link.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    `;
    
    // Download button
    const downloadBtn = document.createElement("a");
    downloadBtn.href = c.urls.full;
    downloadBtn.download = `${c.alt_description || 'image'}.jpg`;
    downloadBtn.classList.add("download-btn");
    downloadBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    `;
    
    // Handle download with fetch to avoid CORS issues
    downloadBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const imageResponse = await fetch(c.urls.full);
        const blob = await imageResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${c.alt_description || 'image'}.jpg`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error('Download failed:', error);
        window.open(c.urls.full, '_blank');
      }
    });
    
    // Assemble the structure
    iconsContainer.appendChild(link);
    iconsContainer.appendChild(downloadBtn);
    infoContainer.appendChild(title);
    infoContainer.appendChild(iconsContainer);
    
    res.appendChild(image);
    res.appendChild(infoContainer);
    ImageWrapper.appendChild(res);
  });
  
  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImage();
});

showMore.addEventListener("click", () => searchImage());