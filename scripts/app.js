const movieSearchInput = document.getElementById('movieSearchInput')
let searchQuery = movieSearchInput.value

let theMovieDbQuery = 'https://api.themoviedb.org/3/search/movie?'
let apiKey= 'api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6'
axios.get(`${theMovieDbQuery}${apiKey}&query=${searchQuery}`)
.then(res => {
    console.log(res.data.results[0].title)
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