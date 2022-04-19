// Universal search variables
const apiKey = '32f1048b83b24a148bc856092d67acae'
const url = `https://api.rawg.io/api/games?key=${apiKey}`

// Event Listeners
document.querySelector('.game-lookup-button').addEventListener('click', searchForGame)

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