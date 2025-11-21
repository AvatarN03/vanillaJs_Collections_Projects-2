const generate = document.querySelector('.btn');
const title = document.querySelector('.meme-title');
const image = document.querySelector('.meme-image');
const author = document.querySelector('.meme-author');
const spinner = document.querySelector('.spinner');
const ImageDownload = document.getElementById('download')

let url = 'https://imgs.search.brave.com/k5cFJ5M481qyZ3ZsNk2fm1_OBZZQln5yjo5E4e_9Q94/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmt5/bS1jZG4uY29tL3Bo/b3Rvcy9pbWFnZXMv/bWFzb25yeS8wMDAv/NDA2Lzk0Ni80YTMu/anBn';


const updateDetails = (data_title, data_author) => {
    title.innerHTML = data_title;
    author.innerHTML = data_author;
    generate.style.color = ''
    console.log('hii3');
}

const generateMeme = () => {
    // Show the spinner and hide the image while loading
    spinner.style.display = 'block';
    image.style.display = 'none';
    title.style.display = 'none';
    author.style.display = 'none';
    console.log('hii');
    generate.style.color = '#dddeee'

    fetch(window.env.API_BASE_URL)
    .then((res) => res.json())
    .then((data) => {
        // Add event listener to image for load event before setting the src
        image.addEventListener('load', () => {
            spinner.style.display = 'none';
            image.style.display = 'block';
            title.style.display = 'block';
            author.style.display = 'block';
            console.log('hii2');
            updateDetails(data.title, data.author);
        }, { once: true }); // Ensure the event listener is called only once

        // Set the image source after setting up the load event listener
        image.setAttribute('src', data.url);
        url = data.url
    })
}


generate.addEventListener('click', generateMeme);
