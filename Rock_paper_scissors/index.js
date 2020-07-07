const computerPlay = () => {
    let options = ["Rock", "Paper", "Scissors"]
    return options[Math.floor(Math.random() * 3)]
}
let computerScore = 0
let playerScore = 0


const div_Display = document.querySelector("#display")

function playRound(playerSelection, computerSelection) {
	if (playerSelection.toUpperCase() === computerSelection.toUpperCase()){
        
        div_Display.innerHTML = ''
        const hElement = document.createElement("h2")
        hElement.appendChild(document.createTextNode("It's Tie"))
        let result = div_Display.appendChild(hElement)
        return result
    } 
    else {

        
        if (playerSelection.toUpperCase() === "ROCK") {
            if (computerSelection.toUpperCase() === "SCISSORS") { // condicão em que eu ganho
                playerScore += 1 
                return displayWinner("Rock", "Scissors", "You Won!")
            }
            else {                                  // condição em que perco
                computerScore += 1
                return displayWinner("Paper", "Rock", "You Lose!")
            }
        }


        if (playerSelection.toUpperCase() === "SCISSORS") {
            if (computerSelection.toUpperCase() === "PAPER") {
                playerScore += 1 
                return displayWinner("Scissors", "Paper", "You Won!")
            }
            else {
                computerScore += 1
                return displayWinner("Rock", "Scissors", "You Lose!")
            }
        }


        if (playerSelection.toUpperCase() === "PAPER") {
            if (computerSelection.toUpperCase() === "ROCK") {
                playerScore += 1 
                return displayWinner("Paper", "Rock", "You Won!")
            }
            else {
                computerScore += 1
                return displayWinner("Scissors", "Paper", "You Lose!")
            }
        }
    }
}

const displayWinner = (winner, loser, result) => {
    div_Display.innerHTML = ''

    const hElement = document.createElement("h2")
    hElement.appendChild(document.createTextNode(result))

    const pElement = document.createElement("p")
    pElement.appendChild(document.createTextNode(winner))
    pElement.appendChild(document.createElement('br'))
    pElement.appendChild(document.createTextNode(' beat '))
    pElement.appendChild(document.createElement('br'))
    pElement.appendChild(document.createTextNode(loser))

    div_Display.appendChild(pElement)
    div_Display.appendChild(hElement)
}

const renderScores = () => {
    const playerSpan = document.getElementById("player")
    const machineSpan = document.getElementById("machine")

    playerSpan.textContent = playerScore
    machineSpan.textContent = computerScore
}
renderScores()

const gameOver = () => {
    if (playerScore + computerScore === 5) {
        div_Display.innerHTML = ''
        const hElement = document.createElement("h2")
        let whoWon = (playerScore > computerScore) ? "YOU WON" : "MACHINE WON"
        hElement.appendChild(document.createTextNode(whoWon))
        div_Display.appendChild(hElement)
        playerScore = 0
        computerScore = 0
        setTimeout( () => {return div_Display.innerHTML=''}, 5000)
        setTimeout (renderScores, 5000)
    }
}

const buttons = document.querySelectorAll("button")

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.getAttribute("id") == "rock") {
            const playerSelection ="rock"
            const computerSelection = computerPlay()
            playRound(playerSelection, computerSelection)
        }
        if (button.getAttribute("id") == "paper") {
            const playerSelection ="paper"
            const computerSelection = computerPlay()
            playRound(playerSelection, computerSelection)
        }
        if (button.getAttribute("id") == "scissors") {
            const playerSelection ="scissors"
            const computerSelection = computerPlay()
            playRound(playerSelection, computerSelection)
        }        
        renderScores()
        gameOver()
    })
} )

