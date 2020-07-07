const computerPlay = () => {
    let options = ["Rock", "Paper", "Scissors"]
    return options[Math.floor(Math.random() * 3)]
}

function playRound(playerSelection, computerSelection) {
	if (playerSelection.toUpperCase() === computerSelection.toUpperCase()){
        return "Its Tie"
    } 
    else {

        
        if (playerSelection.toUpperCase() === "ROCK") {
            if (computerSelection.toUpperCase() === "SCISSORS") { // condicão em que eu ganho
                return "You Win! \nRock beat Scissors"
            }
            else {                                  // condição em que perco
                return "You Lose! \nPaper beat Rock"
            }
        }


        if (playerSelection.toUpperCase() === "SCISSORS") {
            if (computerSelection.toUpperCase() === "ROCK") {
                return "You Lose! \nRock beat Scissors"
            }
            else {
                return "You Win! \nScissors beat Paper"
            }
        }


        if (playerSelection.toUpperCase() === "PAPER") {
            if (computerSelection.toUpperCase() === "ROCK") {
                return "You Lose! \nPaper beat Rock"
            }
            else {
                return "You Win! \nScissors beat Paper"
            }
        }


    }
}


 


const game = () => {
    for (let i = 0; i < 5; i++){
        const playerSelection = "ROck"
        const computerSelection = computerPlay()
        console.log(playRound(playerSelection, computerSelection))
    }
}

game()