window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const resetButton = document.querySelector('#reset');
    const playerDisplay = document.querySelector('.display-player');
    const announcerDisplay = document.querySelector('.announcer');

    let currentPlayer = "X";
    let isGameActive = true;

    let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

    let winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function gameLogic(){
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const a = board[winConditions[i][0]];
            const b = board[winConditions[i][1]];
            const c = board[winConditions[i][2]];

            if (a === b && b === c && a !== ' ') {
                isGameActive = false;
                roundWon = true;
                switch(a){
                    case "X":
                        announcer('X');
                        break;
                    case "O":
                        announcer('O');
                        break;
                }
            }
        }

        if (!board.includes(' ') && !roundWon){
            announcer('tie');
        }
    }

    function announcer(result){
        switch(result){
            case "X":
                announcerDisplay.classList.remove('hide');
                announcerDisplay.innerHTML = 'Player <span class="playerX">X</span> won!';
                break;
            
            case "O":
                announcerDisplay.classList.remove('hide');
                announcerDisplay.innerHTML = 'Player <span class="playerO">O</span> won!';
                break;
                
            case "tie":
                announcerDisplay.classList.remove('hide');
                announcerDisplay.innerHTML = 'Tie!';
                break;
        }
    }

    function isValidAction(tile){
        if (tile.innerHTML == "X" || tile.innerHTML == "O"){
            return false;
        }else{
            return true;
        }
    }

    function userAction(tile, index){
        if (isValidAction(tile) && isGameActive) {
            tile.innerHTML = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            board[index] = currentPlayer;
            gameLogic();
            changePlayer();
        }
    }

    function changePlayer(){
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = (currentPlayer === "X") ? "O":"X";
        playerDisplay.innerHTML = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    function resetBoard(){
        tiles.forEach(tile => {
            tile.innerHTML = ' ';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
        board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        isGameActive = true;
        announcerDisplay.classList.add('hide');
        if (currentPlayer = "O") {
            changePlayer();
        }
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', () => resetBoard());
});