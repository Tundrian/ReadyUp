// ==========================
// Variables
// ==========================

// save game results to temporary array
let gameResults = []

// Universal search variables
const apiKey = '32f1048b83b24a148bc856092d67acae'
const url = `https://api.rawg.io/api/games?key=${apiKey}`

// ==========================
// Event Listeners
// ==========================

// API Lookups
document.querySelector('.game-lookup-button').addEventListener('click', searchForGame)

// Navigation Drawer
document.querySelector('.nav-close').addEventListener('click', navClose)
document.querySelector('.nav-icon').addEventListener('click', navClose)
let navs = document.querySelectorAll('.nav-link')
navs.forEach(nav => nav.addEventListener("click", highlightMenuNav))
document.querySelector('.nav-library').addEventListener('click', showLibrary)

// ==========================
// Initializations
// ==========================
let platforms
if(localStorage.getItem('platforms')){
    platforms = JSON.parse(localStorage.getItem('platforms'))
    populatePlatformDropdown()
}else{
    getPlatforms()
}

// ==========================
// Functions
// ==========================


// API Functions
// Get Platforms
async function getPlatforms(){
    // Validate that this is working on initial load as well, not just with localStorage after refresh
    console.log('getPlatforms()')
    try {
        const response = await fetch(`https://api.rawg.io/api/platforms?key=${apiKey}`)
        if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`)
        }
        const data = await response.json()
        localStorage.setItem("platforms", JSON.stringify(data.results.map(x => 
            { return {
                'id': x.id, 
                'name': x.name, 
                'slug': x.slug, 
                'image': x.image_background
                }
            }))
        )
        platforms = await JSON.parse(localStorage.getItem('platforms'))
        populatePlatformDropdown()
        //return await JSON.parse(localStorage.getItem('platforms'))
    }
    catch(error) {
        console.error(`Could not get platforms: ${error}`)
    }
}

// Search Games
async function searchForGame(){

    const criteria = document.querySelector('.game-lookup-input').value || false
    const platform = document.querySelector('#search-consoles').value
    if(!criteria){
        console.log('no game selected')
        return
    }
    try {
        const response = await fetch(`${url}&search=${criteria}&platforms=${platform}`)
        if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`)
        }
        const data = await response.json()
        gameResults = await data.results.slice()
        localStorage.setItem('games', JSON.stringify(gameResults))
        populateGameResults()
    }
    catch(error) {
        console.error(`Could not get platforms: ${error}`)
    }
    
}

function populateGameResults(){
    gameResults.forEach(game => {
        // Create elements
        const li = document.createElement('li')
        const title = document.createElement('h3')
        //const description = document.createElement('p')
        const console = document.createElement('p')
        const bg = document.createElement('img')
        //const mpInfo = document.createElement('h4')
        const addBtn = document.createElement('button')
        const gameId = document.createElement('p')
        title.innerText = game.name
        console.innerText = document.querySelector('#search-consoles').value
        bg.src = game.background_image
        addBtn.innerText = 'Add To Library'
        addBtn.classList.add('btn', 'addGame')
        gameId.classList.add('gameId', 'hidden')
        gameId.innerText = game.id
        // Append to List
        li.appendChild(title)
        //li.appendChild(description)
        li.appendChild(console)
        li.appendChild(bg)
        //li.appendChild(mpInfo)
        li.appendChild(addBtn)
        li.appendChild(gameId)
        // Append to DOM
        document.querySelector('.game-lookup-list').appendChild(li)
    })

    addButtonEventListeners()
}

function addButtonEventListeners(){
    const btns = document.querySelectorAll('.addGame')
    btns.forEach(x => x.addEventListener('click', addToLibrary))
}

function populatePlatformDropdown() {
    platforms.forEach(platform => {
        let option = document.createElement('option')
        option.value = platform.id
        option.innerText = platform.name
        document.querySelector('#search-consoles').appendChild(option)
    })
}

// Utility Functions
function navClose() {
    document.querySelector('.nav').classList.toggle('hidden')
    document.querySelector('.nav-icon').classList.toggle('hidden')
}

function highlightMenuNav(e){
    if(e.target.classList.contains('activeLink')){
        return
    }

    let navs = document.querySelectorAll('.nav-link')
    navs.forEach(nav => nav.classList.toggle('activeLink'))
    toggleHidden()

    if(e.target.innerText.toUpperCase() === 'SEARCH'){
        document.querySelector('.search').classList.toggle('hidden')
        document.querySelector('.search-results').classList.toggle('hidden')
    } else if(e.target.innerText.toUpperCase() === 'MY LIBRARY'){
        document.querySelector('.library').classList.toggle('hidden')
    }

}

function toggleHidden() {
    let sections = [
        document.querySelector('.search'),
        document.querySelector('.search-results'),
        document.querySelector('.library')]
    sections.forEach(section => section.classList.add('hidden'))
}

function addToLibrary(e){
    let info = e.target.parentElement.children
    let gameObject = {}
    gameObject['name'] = info[0].innerText
    gameObject['id'] = info[4].innerText
    gameObject['image'] = info[2].src
    gameObject['platform'] = document.querySelector('#search-consoles').value
    console.log(JSON.parse(localStorage.getItem('myGames')))
    let result = JSON.parse(localStorage.getItem('myGames') || '[]')
    result.push(gameObject)
    localStorage.setItem('myGames', JSON.stringify(result))
}


function showLibrary(){
    const myGames = JSON.parse(localStorage.getItem('myGames') || [])
    const parent = document.querySelector('.library-gameList')
    const platforms = JSON.parse(localStorage.getItem('platforms'))
    myGames.forEach(x => {
        const li = document.createElement('li')
        const title = document.createElement('h3')
        const console = document.createElement('p')
        const img = document.createElement('img')

        li.classList.add('game-card')
        title.innerText = x.name
        console.innerText = platforms.filter(y => y.id === x.id).name
        img.src = x.image

        li.appendChild(title)
        li.appendChild(console)
        li.appendChild(img)

        parent.appendChild(li)

    })
}