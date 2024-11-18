const squares = document.querySelectorAll('.square');
        const message = document.getElementById('message');
        const resetButton = document.getElementById('reset');

        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameOver = false;

        function checkWinner() {
            const winCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (const combo of winCombinations) {
                const [a, b, c] = combo;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    gameOver = true;
                    message.innerText = `${gameBoard[a]} wins!`;
                    return;
                }
            }

            if (!gameBoard.includes('')) {
                gameOver = true;
                message.innerText = "It's a draw!";
            }
        }

        function makeMove(index) {
            if (!gameBoard[index] && !gameOver) {
                gameBoard[index] = currentPlayer;
                squares[index].textContent = currentPlayer;
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                checkWinner();
            }
        }

        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', () => {
                makeMove(i);

                
                if (!gameOver && currentPlayer === 'O') {
                    const emptySquares = gameBoard.reduce((acc, value, index) => {
                        if (!value) acc.push(index);
                        return acc;
                    }, []);
                    const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
                    makeMove(randomIndex);
                }
            });
        }

        resetButton.addEventListener('click', () => {
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            gameOver = false;
            currentPlayer = 'X';
            message.innerText = '';
            squares.forEach(square => square.textContent = '');
        });