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
        await localStorage.setItem("platforms", JSON.stringify(data.results.map(x => 
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
function searchForGame(){
    if(localStorage.getItem('games')){
        console.log("one")
        console.log(JSON.parse(localStorage.getItem('games')))
    }else {
        const criteria = document.querySelector('.game-lookup-input').value || false
        const platform = document.querySelector('#search-consoles').value
        console.log(platform)
        if(!criteria){
            console.log('no game selected')
            return
        }
    
        fetch(`${url}&search=${criteria}&platforms=${platform}`
        )
        .then(res => res.json())
        .then(data => {
            console.log("two")
            console.log(data.results)
            gameResults = data.results.slice()
            localStorage.setItem('games', JSON.stringify(gameResults))
            // create html elements to show for each game result
            /*gameResults.map((x,i) => {
                const li = document.createElement('li')
                li.classList.add(`game-result-${i}`)
                
                const img = document.createElement('img')
                img.src = data.results[i].background_image
    
                li.appendChild(img)
                document.querySelector('.game-lookup-list').appendChild(li)
            })*/
        })
        .catch(err => console.log(`Error: ${err}`))
        
    }
    
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

    if(e.target.innerText === 'SEARCH'){
        document.querySelector('.search').classList.toggle('hidden')
        //document.querySelector('.search-results').classList.toggle('hidden')
    } else if(e.target.innerText === 'MY LIBRARY'){
        document.querySelector('.library').classList.toggle('hidden')
    }
    
}

function toggleHidden() {
    let sections = [
        document.querySelector('.search'),
        document.querySelector('.search-results'),
        document.querySelector('.library')]
    sections.forEach(section => section.classList.toggle('hidden'))
}

// Fetching data from API

// Storing data from API to localStorage

