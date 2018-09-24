// jshint esversion: 6

// Variable declarations
const darkToggle = document.getElementById('dark-btn');
const search = document.querySelector('#search');
const searchBtn = document.querySelector('#search-btn');
const trendingText = document.querySelector('#trending');
const api = 'https://api.giphy.com/v1/gifs/search?q=';
const apiKey = '&api_key=1NEAOTayyzl4oohzVnNZUABFXmbfUCxK&limit=20';

let query;

// Load gifs on click or enter
search.addEventListener('keyup', event => {
    event.preventDefault();
    if (event.keyCode === 13) { //key coode 13 corresponds to the enter key
        searchBtn.click();
    }
});

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

// Dark mode
darkToggle.addEventListener('click', function () {
    let body = document.getElementsByTagName('body')[0];
    let currentClass = body.className;

    body.className = currentClass == 'dark-mode' ? 'light-mode' : 'dark-mode';

    if (darkToggle.classList.contains('fa-toggle-off')) {
        darkToggle.classList.remove('fa-toggle-off');
        darkToggle.classList.add('fa-toggle-on');
        darkToggle.style.color = "#fff";
    } else {
        darkToggle.classList.add('fa-toggle-off');
        darkToggle.classList.remove('fa-toggle-on');
        darkToggle.style.color = "#333";
    }


});