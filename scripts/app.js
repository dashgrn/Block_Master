let apiKey= 'api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6'
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6&page=1`
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6&query='
const POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6&language=en-US&page=1`

let movieCard = document.getElementById('movieCard-template').content
const fragment = document.createDocumentFragment()
const main = document.getElementById('main')
const movieSearchInput = document.getElementById('movieSearchInput')
const btnSearch = document.getElementById('btnSearch')
let searchQuery = movieSearchInput.value

//pupular movies for homepage
const getPopular = async () => {
    popularRes = await fetch(POPULAR)
    popularData = await popularRes.json()
    let {results} = popularData
    return results
}

//get search query
const searchMovie = async () => {
    searchRes = await fetch(`${SEARCH_URL}${searchQuery}`)
    let searchData = await searchRes.json()
    let {results} = searchData
    return results
}

const showPopular = async () => {
    let data = await getPopular()
    data.forEach(movie => {
        let {title, overview, poster_path, vote_average} = movie
        movieCard.getElementById('movieTitle').textContent = title
        movieCard.getElementById('thumbnail').setAttribute('src', `${IMG_PATH}${poster_path}`)
        movieCard.getElementById('overviewP').textContent= overview
        movieCard.querySelector('span').textContent = vote_average
        let cardClone = movieCard.cloneNode(true)
        fragment.appendChild(cardClone)
    });
    main.appendChild(fragment)
    console.log(data)
}

function ratingColor(votes) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}


//showing popular when home loads
document.addEventListener('DOMContentLoaded', showPopular)



btnSearch.addEventListener('click', async () => {
    let data = await searchMovie()
    data.
    console.log(data)
})


/*
testing the API
axios.get(`${theMovieDbQuery}${apiKey}&query=${searchQuery}`)
.then(res => {
    console.log(`Titulo: ${res.data.results[0].title}`)
    console.log(res.data.results[0].poster_path)
    console.log(res.data.results[0].vote_average)
    console.log(res.data.results[0].id)
    console.log(res.data.results[0].overview)
    console.log(res.data.results[0].release_date)
    console.log(res.data.results[0].genre_ids[0])
    console.log(res.data.results[0])
})
.catch(err => {
    console.log('Error', err)
})
*/
