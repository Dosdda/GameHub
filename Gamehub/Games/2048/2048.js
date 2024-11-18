let board;
let score = 0;
let highScore = 0;

const colors = {
    0: "#cdc1b4",
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edc850",
    1024: "#edc53f",
    2048: "#edc22e",
    'light': "#f9f6f2",
    'dark': "#776e65"
};


window.onload = () => {
    initializeGame();
    document.addEventListener('keyup', handleKeyPress);
};

function initializeGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    
    addNewTile();
    addNewTile();

    updateBoard();
}

function updateBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; 

    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = board[r][c] === 0 ? '' : board[r][c];
            tile.style.backgroundColor = colors[board[r][c]];
            tile.style.color = board[r][c] > 8 ? colors['light'] : colors['dark'];
            boardElement.append(tile);
        }
    }

    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('high-score').textContent = `High Score: ${highScore}`;
}

function handleKeyPress(e) {
    switch (e.code) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }

    addNewTile();
    updateBoard();

    if (isGameOver()) {
        alert('Game Over!');
        resetGame();
    }

    if (score > highScore) {
        highScore = score;
    }
}

function addNewTile() {
    let emptyTiles = [];

    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === 0) {
                emptyTiles.push({ r, c });
            }
        }
    }

    if (emptyTiles.length === 0) return;

    let randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[randomTile.r][randomTile.c] = Math.random() > 0.1 ? 2 : 4;
}

function slide(row) {
    row = row.filter(num => num !== 0); 
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            score += row[i];
            row[i + 1] = 0;
        }
    }
    row = row.filter(num => num !== 0); 
    while (row.length < 4) {
        row.push(0);
    }
    return row;
}

function moveLeft() {
    for (let r = 0; r < 4; r++) {
        board[r] = slide(board[r]);
    }
}

function moveRight() {
    for (let r = 0; r < 4; r++) {
        board[r] = slide(board[r].reverse()).reverse();
    }
}

function moveUp() {
    for (let c = 0; c < 4; c++) {
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        col = slide(col);
        for (let r = 0; r < 4; r++) {
            board[r][c] = col[r];
        }
    }
}

function moveDown() {
    for (let c = 0; c < 4; c++) {
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]].reverse();
        col = slide(col).reverse();
        for (let r = 0; r < 4; r++) {
            board[r][c] = col[r];
        }
    }
}

function isGameOver() {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === 0) return false;
            if (r < 3 && board[r][c] === board[r + 1][c]) return false;
            if (c < 3 && board[r][c] === board[r][c + 1]) return false;
        }
    }
    return true;
}

function resetGame() {
    score = 0;
    initializeGame();
}