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
// game save variables
// save game results to temporary array
let gameResults = []


// ==========================
// Functions
// ==========================
// API Functions
function searchForGame(){
    const criteria = document.querySelector('.game-lookup-input').value || false

    if(!criteria){
        console.log('no game selected')
        return
    }

    fetch(`${url}&search=${criteria}`
    )
    .then(res => res.json())
    .then(data => {
        console.log(data.results)
        gameResults = data.results.slice()
        console.log(gameResults)
        
        // create html elements to show for each game result
        gameResults.map((x,i) => {
            const li = document.createElement('li')
            li.classList.add(`game-result-${i}`)
            
            const img = document.createElement('img')
            img.src = data.results[i].background_image

            li.appendChild(img)
            document.querySelector('.game-lookup-list').appendChild(li)
        })
    })
    .catch(err => console.log(`Error: ${err}`))
}

// Utility Functions
function navClose() {
    document.querySelector('.nav').classList.toggle('hidden')
    document.querySelector('.nav-icon').classList.toggle('hidden')
}

// Changing underline when clicking navigation links

// Hiding and showing sections based on what is clicked

// Fetching data from API

// Storing data from API to localStorage

