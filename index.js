// Confirm connection to API
// Add ability to search accross all games
// Add game to library
// Perform a search of all games in library
// Store library games in local strorage
// Store details for all games in local storage as objects possibly.

// =======================
// Initial test to connect
// =======================
// API Key 32f1048b83b24a148bc856092d67acae

// Universal search variables
const apiKey = '32f1048b83b24a148bc856092d67acae'
const url = `https://api.rawg.io/api/games?key=${apiKey}`

// Event Listeners
document.querySelector('.game-lookup-button').addEventListener('click', searchForGame)

// add data to library
// on return of data, create cards for each game, with image, title
// store each individual game's data in an array of objects
// on click of a card, add data to local storage to include in search

// game save variables
// save game results to temporary array
let gameResults = []

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
    })
    .catch(err => console.log(`Error: ${err}`))
}