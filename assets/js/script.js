// define HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const buttonStart = document.getElementById('startButton');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const mobileControls = document.getElementById('mobile-controls');

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

/**
 * function resets game board and adds snake and food to board 
 */

function draw() {
    board.innerHTML = ''; // resets board to empty
    drawSnake();
    drawFood();
    drawFood2();
    updateScore();
}


/**
 * creates snake element
 */
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}
/**
 * adds elements to the html doc
 * @param {*} tag 
 * @param {*} className 
 * @returns 
 */
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}
/**
 * sets position in y and x on the gamebaord grid
 * @param {*} element 
 * @param {*} position 
 */
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}
// Draw Food function
/**
 * creates 3 different types of food. Then sets the position and adds to gameboard
 */ 
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
/**
 * creates 3 different types of food. Then sets the position and adds to gameboard doc
 */ 
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
/**
 * Randomly generate food position in x and y using Math.random and gridSize to spawn food anywhere in the 20x20 grid
 * @returns 
 */
function generateFood() {
    let x, y, size;
    do {
        x = Math.floor(Math.random() * gridSize) + 1;
        y = Math.floor(Math.random() * gridSize) + 1;
        size = Math.floor(Math.random() * 3) + 1;
    } while (isPositionOnSnake(x, y));
    return { x, y, size };
}
/**
 * Randomly generate food position in x and y using Math.random and gridSize to spawn food anywhere in the 20x20 grid
 * @returns 
 */
function generateFood2() {
    let x, y, size;
    do {
        x = Math.floor(Math.random() * gridSize) + 1;
        y = Math.floor(Math.random() * gridSize) + 1;
        size = Math.floor(Math.random() * 3) + 1;
    } while (isPositionOnSnake(x, y));
    return { x, y, size };
}
/**
 * Check if food is on the snake
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function isPositionOnSnake(x, y) {
    return snake.some(segment => segment.x === x && segment.y === y);
}
/**
 * gives direction to arrows on the game board.
 * also generates another food if the new one is eaten
 */
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
/**
 *  resets the game speed and movement
 */
function resetGameInterval() {
    clearInterval(gameInterval);
    gameInterval = setInterval(move, gameSpeedDelay);
}
/**
 * Removes starting screen and changes gamestart from false to true
 */
function startGame() {
    gameStarted = true; // keep track of running game, for pressing enter to start game
    instructionText.style.display = 'none';
    logo.style.display = 'none'; 
    buttonStart.style.display = 'none';
    resetGameInterval();
}

/**
 * If space bar is pressed game starts, else listens for the arrow keys
 * @param {*} event 
 */
function handleKeyPress(event) {
    if (
      (!gameStarted && event.code === 'Space') ||
      (!gameStarted && event.code === 'Touch') ||
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
/**
 * The delay of the snake is reduced, speeding up the snake speed
 */
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
/**
 * checks the snakes coordinates and if they match the gridsize or snake length the game resets
 */
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

/**
 * Everything is set back to orginal, expect for highscore which will be updated if required
 */
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

/**
 * turns the snake length into a string which can be desplayed in score sections ontop
 */
function updateScore() {
    const currentScore = snake.length - 1; // snake length starts at 1, need to -1 to make score 0
    score.textContent = currentScore.toString().padStart(3, '0'); // setting score text content, turning into a string of triple-digit numbers.
}
/**
 * This functions sets the game back to the orginal starting screen with the logo and text
 */
function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    if (window.innerWidth >= 768) {
        logo.style.display = 'block';
        instructionText.style.display = 'block';
    } // this only displays the logo gif on screens larger then 600px
    if (window.innerWidth <= 768) {
        buttonStart.style.display = 'block';
    } // this only displays the start button on screens smaller then 600px
}

/**
 * If the currentscore is greater than the highscore then the highscore will equal currentscore
 */
function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
    highScoreText.style.display = 'block';
}
/**
 * Show start button on mobile devices
 */
function checkDeviceType() {
    if (window.innerWidth < 768) { // less the 600px the screen will display the start button for phones.
        startButton.style.display = 'block';
        mobileControls.style.display = 'flex';
        toggleKeyboardListener(false); // Disable keyboard listener
    } else {
        startButton.style.display = 'none';
        mobileControls.style.display = 'none';
        toggleKeyboardListener(true); // Enable keyboard listener
    }
}

/**
 * Function to toggle keyboard event listener based on screen size
 * @param {*} enable 
 */
function toggleKeyboardListener(enable) {
    if (enable) {
        document.addEventListener('keydown', handleKeyPress);
    } else {
        document.removeEventListener('keydown', handleKeyPress);
    }
}

/**
 * Event listener for the start button
 */
startButton.addEventListener('click', function() {
    startGame();
});

/**
 * Event listeners for mobile buttons
 */
// 
leftButton.addEventListener('click', function() {
    if (gameStarted) {
        if (direction === 'up' || direction === 'down') {
            direction = 'left';
        } else if (direction === 'right') {
            direction = 'up';
        } else if (direction === 'left') {
            direction = 'down';
        }
    }
});

rightButton.addEventListener('click', function() {
    if (gameStarted) {
        if (direction === 'up' || direction === 'down') {
            direction = 'right';
        } else if (direction === 'left') {
            direction = 'up';
        } else if (direction === 'right') {
            direction = 'down';
        }
    }
});

window.addEventListener('resize', checkDeviceType); // Change interface based on different screen size
checkDeviceType(); // Initial check on load
