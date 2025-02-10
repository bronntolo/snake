const boardSize = 20;
let snake = [{ x: 9, y: 9 }];
let food = { x: 5, y: 5 };
let direction = 'RIGHT';
let score = 0;
const board = document.getElementById('gameBoard');
const scoreElement = document.getElementById('score');
// Create game board
function createBoard() {
    board.innerHTML = '';
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x;
            cell.dataset.y = y;
            board.appendChild(cell);
        }
    }
}
// Draw snake and food
function draw() {
    // Clear all cells
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('snake', 'food'));

    // Draw snake
    snake.forEach(segment => {
        const cell = document.querySelector(`[data-x="${segment.x}"][data-y="${segment.y}"]`);
        if (cell) cell.classList.add('snake');
    });

    // Draw food
    const foodCell = document.querySelector(`[data-x="${food.x}"][data-y="${food.y}"]`);
    if (foodCell) foodCell.classList.add('food');

    // Update score
    scoreElement.textContent = `Punteggio: ${score}`;
}

// Move snake
function move() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y--;
    if (direction === 'DOWN') head.y++;
    if (direction === 'LEFT') head.x--;
    if (direction === 'RIGHT') head.x++;

    // Check for collision with walls
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        return gameOver();
    }

    // Check for collision with self
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return gameOver();
    }

    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        spawnFood();
    } else {
        snake.pop();
    }

    draw();
}

// Spawn food at random position
function spawnFood() {
    food = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
    };
    // Ensure food doesn't spawn on the snake
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food = {
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize)
        };
    }
}

// Game over
function gameOver() {
    alert(`Game Over! Punteggio finale: ${score}`);
    snake = [{ x: 9, y: 9 }];
    score = 0;
    direction = 'RIGHT';
    spawnFood();
    draw();
}

// Handle key presses
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Start the game loop
function gameLoop() {
    move();
    setTimeout(gameLoop, 100);
}

createBoard();
spawnFood();
gameLoop();