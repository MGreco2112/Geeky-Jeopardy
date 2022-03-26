// local storage demo



let gameData

if (localStorage[`Game_Data`] != undefined) {
    gameData = JSON.parse(localStorage[`Game_Data`])
} else {
    gameData = {gameOver: 0}
}

const points = {
    easy: 100,
    medium: 200,
    hard: 300
}

let totalPlayers = 0

let activePlayer = 0

let gameOver = 0


window.onload = function buttons() {

    
    const mainDiv = document.createElement('div')
    mainDiv.id = 'maindiv'
    document.body.appendChild(mainDiv)

    
    
    
    
        
    const player1 = document.createElement('button')
    const player2 = document.createElement('button')
    const player1Name = document.createElement('p')
    const player2Name = document.createElement('p')
    const h2 = document.createElement('h2')

    player1.id = 'player1'
    player2.id = 'player2'
    h2.id = 'h2'

    player1.innerText = 'Create Player 1'
    player2.innerText = 'Create Player 2'
    h2.innerText = 'Choose Your Players!'

    player1.onclick = () => {
        const name = prompt(`Enter Your Name`)
        if (name != null) {
            gameData.player1 = {}
            gameData.player1.name = name
            gameData.player1.score = 0
            player1Name.innerText = `${name} is Player 1`
        }
        if (localStorage['Game_Data'] == undefined) {
            localStorage.setItem('Game_Data', JSON.stringify(gameData))
        } else {
            localStorage.removeItem('Game_Data')
            localStorage.setItem('Game_Data',JSON.stringify(gameData))
        }
        if (name != '' && name != null) {
            newGame()
            startGame()
            player1.remove()

            console.log(localStorage);
        }

    }

    player2.onclick = () => {
        const name = prompt(`Enter Your Name`)
        if (name != null) {
            gameData.player2 = {}
            gameData.player2.name = name
            gameData.player2.score = 0
            player2Name.innerText = `${name} is Player 2`
        }
        if (localStorage['Game_Data'] == undefined) {
            localStorage.setItem('Game_Data', JSON.stringify(gameData))
        } else {
            localStorage.removeItem('Game_Data')
            localStorage.setItem('Game_Data',JSON.stringify(gameData))
        }
        if (name != '' && name != null) {
            newGame()
            startGame()
            player2.remove()

            console.log(localStorage);
        }
    }
    
    
    
    mainDiv.appendChild(h2)
    mainDiv.appendChild(player1Name)
    mainDiv.appendChild(player2Name)



    if (localStorage.Game_Data == undefined || JSON.parse(localStorage.Game_Data).player1 == undefined || JSON.parse(localStorage.Game_Data).player1.name == null) {
        mainDiv.appendChild(player1)
    } else {
        newGame()
        startGame()
    }

    if (localStorage.Game_Data == undefined || JSON.parse(localStorage.Game_Data).player2 == undefined || JSON.parse(localStorage.Game_Data).player2.name == null) {
        mainDiv.appendChild(player2)
    } else {
        newGame()
        startGame()
    }
    
    function newGame () {
        if (document.getElementById('newgame') != null) {
            document.getElementById('newgame').remove()
        }
        const newGame = document.createElement('button')

        newGame.id = 'newgame'
        newGame.innerText = `Restart?`

        newGame.onclick = function () {
            const choice = prompt(`Are you sure you want to start a New Game?\nThis will remove all saved data\n[Y]es or [N]o`)

            if (choice === 'y' || choice === "Y") {
                gameData = {gameOver: 0}
                localStorage.removeItem('Game_Data')
                mainDiv.remove()
                buttons()
            } else if (choice === 'n' || choice === 'N' || choice === null) {
                alert(`The Game Continues!!!!`)
            }
        }

        mainDiv.appendChild(newGame)
    
    }

    function startGame() {
        if (document.getElementById('startgame') != null) {
            document.getElementById('startgame').remove()
        }

        const startGame = document.createElement('button')

        startGame.id = 'startgame'

        startGame.innerText = 'Start Game!'

        startGame.onclick = function xml() {
            const xhr = new XMLHttpRequest()

            const url = 'https://opentdb.com/api.php?amount=18'

            xhr.open(`GET`, url)

            xhr.onload = function() {
                console.log(JSON.parse(xhr.responseText).results);

                const gameDiv = document.createElement('div')

                gameDiv.id = 'gamediv'

                const access = JSON.parse(xhr.responseText).results


                for (let i = 0; i < access.length; i++) {

                    const category = document.createElement('button')
                    

                    category.innerText = access[i].category
                    category.onclick = function() {
                        const answers = []
                        for (let j = 0; j < access[i].incorrect_answers.length; j++) {
                            answers.push(access[i].incorrect_answers[j])
                        }
                        answers.push(deCode(access[i].correct_answer))
                        answers.sort()
                        const pAnswers = []

                        for (let j = 0; j < answers.length; j++) {
                            const newAnswer = deCode(answers[j])
                            pAnswers.push(newAnswer)

                        }

                        const pQuestion = deCode(access[i].question)
                        const answer = prompt(`${pQuestion}\n\n${pAnswers}`)

                        if (answer.toLowerCase() == deCode(access[i].correct_answer).toLowerCase()) {
                            alert(`${answer} Is Correct!!\n${access.length - (gameData.gameOver + 1)} Questions Remain`)
                            Object.keys(points).forEach(key => {
                                if (key == access[i].difficulty) {
                                    
                                    if (document.getElementById('activebanner').value == gameData.player1.name) {
                                        gameData.player1.score += points[key]
                                    } else {
                                        gameData.player2.score += points[key]
                                    }
                                    gameData.gameOver++

                                    localStorage.removeItem(`Game_Data`)
                                    localStorage.setItem(`Game_Data`,JSON.stringify(gameData))
                                }
                            })
                            console.log(JSON.parse(localStorage[`Game_Data`])); 
                            activePlayer++
                            endOfGame()
                            activePlayerBanner()


                                
                        } else {
                            alert(`Incorrect!!\n${deCode(access[i].correct_answer)} is the Answer\n${access.length - (gameData.gameOver + 1)} Questions Remain`)
                            Object.keys(points).forEach(key => {
                                if (key == access[i].difficulty) {
                                    
                                    if (document.getElementById('activebanner').value == gameData.player1.name) {
                                        gameData.player1.score -= points[key]
                                    } else {
                                        gameData.player2.score -= points[key]
                                    }
                                    gameData.gameOver++

                                    localStorage.removeItem(`Game_Data`)
                                    localStorage.setItem(`Game_Data`,JSON.stringify(gameData))
                                }
                            }) 
                            console.log(JSON.parse(localStorage[`Game_Data`]));
                            activePlayer++
                            endOfGame()
                            activePlayerBanner()


                        }
                        this.remove()
                    }

                    


                    gameDiv.appendChild(category)
                }

                activePlayerBanner()
                

                if (JSON.parse(localStorage[`Game_Data`]).player1 != undefined && JSON.parse(localStorage[`Game_Data`]).player2 != undefined) {
                    totalPlayers = 2
                } else if (JSON.parse(localStorage[`Game_Data`]).player1 == undefined || JSON.parse(localStorage[`Game_Data`]).player2 == undefined) {
                    totalPlayers = 1
                }
                    
                
                function activePlayerBanner() {

                    if (document.getElementById('activebanner') != null) {
                        document.getElementById('activebanner').remove()
                    }

                    const activeBanner = document.createElement('p')

                    activeBanner.id = 'activebanner'
                    if (activePlayer >= totalPlayers) {
                        activePlayer = 0
                    }

                    if (activePlayer == 0) {
                        activeBanner.innerText = `${JSON.parse(localStorage[`Game_Data`]).player1.name} is the Active Player\n$${JSON.parse(localStorage[`Game_Data`]).player1.score}`
                        activeBanner.value = JSON.parse(localStorage[`Game_Data`]).player1.name
                    } else {
                        activeBanner.innerText = `${JSON.parse(localStorage[`Game_Data`]).player2.name} is the Active Player\n$${JSON.parse(localStorage[`Game_Data`]).player2.score}`
                        activeBanner.value = JSON.parse(localStorage[`Game_Data`]).player2.name
                    }


                    

                    gameDiv.appendChild(activeBanner)
                }
                
                function endOfGame() {
                    if (gameData.gameOver == 6) {
                        if (gameData.player1 != undefined && gameData.player2 != undefined) {
                            alert(`End of Round 1\n${gameData.player1.name}: $${gameData.player1.score}\n${gameData.player2.name}: $${gameData.player2.score}`)
                        } else {
                            alert(`End of Round 1\n${gameData.player1.name}: $${gameData.player1.score}`)
                        }
                    }else if (gameData.gameOver == 12) {
                        if (gameData.player1 != undefined && gameData.player2 != undefined) {
                            alert(`End of Round 2\n${gameData.player1.name}: $${gameData.player1.score}\n${gameData.player2.name}: $${gameData.player2.score}`)
                        } else {
                            alert(`End of Round 2\n${gameData.player1.name}: $${gameData.player1.score}`)
                        }
                    } else if (gameData.gameOver >= access.length) {
                        document.getElementById('gamediv').remove
                        if (gameData.player1 != undefined && gameData.player2 != undefined) {
                            alert(`Game Over\n${gameData.player1.name} $${gameData.player1.score}\n${gameData.player2.name} $${gameData.player2.score}`)
                            if (gameData.player1.score > gameData.player2.score) {
                                alert(`${gameData.player1.name} is the Winner!`)
                                document.getElementById('newgame').onclick()
                            } else if(gameData.player1.score < gameData.player2.score) {
                                alert(`${gameData.player2.name} is the Winner!`)
                                document.getElementById('newgame').onclick()
                            } else {
                                alert(`Tie Game! Both players have $${gameData.player1.score}`)
                                document.getElementById('newgame').onclick()
                            }

                        } else {
                            alert(`Game Over!\n${gameData.player1.name} Final Score: ${gameData.player1.score}`)
                            document.getElementById('newgame').onclick()
                        }
                    }
                }
                    
                endOfGame()
                mainDiv.appendChild(gameDiv)
            }

            xhr.send()

            document.getElementById('startgame').remove()
        }

        mainDiv.appendChild(startGame)

        

    }
     

}



function deCode(html){
    let decoder = document.createElement("textarea");
    decoder.innerHTML = html;
    return decoder.innerHTML;
}