
const player = (name, turn, token) => {
    return {name, turn, token}
}

const gameBoard = (() => {
    let board = new Array(9)

    return {board}
})()

const displayController = () => {


    let btn = document.querySelector("#set-name")
    let playersNames = []


    const aux = () => {
        let player1 = document.querySelector("#player1").value 
        let player2 = document.querySelector("#player2").value

        playersNames.push(player1,player2)
    } 
    aux()

    btn.addEventListener('click', aux)



    let playerOne = player("Player 1", true, "X")
    let playerTwo = player("Player 2", false, "O") 
    let currentToken = "X"
    // troca  o player
    const togglePlayer = (position) => {

        if (gameBoard.board[position] === undefined){ // não permite colocar o token em espaços não vazios
            if (playerOne.turn === true){
                gameBoard.board[position] = playerOne.token
                playerOne.turn = false
                playerTwo.turn = true
                currentToken = "O"
            } else {
                gameBoard.board[position] = playerTwo.token
                playerOne.turn = true
                playerTwo.turn = false
                currentToken = "X"
            }
        }

        // troquei o codigo abaixo pela versao acima pois parecia mais direto

        /* if (playerOne.turn === true){
            if(gameBoard.board[position] === undefined){
                    gameBoard.board[position] = playerOne.token
                    playerOne.turn = false
                    playerTwo.turn = true
            } else return
            
        } else {
            if (gameBoard.board[position] === undefined) {
                gameBoard.board[position] = playerTwo.token
                playerOne.turn = true
                playerTwo.turn = false
            }
        } */
    }

    let count = 0
    // adiciona o token na array e na tela a partir da posição do click 
    const allCells = document.querySelectorAll("td")

    const setValueInArray = (event) => {
        let selected = event.target
        let position = selected.dataset.id
    
        togglePlayer(position)

        // add na tela
        // impede que crie mais de um token no espaço de texto
        if (selected.innerHTML === `${playerOne.token}` || selected.innerHTML === `${playerTwo.token}`){
            return
        } else {

            let cell = document.querySelector(`[data-id="${position}"]`)
            cell.appendChild(document.createTextNode(gameBoard.board[position]))
        }
        
        
        setWinner()
        showTurn()
        console.log(count)
        return count = 1 + count
    }
   
    allCells.forEach( item => {
        item.addEventListener('click', setValueInArray)
    })


    // o primeiro setWinner que criei e tive que desistir pq nao consegui criar a condição de empate utilizando ele
    /* const setWinner = (a, b, c) => {
        if (
            gameBoard.board[a] === gameBoard.board[b] && 
            gameBoard.board[b] === gameBoard.board[c] && 
            gameBoard.board[c] !== undefined
        ) {
            if(gameBoard.board[c] === playerOne.token) {
                return window.alert(`${ playersNames[playersNames.length - 2] || playerOne.name} won`)
            }else {
                return window.alert( playersNames[playersNames.length - 1] || playerTwo.name +" won")
            }
        } 
    } */



    const conditionalToWin = (a,b,c) => {
        return  gameBoard.board[a] === gameBoard.board[b] && 
                gameBoard.board[b] === gameBoard.board[c] && 
                gameBoard.board[c] !== undefined
    }


    const setWinner = () => {
        if (
        conditionalToWin(0,1,2) === true ||
        conditionalToWin(3,4,5) === true ||
        conditionalToWin(6,7,8) === true ||
        conditionalToWin(0,3,6) === true ||
        conditionalToWin(1,4,7) === true ||
        conditionalToWin(2,5,8) === true ||
        conditionalToWin(0,4,8) === true ||
        conditionalToWin(2,4,6) === true 
        )
        {
            if(currentToken !== playerOne.token) {
                writeWinner(`${playersNames[playersNames.length - 2] || playerOne.name} Won!`)
                return modalOnOff()
            }else {
                writeWinner(`${playersNames[playersNames.length - 1] || playerTwo.name} Won!` )
                return modalOnOff()
            }
        } if (count === 8) {
                writeWinner(`It's Tie`)
            return modalOnOff()
        }
        
    }

    const showTurn = () => {
        if (currentToken === playerOne.token){
            document.querySelector("#player2-span")
                .classList
                .remove("blink")

            document.querySelector("#player1-span")
            .classList
            .add("blink")  
        }
        else {
                document.querySelector("#player1-span")
                .classList
                .remove("blink") 

                document.querySelector("#player2-span")
                .classList
                .add("blink")  
            }
    }
    showTurn()

    


    const writeWinner = (string) => {
        let winerName = document.createElement('h1')
        winerName.appendChild(document.createTextNode(string))

        let div_Winner = document.querySelector("#winner")
        div_Winner.appendChild(winerName)
    }

    const modalOnOff = () => {
        let modal = document.querySelector("#modal")

        modal.classList.toggle("hide")
    }


    const restart_button = document.querySelector("#restart-button")

    const restart = () => {
        playerOne.name = "Player 1"
        playerTwo.name = "Player 2"
        playerTwo.turn = "False"
        playerOne.turn = "True"
        modalOnOff()
        count = 0
        document.querySelector("h1").remove()
        currentToken = "X"
        for (let cell of allCells){
            cell.innerHTML = ""
        }
        togglePlayer()
        showTurn()
        gameBoard.board = new Array(9)
    }

    restart_button.addEventListener("click", restart)
    
    return {
        aux, togglePlayer, setValueInArray, modalOnOff
    }
}

displayController()


