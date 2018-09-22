// jshint esversion: 6

// Variable declarations
const search = document.querySelector('#search');
const searchBtn = document.querySelector('#search-btn');
const trendingText = document.querySelector('#trending');
const api = 'https://api.giphy.com/v1/gifs/search?q=';
const apiKey = '&api_key=1NEAOTayyzl4oohzVnNZUABFXmbfUCxK&limit=20';

let query;

// Load gifs on click
searchBtn.addEventListener('click', function () {
    query = search.value;
    let url = api + query + apiKey;
    fetch(url)
        .then(response => response.json())
        .then(json => {
            for (let i = 0; i < json.data.length; i++) {
                imgCreate(json.data[i].images.original.url);
            }
        })
        .catch(err => {
            console.log(err);
        });
    search.value = '';
    document.querySelector('.gif-container').innerHTML = '';
    trendingText.innerHTML = 'Showing results for: ' + '\"' + query + '\"';
});


function imgCreate(src) {
    let img = document.createElement('img');
    img.src = src;
    document.querySelector('.gif-container').appendChild(img);
}


// Trending Gifs when page loads
window.onload = function () {
    let trending = 'https://api.giphy.com/v1/gifs/trending?';
    fetch(trending + apiKey)
        .then(response => response.json())
        .then(json => {
            for (let i = 0; i < json.data.length; i++) {
                imgCreate(json.data[i].images.original.url);
            }
        })
        .catch(err => {
            console.log(err);
        });
};
