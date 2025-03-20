const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const overlay = document.getElementById('overlay');
const resultMessage = document.getElementById('result-message');
const restartGameBtn = document.getElementById('restart-game-btn');
const newGameBtn = document.getElementById('new-game-btn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-cell-index');

    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        resultMessage.textContent = `Player ${currentPlayer} wins!`;
        overlay.style.display = 'flex';
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
        resultMessage.textContent = "It's a draw!";
        overlay.style.display = 'flex';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Player X's turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });

    overlay.style.display = 'none'; // Hide the result screen
}

function startNewGame() {
    restartGame();
    overlay.style.display = 'none'; // Hide the result screen
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartGameBtn.addEventListener('click', restartGame);
newGameBtn.addEventListener('click', startNewGame);
