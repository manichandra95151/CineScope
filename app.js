// Get references to the input field and button
const movieNameInput = document.getElementById('movieNameInput');
const getButton = document.getElementById('getButton');

function displaymovieDetails(data) {
    const moviecards = document.querySelector('.movie-cards');
    moviecards.innerHTML = ''; // Clear previous movie details
    moviecards.style.width = "95vw"; // Set width to 200 pixels
moviecards.style.height = "100vh"; 
    data.results.forEach((movie) => {
        // create div element
        const moviecard = document.createElement("div");
    
        // add to list of classes
        moviecard.classList.add("movie-card");
    
        // manipulate dom
        let imgrul;
        if(movie.hasOwnProperty('imageurl')){
           imgrul=movie.imageurl;
        }
        else imgrul="https://icons.veryicon.com/png/o/business/new-vision-2/picture-loading-failed-1.png"
        const existingImage = moviecard.querySelector('.movie-img');
if (existingImage) {
    existingImage.remove();
}
let htmlContent = `
    <img  class="movie-img" src="${imgrul}" alt="movie"/>
    <h5 id="movie-title">${movie.title}</h5>
`;

if (movie.genre) {
    htmlContent += `<p class="genre">Genre: ${movie.genre}</p>`;
}

if (movie.synopsis) {
    htmlContent += `<p class="summary">Summary: ${movie.synopsis}</p>`;
}

if (movie.released) {
    htmlContent += `<p class="Release-year">Released Year: ${movie.released}</p>`;
}

if (movie.imdbid) {
    htmlContent += `
        <button class="imdb-btn">
            <a class="imdb" href="https://www.imdb.com/title/${movie.imdbid}" target="_blank">View on IMDB</a>
        </button>
    `;
}
        moviecard.innerHTML = htmlContent;

        
    
        // attach each divMovie to gridContainer
        moviecards.appendChild(moviecard);
    });
}

// Function to fetch movie details
async function fetchMovieDetails(movieTitle) {
    const baseUrl = 'https://ott-details.p.rapidapi.com/search';
    const apiKey = 'ffd032e041mshd3edde458e38c14p11e97cjsnbc4b6c65ec1a';
    const headers = {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
    };

    try {
        const url = `${baseUrl}?title=${encodeURIComponent(movieTitle)}`;
        const response = await fetch(url, { method: 'GET', headers });
        
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        console.log(data);
        displaymovieDetails(data);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
}

// Event listener for the button click
getButton.addEventListener('click', async function() {
    // Get the value of the input field
 
    const movieTitle = movieNameInput.value.trim();

    window.scrollTo({
        top: 300,
        behavior: 'smooth' // Optional: Smooth scrolling effect
    });
    // Check if the movie title is not empty
    if (movieTitle) {
        const movieDetails = await fetchMovieDetails(movieTitle);
        if (movieDetails) {
            // Process the movie details
            console.log('Movie details:', movieDetails);
            movieNameInput.value = '';
        }
    } else {
        console.error('Please enter a movie title');
    }
});
