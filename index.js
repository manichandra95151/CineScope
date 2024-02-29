function displayMovieDetails(data) {
    // grab grid-container, where to place cards
    const gridContainer = document.getElementsByClassName("");
  
    //   iterate returned data
    data.results.forEach((result) => {
      // create div element
      const divMovie = document.createElement("div");
  
      // add to list of classes
      divMovie.classList.add("div-movie");
  
      // manipulate dom
      divMovie.innerHTML = `
      <img class="movie-image" src="${result.imageurl}" alt="movie"/>
      <h2>${result.title}</h2>
      <p class="released">${result.released} - ${result.type}</p>
      <p class="synopsis">${result.synopsis}</p>
      <p class="streaming-details">Streaming Details</p>
      `;
  
      // attach each divMovie to gridContainer
      gridContainer.appendChild(divMovie);
    });
  }
  
  function bindUrlWithParams(url, params) {
    const queryString = new URLSearchParams(params).toString(); //title=...
    return `${url}?${queryString}`;
  }
  
  function fetchMovie(movieValue) {
    const urlApi = "https://ott-details.p.rapidapi.com/search";
    const queryParams = {
      title: `${movieValue}`,
    };
  
    // combine url with params
    const urlWithParams = bindUrlWithParams(urlApi, queryParams);
  
    //   fetch API - all
    fetch(urlWithParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-RapidAPI-Key": "b6013b5b88msh5ef598d84cc3975p19a5dcjsn49b2600a41ec",
        "X-RapidAPI-Host": "ott-details.p.rapidapi.com",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // invoke upon receiving data
        displayMovieDetails(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  
  function handleDOMContentLoaded(e) {
    // grab form element
    const streamingForm = document.querySelector("#streaming-form");
  
    //   handle streaming-form submission
    streamingForm.addEventListener("submit", (e) => {
      // prevent default refresh behavior
      e.preventDefault();
  
      // grab user input
      const movieValue = document.querySelector("#streaming-input").value;
  
      fetchMovie(movieValue);
  
      // clear user input
      e.target.reset();
    });
  }
  
  // wait HTML to load first
  document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
  