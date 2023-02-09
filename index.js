const url = "https://www.omdbapi.com/?apikey=5685c227&";
let search = null;
let movieSearchList = [];

const movieData = document.getElementById("movie-data");
const movieWatchlist = document.querySelector("#watchlist");

document.getElementById("form-el").addEventListener("submit", function (e) {
  e.preventDefault();
  const searchInput = document.getElementById("text").value;
  search = searchInput;
  movieData.innerHTML = "";
  renderData();
});

function hideEl() {
  document.getElementsByClassName("main-bg")[0].style.visibility = "hidden";
}

// this function is taking the value of the search bar, then in the first fetch is getting the list of IDs, the in the second fetch is getting the data for each movie from the search by it's ID
async function getMovieList(search) {
  try {
    const response1 = await fetch(`${url}s=${search}&type=movie&plot=short`);
    const data1 = await response1.json();
    const movieSearchList = [];

    for (const item of data1.Search) {
      const response2 = await fetch(`${url}i=${item.imdbID}&plot=full`);
      const data2 = await response2.json();
      movieSearchList.push(data2);
    }
    return movieSearchList;
  } catch (error) {
    console.error(error);
  }
}
//this function return the movie ID from whatchlist btn
function addToWatchlist(id) {
  let html = "";
  fetch(`${url}i=${id}&plot=full`)
    .then((res) => res.json())
    .then((movie) => {
      html += `  
    <div class="content">
      <div class="content-img">
          <img src=${movie.Poster} alt="/">
      </div>
      <div class="data">  
      <div class="data-first">
          <span class="data-name">${movie.Title}</span>
          <i class="icon-star fa-solid fa-star fa-2xs"></i>
          <span class="data-score">${movie.imdbRating}</span>
      </div>
      <div class="data-second">
          <span class="data-time">${movie.Runtime}</span>
          <span class="data-gen">${movie.Genre}</span>
          <button><i class="fa-solid fa-circle-plus"></i>Watchlist</button>
      </div>
          <p class="data-desc">${movie.Plot}</p>   
    </div>
    </div>
    `;
      console.log(html);
      console.log(movie.Title);

      movieWatchlist.innerHTML = html;
    });
}

async function renderData() {
  hideEl();
  const result = await getMovieList(search);
  let html = "";
  result.map((movie) => {
    html = `  
    <div class="content">
      <div class="content-img">
          <img src=${movie.Poster} alt="/">
      </div>
      <div class="data">  
      <div class="data-first">
          <span class="data-name">${movie.Title}</span>
          <i class="icon-star fa-solid fa-star fa-2xs"></i>
          <span class="data-score">${movie.imdbRating}</span>
      </div>
      <div class="data-second">
          <span class="data-time">${movie.Runtime}</span>
          <span class="data-gen">${movie.Genre}</span>
          
      </div>
          <p class="data-desc">${movie.Plot}</p>   
    </div>
    </div>
    `;
    movieData.innerHTML += html;
  });
}

//FOR LINE 89 <button onClick="addToWatchlist('${movie.imdbID}')" ><i
