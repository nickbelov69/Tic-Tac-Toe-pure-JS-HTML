


const gameBoard = (() => {
    const gameField = new Array(9).fill("");

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function setMark(marker, position) {
        if (gameField[position] === "") {
            gameField[position] = marker;
        }
    }

    function getBoard() {
        return gameField;
    }

    function resetBoard() {
        gameField.fill("");
    }

    function checkWinner(marker) {
        return winningCombinations.some((combination) => {
            return combination.every((index) => gameField[index] === marker);
        });
    }

    return {
        setMark,
        getBoard,
        resetBoard,
        checkWinner
    };
})();


function createPlayer(name, marker) {
    return {
        name,
        marker
    };
}

const displayController = (() => {
    const gameField = document.getElementById("game-field");

    function renderBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");

            cell.dataset.index = i;

            cell.addEventListener("click", () => {
                const position = cell.dataset.index;
                gameController.playRound(position);
            });

            gameField.appendChild(cell);
        }
    }

    return {
        renderBoard
    };
})();


const gameController = (() => {
    const player1 = createPlayer("first", "O");
    const player2 = createPlayer("second", "X");

    let currentPlayer = player1;


    function playRound(position) {
        if (gameBoard.getBoard()[position] !== "") {
            console.log("This cell is already taken.");
            return;
        }

        gameBoard.setMark(currentPlayer.marker, position);

        if (gameBoard.checkWinner(currentPlayer.marker)) {
            console.log(`${currentPlayer.name} wins!`);
            return;
        }

        if (gameBoard.getBoard().every((cell) => cell !== "")) {
            console.log("It's a tie!");
            return;
        }

        currentPlayer = currentPlayer === player1
            ? player2
            : player1;
    }

    function resetGame() {
        gameBoard.resetBoard();
        currentPlayer = player1;
    }

    return {
        playRound,
        resetGame
    };
})();

