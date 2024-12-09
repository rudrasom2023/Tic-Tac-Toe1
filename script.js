/* script.js */
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameMode = "humanVsComputer"; // Default mode

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartButton');
const humanVsComputerBtn = document.getElementById('humanVsComputer');
const humanVsHumanBtn = document.getElementById('humanVsHuman');

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.style.color = currentPlayer === 'X' ? '#00ff9d' : '#00ccff';
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = `Player ${currentPlayer}'s Turn`;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = 'Game Draw! 🤝';
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function computerMove() {
    if (!gameActive) return;
    
    // Simple AI: Choose random empty cell
    const emptyCells = gameState.reduce((acc, cell, index) => {
        if (cell === "") acc.push(index);
        return acc;
    }, []);
    
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        setTimeout(() => {
            const cell = document.querySelector(`[data-cell-index="${randomCell}"]`);
            handleCellClick(cell);
        }, 500);
    }
}

function handleCellClick(cell) {
    const clickedCellIndex = parseInt(cell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) return;

    handleCellPlayed(cell, clickedCellIndex);
    handleResultValidation();

    if (gameMode === "humanVsComputer" && gameActive && currentPlayer === "O") {
        computerMove();
    }
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.style.color = '';
    });
}

function handleModeChange(mode) {
    gameMode = mode;
    handleRestartGame();
    humanVsComputerBtn.classList.toggle('active', mode === 'humanVsComputer');
    humanVsHumanBtn.classList.toggle('active', mode === 'humanVsHuman');
}

cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell));
});

restartBtn.addEventListener('click', handleRestartGame);
humanVsComputerBtn.addEventListener('click', () => handleModeChange('humanVsComputer'));
humanVsHumanBtn.addEventListener('click', () => handleModeChange('humanVsHuman'));

document.addEventListener('DOMContentLoaded', () => {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);

    // Create stars
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }

    // Create meteors
    for (let i = 0; i < 3; i++) {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.style.top = `${Math.random() * 100}%`;
        meteor.style.left = `${Math.random() * 100}%`;
        meteor.style.animationDelay = `${Math.random() * 6}s`;
        starsContainer.appendChild(meteor);
    }
});
