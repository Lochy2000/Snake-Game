// define HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let food2 = generateFood2();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Adds game map, snake and food
function draw() {
    board.innerHTML = ''; // resets board to empty
    drawSnake();
    drawFood();
    drawFood2();
    updateScore();
}

// Draw snake 
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

//create snake or food
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set the position of snake or food 
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// Draw Food function 
function drawFood() {
    if (gameStarted) {
        let icon = 'apple';
        if (food.size === 2) {
          icon = 'banana';
        }
        if (food.size === 3) {
          icon = 'pear';
        }
        const foodElement = createGameElement('div', icon);
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

// Draw second food function 
function drawFood2() {
    if (gameStarted) {
        let icon = 'apple';
        if (food2.size === 2) {
          icon = 'banana';
        }
        if (food2.size === 3) {
          icon = 'pear';
        }
        const food2Element = createGameElement('div', icon);
        setPosition(food2Element, food2);
        board.appendChild(food2Element);
    }
}

// Randomly generate food position in x and y using Math.random and gridSize to spawn food anywhere in the 20x20 grid
function generateFood() {
    let x, y, size;
    do {
        x = Math.floor(Math.random() * gridSize) + 1;
        y = Math.floor(Math.random() * gridSize) + 1;
        size = Math.floor(Math.random() * 3) + 1;
    } while (isPositionOnSnake(x, y));
    return { x, y, size };
}

// Generate second food
function generateFood2() {
    let x, y, size;
    do {
        x = Math.floor(Math.random() * gridSize) + 1;
        y = Math.floor(Math.random() * gridSize) + 1;
        size = Math.floor(Math.random() * 3) + 1;
    } while (isPositionOnSnake(x, y));
    return { x, y, size };
}

// Check if a food is on the snake 
function isPositionOnSnake(x, y) {
    return snake.some(segment => segment.x === x && segment.y === y);
}

// Snake Movement using shallow copy, not altering the original array.
// Spread operator to get a hold of snake's first position and copy it.
// the direction of the snake head
function move() {
    const head = { ...snake[0] };
    switch (direction) {
      case 'up':
        head.y--;
        break;
      case 'down':
        head.y++;
        break;
      case 'left':
        head.x--;
        break;
      case 'right':
        head.x++;
        break;
    }

    snake.unshift(head); // this adds another head element onto the current one

    // this if statement allows the snake to unshift when it hits a food element. 
    if (head.x === food.x && head.y === food.y) {
        growSnake(food.size);
        food = generateFood();
        increaseSpeed();
        resetGameInterval();
    } else if (head.x === food2.x && head.y === food2.y) {
        growSnake(food2.size);
        food2 = generateFood2();
        increaseSpeed();
        resetGameInterval();
    } else {
        snake.pop(); // removes the added element if the snake doesn't eat any food
    }
    checkCollision();
    draw();
}

function growSnake(size) {
    for (let i = 0; i < size; i++) {
        snake.push({ ...snake[snake.length - 1] });
    }
}

// Reset the game interval
function resetGameInterval() {
    clearInterval(gameInterval);
    gameInterval = setInterval(move, gameSpeedDelay);
}

// Start Game function 
function startGame() {
    gameStarted = true; // keep track of running game, for pressing enter to start game
    instructionText.style.display = 'none';
    logo.style.display = 'none'; // removes loading logo and text when the game starts
    resetGameInterval();
    if (window.innerWidth < 600) {
        logo.style.display = 'none'; // removes loading logo when the game starts for screens smaller than 600px
    }
}

// space bar event listener 
// two different gamestarts are to ensure game will work on all browsers.
function handleKeyPress(event) {
    if (
      (!gameStarted && event.code === 'Space') ||
      (!gameStarted && event.key === ' ')
    ) {
      startGame();
    } else {
      switch (event.key) {
        case 'ArrowUp':
          direction = 'up';
          break;
        case 'ArrowDown':
          direction = 'down';
          break;
        case 'ArrowLeft':
          direction = 'left';
          break;
        case 'ArrowRight':
          direction = 'right';
          break;
      }
    }
}

document.addEventListener('keydown', handleKeyPress);

// Increase the speed of the snake at various sizes
function increaseSpeed() {
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }
}

// Check collision function, will reset the game when the head hits the border of the walls.
function checkCollision() {
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

// Reset game function
function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{ x: 10, y: 10 }]; // original starting point for snake
    food = generateFood();
    food2 = generateFood2();
    direction = 'right'; // original direction reset
    gameSpeedDelay = 200; // resets speed back
    updateScore(); // adds highscore
}

// Changes the current score as the snake eats the food
function updateScore() {
    const currentScore = snake.length - 1; // snake length starts at 1, need to -1 to make score 0
    score.textContent = currentScore.toString().padStart(3, '0'); // setting score text content, turning into a string of triple-digit numbers.
}

// Stops the game automatically starting when the game resets
function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    if (window.innerWidth >= 600) {
        logo.style.display = 'block';
    } // this only displays the logo gif on screens larger then 600px
}

// HighScore updates only when the current score is > than highscore.
function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
    highScoreText.style.display = 'block';
}
