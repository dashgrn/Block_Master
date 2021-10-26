const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6&query='
const POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6&language=en-US`
const WORST = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6&page=1&vote_count.gte=1000&language=en-US`
const BEST = `http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6&page=1&vote_count.gte=20000&language=en-US`

const movieCard = document.getElementById('movieCard-template').content
const fragment = document.createDocumentFragment()
const main = document.getElementById('main')
const btnSearch = document.getElementById('btnSearch')
const mostValued = document.getElementById('mostValued')
const lessValued = document.getElementById('lessValued')
const popularTab = document.getElementById('popular')
const spinner = document.getElementById('spinner')

let page = 2 //default page from response +1
//GET /pupular movies for homepage
const getPopular = async () => {
    let popularRes = await fetch(POPULAR)
    let popularData = await popularRes.json()
    let { results } = popularData
    return results
}

//GET / most valued fnct
const getMostValued = async () => {
    let mostValuedRes = await fetch(BEST)
    let mostValuedData = await mostValuedRes.json()
    let { results } = mostValuedData
    return results
}

//GET / less valued fnct
const getLessValued = async () => {
    let lessValuedRes = await fetch(WORST)
    let lessValuedData = await lessValuedRes.json()
    let { results } = lessValuedData
    return results
}

//GET search query
const searchMovie = async (query) => {
    let searchRes = await fetch(`${SEARCH_URL}${query}`)
    let searchData = await searchRes.json()
    let { results } = searchData
    return results
}

const showPopular = async () => {
    //cleaning search input
    document.getElementById('movieSearchInput').value = ''
    //responsive navbar -->
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
    //responsive navbar -->

    //applying classes to the active TAB.
    popularTab.classList.add('active')
    mostValued.classList.remove('active')
    lessValued.classList.remove('active')

    let data = await getPopular()
    data.forEach(movie => {
        let { title, overview, poster_path, vote_average } = movie
        movieCard.getElementById('movieTitle').textContent = title
        movieCard.getElementById('thumbnail').setAttribute('src', `${IMG_PATH}${poster_path}`)
        movieCard.getElementById('overviewP').textContent = overview
        movieCard.querySelector('span').textContent = vote_average
        let cardClone = movieCard.cloneNode(true)
        fragment.appendChild(cardClone)
    });
    main.appendChild(fragment)
    console.log(data)
}


//showing popular when home loads
document.addEventListener('DOMContentLoaded', showPopular)



btnSearch.addEventListener('click', async (e) => {
    e.preventDefault()
    let searchQuery = document.getElementById('movieSearchInput').value
    let data = await searchMovie(searchQuery)

    //removing classes from tabs
    popularTab.classList.remove('active')
    mostValued.classList.remove('active')
    lessValued.classList.remove('active')

    data.forEach(movie => {
        let { title, overview, poster_path, vote_average } = movie
        movieCard.getElementById('movieTitle').textContent = title
        noPoster(poster_path)
        movieCard.getElementById('overviewP').textContent = overview
        movieCard.querySelector('span').textContent = vote_average
        let cardClone = movieCard.cloneNode(true)
        fragment.appendChild(cardClone)
    })
    main.innerHTML = ''
    main.appendChild(fragment)
    //cleaning search input
    document.getElementById('movieSearchInput').value = ''
    console.log(data)
})




mostValued.addEventListener('click', async () => {
    let mostValuedData = await getMostValued()
    mostValuedData.forEach(movie => {
        let { title, overview, poster_path, vote_average } = movie
        noPoster(poster_path)
        movieCard.getElementById('overviewP').textContent = overview
        movieCard.querySelector('span').textContent = vote_average
        let cardClone = movieCard.cloneNode(true)
        fragment.appendChild(cardClone)
    })
    //applying classes to the active TAB.
    popularTab.classList.remove('active')
    mostValued.classList.add('active')
    lessValued.classList.remove('active')
    main.innerHTML = ''
    main.appendChild(fragment)

    document.getElementById('movieSearchInput').value = ''
    console.log(mostValuedData)
})


lessValued.addEventListener('click', async () => {
    let lessValuedData = await getLessValued()
    lessValuedData.forEach(movie => {
        let { title, overview, poster_path, vote_average } = movie
        noPoster(poster_path)
        movieCard.getElementById('overviewP').textContent = overview
        movieCard.querySelector('span').textContent = vote_average
        let cardClone = movieCard.cloneNode(true)
        fragment.appendChild(cardClone)
    })
    //applying classes to the active TAB.
    popularTab.classList.remove('active')
    mostValued.classList.remove('active')
    lessValued.classList.add('active')
    main.innerHTML = ''
    main.appendChild(fragment)

    document.getElementById('movieSearchInput').value = ''
    console.log(lessValuedData)
})


//helper fnct (coloring via ratings)
function ratingColor(votes) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

//helper function -> no poster img
function noPoster(poster_path) {
    if (poster_path === null) {
        return movieCard.getElementById('thumbnail').setAttribute('src', `./img/movie-roll.svg`)
    } else {
        return movieCard.getElementById('thumbnail').setAttribute('src', `${IMG_PATH}${poster_path}`)
    }
}

//Helper fnct -> infinite scroll
const getPopularScroll = async () => {
    showLoader()
    let popularRes = await fetch(`${POPULAR}&page=${page}`)
    let popularData = await popularRes.json()
    let { results } = popularData
    page = popularData.page +1
    console.log(popularData.page)
    hideLoader()
    return results
}

const showPopularScroll = async () => {
    let data = await getPopularScroll()
    data.forEach(movie => {
        let { title, overview, poster_path, vote_average } = movie
        movieCard.getElementById('movieTitle').textContent = title
        movieCard.getElementById('thumbnail').setAttribute('src', `${IMG_PATH}${poster_path}`)
        movieCard.getElementById('overviewP').textContent = overview
        movieCard.querySelector('span').textContent = vote_average
        let cardClone = movieCard.cloneNode(true)
        fragment.appendChild(cardClone)
    });
    main.appendChild(fragment)
    console.log(data)
}

// event listener for SCROLL
window.addEventListener('scroll', () => {
    
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 10) {
        showPopularScroll()
    }
    console.log(page)
    // page = page+1
})

//show and hide loader
const hideLoader = () => {
    spinner.classList.remove('show')
}
const showLoader = () => {
    spinner.classList.add('show')
}
