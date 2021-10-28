const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6&query='
const POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6`
const WORST = `https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.asc&api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6&page=1&vote_count.gte=1000&language=en-US`
const BEST = `http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6&page=1&vote_count.gte=20000&language=en-US`
const DETAILS1 = 'https://api.themoviedb.org/3/movie/'
const DETAILS2 = '?api_key=ac7020f4cf002f4c5f7b6d87ae76e0e6&append_to_response=videos'
const YOUTUBE = 'https://www.youtube.com/embed/'

const movieCard = document.getElementById('movieCard-template').content
const fragment = document.createDocumentFragment()
const main = document.getElementById('main')
const btnSearch = document.getElementById('btnSearch')
const mostValued = document.getElementById('mostValued')
const lessValued = document.getElementById('lessValued')
const popularTab = document.getElementById('popular')
const spinner = document.getElementById('spinner')
const bkgClose = document.getElementById('bkgClose')
const modalToClose = document.getElementById('modalToClose')
const modalCloseBtn = document.getElementById('modalCloseBtn')
const modalTitle = document.getElementById('modalTitle')
const modalOverview = document.getElementById('modalOverview')
const length = document.getElementById('length')
const modalImg = document.getElementById('modalImg')
const releaseDate = document.getElementById('releaseDate')
const genereSpan = document.getElementById('genereSpan')
const trailerCont = document.getElementById('trailerCont')
const trailerFrame = document.getElementById('trailerFrame')
const btnWatchNow = document.getElementById('btnWatchNow')
const btnWatchLater = document.getElementById('btnWatchLater')
const score = document.getElementById('score')



//variable that keeps the whole record of responses.
let responseKeeper = []

let page = 2 //default page from response +1

let antiScroll = false

//GET /pupular movies for homepage
const getPopular = async () => {
    let popularRes = await fetch(POPULAR)
    let popularData = await popularRes.json()
    let { results } = popularData
    responseKeeper.push(...results)
    console.log(responseKeeper)
    return results
}

//GET / most valued fnct
const getMostValued = async () => {
    let mostValuedRes = await fetch(BEST)
    let mostValuedData = await mostValuedRes.json()
    let { results } = mostValuedData
    responseKeeper.push(...results)
    return results
}

//GET / less valued fnct
const getLessValued = async () => {
    let lessValuedRes = await fetch(WORST)
    let lessValuedData = await lessValuedRes.json()
    let { results } = lessValuedData
    responseKeeper.push(...results)
    return results
}

//GET search query
const searchMovie = async (query) => {
    let searchRes = await fetch(`${SEARCH_URL}${query}`)
    let searchData = await searchRes.json()
    let { results } = searchData
    responseKeeper.push(...results)
    return results
}

//GET Details and Video (used in modal)
const getDetails = async (movieId) => {
    let queryId = movieId
    let detailsRes = await fetch(`${DETAILS1}${queryId}${DETAILS2}`)
    let detailsData = await detailsRes.json()
    return detailsData
}

const showPopular = async () => {
    //cleaning search input
    antiScroll = false
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
        let { title, overview, poster_path, vote_average, id } = movie
        movieCard.getElementById('movieTitle').textContent = title
        movieCard.getElementById('thumbnail').setAttribute('src', `${IMG_PATH}${poster_path}`)
        movieCard.getElementById('overviewP').textContent = overview
        movieCard.querySelector('span').classList.remove('orange', 'green', 'red')
        let spanColor = ratingColor(vote_average)
        movieCard.querySelector('span').classList.add(`${spanColor}`)
        movieCard.querySelector('span').textContent = vote_average
        movieCard.getElementById('idCont').setAttribute('uuid', `${id}`)
        let cardClone = movieCard.cloneNode(true)
        fragment.appendChild(cardClone)
    });
    main.appendChild(fragment)
    // console.log(data)
}


//showing popular when home loads
document.addEventListener('DOMContentLoaded', showPopular)



btnSearch.addEventListener('click', async (e) => {
    e.preventDefault()
    antiScroll = true
    let searchQuery = document.getElementById('movieSearchInput').value
    let data = await searchMovie(searchQuery)

    //removing classes from tabs
    popularTab.classList.remove('active')
    mostValued.classList.remove('active')
    lessValued.classList.remove('active')

    data.forEach(movie => {
        let { title, overview, poster_path, vote_average, id } = movie
        movieCard.getElementById('movieTitle').textContent = title
        noPoster(poster_path)
        movieCard.getElementById('overviewP').textContent = overview
        movieCard.querySelector('span').classList.remove('orange', 'green', 'red')
        let spanColor = ratingColor(vote_average)
        console.log(spanColor)
        movieCard.querySelector('span').classList.add(`${spanColor}`)
        movieCard.querySelector('span').textContent = vote_average
        movieCard.getElementById('idCont').setAttribute('uuid', `${id}`)
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
    antiScroll = false
    let mostValuedData = await getMostValued()
    mostValuedData.forEach(movie => {
        let { title, overview, poster_path, vote_average, id } = movie
        noPoster(poster_path)
        movieCard.getElementById('movieTitle').textContent = title
        movieCard.getElementById('overviewP').textContent = overview
        movieCard.querySelector('span').classList.remove('orange', 'green', 'red')
        let spanColor = ratingColor(vote_average)
        console.log(spanColor)
        movieCard.querySelector('span').classList.add(`${spanColor}`)
        movieCard.querySelector('span').textContent = vote_average
        movieCard.getElementById('idCont').setAttribute('uuid', `${id}`)
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
    antiScroll = false
    let lessValuedData = await getLessValued()
    lessValuedData.forEach(movie => {
        let { title, overview, poster_path, vote_average, id } = movie
        noPoster(poster_path)
        movieCard.getElementById('movieTitle').textContent = title
        movieCard.getElementById('overviewP').textContent = overview
        movieCard.querySelector('span').classList.remove('orange', 'green', 'red')
        let spanColor = ratingColor(vote_average)
        console.log(spanColor)
        movieCard.querySelector('span').classList.add(`${spanColor}`)
        movieCard.querySelector('span').textContent = vote_average
        movieCard.getElementById('idCont').setAttribute('uuid', `${id}`)
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
function ratingColor(vote_average) {
    if (vote_average >= 8) {
        return 'green'
    } else if (vote_average >= 5) {
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
    responseKeeper.push(...results)
    page = popularData.page + 1
    console.log(popularData.page)
    hideLoader()
    return results
}

const showPopularScroll = async () => {
    let data = await getPopularScroll()
    data.forEach(movie => {
        let { title, overview, poster_path, vote_average, id } = movie
        movieCard.getElementById('movieTitle').textContent = title
        movieCard.getElementById('thumbnail').setAttribute('src', `${IMG_PATH}${poster_path}`)
        movieCard.getElementById('overviewP').textContent = overview
        movieCard.querySelector('span').classList.remove('orange', 'green', 'red')
        let spanColor = ratingColor(vote_average)
        console.log(spanColor)
        movieCard.querySelector('span').classList.add(`${spanColor}`)
        movieCard.querySelector('span').textContent = vote_average
        movieCard.getElementById('idCont').setAttribute('uuid', `${id}`)
        let cardClone = movieCard.cloneNode(true)
        fragment.appendChild(cardClone)
    });
    main.appendChild(fragment)
    console.log(data)
}

// event listener for SCROLL
window.addEventListener('scroll', () => {
    if (antiScroll === true) {
        return
    } else {
        if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 10) {
            showPopularScroll()
        }
        console.log(page)
        // page = page+1
    }
    
})

//show and hide loader
const hideLoader = () => {
    spinner.classList.remove('show')
}
const showLoader = () => {
    spinner.classList.add('show')
}

//CREATING MODAL
async function getId(btn) {
    let innerData = btn
    const modalContainer = document.createElement('div')
    //change values from card template code block
    const detailsData = responseKeeper.find(movie => movie.id == btn.attributes.uuid.value)
    let { title, overview, release_date, poster_path, id } = detailsData
    let detailsDataApi = await getDetails(id)
    let { runtime, genres, videos } = detailsDataApi
    let videoKey = videos.results[0].key
    console.log(`video key ${videoKey}`)
    console.log(detailsDataApi)
    const generesArr = []
    genres.forEach((genre) => {
        if (genre.name) {
            generesArr.push(genre.name)
        }
    })
    generesArr.toString()
    genereSpan.textContent = generesArr
    modalTitle.textContent = title
    modalOverview.textContent = overview
    releaseDate.textContent = release_date
    length.textContent = runtime
    modalImg.setAttribute('src', `${IMG_PATH + poster_path}`)

    //creating the video frame, listening for btn
    btnWatchNow.addEventListener('click', () => {
        console.log(`video key ${videoKey}`)
        trailerFrame.setAttribute('src', `${YOUTUBE}${videoKey}`)
        
        trailerCont.classList.remove('is-hidden')
    })

    modalToClose.appendChild(modalContainer)
    modalToClose.classList.add('is-active')
    if (modalToClose.classList.length > 1) {
        const modalCloseBtn = document.getElementById('modalCloseBtn')
        modalCloseBtn.addEventListener('click', function () {
            trailerCont.classList.add('is-hidden')
            trailerFrame.setAttribute('src', '') //cleaning src so video stops
            modalToClose.classList.remove('is-active')
            modalToClose.lastChild.remove()
            console.log('cerrar modal ended')
        })
    }
}

bkgClose.addEventListener('click', function () {
    modalToClose.classList.remove('is-active')
    modalToClose.lastChild.remove()
    trailerCont.classList.toggle('is-hidden')
    trailerFrame.setAttribute('src', '') //cleaning src so video stops
    console.log('cerrar modal ended')
})