


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


const gameController = (() => {
    let gameStarted = false;

    let player1;
    let player2;

    let currentPlayer;

    function startGame () {
        const firstPlayerName = document.getElementById("first-player").value.trim();
        const secondPlayerName = document.getElementById("second-player").value.trim();

        if (firstPlayerName === "" || secondPlayerName === "") {
        displayController.showMessage("ENTER NAMES YOU DUMMY(KINDLY ♥️")
            return
        }
        player1 = createPlayer(firstPlayerName, "O");
        player2 = createPlayer(secondPlayerName, "X");

        currentPlayer = player1;
        gameStarted = true;

        gameBoard.resetBoard()
        displayController.renderBoard()
        displayController.showMessage(`${currentPlayer.name}'s turn`)

    }
    function playRound(position) {
        if (!gameStarted) {
            return
        }
        if (gameBoard.getBoard()[position] !== "") {
            console.log("This cell is already taken.");
            return;
        }

        gameBoard.setMark(currentPlayer.marker, position);

        displayController.renderBoard();

        if (gameBoard.checkWinner(currentPlayer.marker)) {
            displayController.showWinner(currentPlayer.name);
            return;
        }

        if (gameBoard.getBoard().every((cell) => cell !== "")) {
            displayController.showTie()
            return;
        }

        currentPlayer = currentPlayer === player1
            ? player2
            : player1;
        displayController.showMessage(`${currentPlayer.name}'s turn`);
    }

    function resetGame() {
        if (!gameStarted) {
            return;
        }

        gameBoard.resetBoard();
        currentPlayer = player1;
        displayController.renderBoard()
        displayController.showMessage(`${currentPlayer.name}'s turn`);
    }

    return {
        playRound,
        resetGame,
        startGame,
    };
})();

const displayController = (() => {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const gameField = document.getElementById("game-field");
    const gameMessage = document.getElementById("game-message");

    restartButton.addEventListener("click", () => {
        gameController.resetGame();
    })

    startButton.addEventListener("click", () => {
        gameController.startGame();
    })

    function renderBoard() {
        gameField.innerHTML = ""

        const board = gameBoard.getBoard();

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");

            cell.dataset.index = i;
            cell.textContent = board[i]

            if (board[i] === "X") {
                cell.innerHTML = `
        <svg class="mark x" viewBox="0 0 100 100">
            <path d="M 18 18 L 82 82"></path>
            <path d="M 82 18 L 18 82"></path>
        </svg>
    `;
            } else if (board[i] === "O") {
                cell.innerHTML = `
        <svg class="mark o" viewBox="0 0 100 100">
            <path d="
                M 50 10
                C 73 10, 90 27, 90 50
                C 90 73, 73 90, 50 90
                C 27 90, 10 73, 10 50
                C 10 27, 27 10, 50 10
            "></path>
        </svg>
    `;
            }

            cell.addEventListener("click", () => {
                const position = cell.dataset.index;
                gameController.playRound(position);

            });

            gameField.appendChild(cell);
        }
    }

    function showWinner (name) {
        gameMessage.textContent = `We have a winner: ${name}`
    }

    function showTie () {
        gameMessage.textContent = "OOPS IT'S A TIE MUTHERFUCKA"
    }

    function showMessage (message) {
        gameMessage.textContent = message;
    }

    return {
        renderBoard,
        showTie,
        showWinner,
        showMessage
    };
})();

displayController.renderBoard();

