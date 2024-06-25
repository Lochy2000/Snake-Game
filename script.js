// define HTML elements
const board = document.getElementById('game-board');
const intructionText = document.getElementById('instruction-text')
const logo = document.getElementById('logo');

// Define game variables
const gridSize = 20
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Adds game map, snake and food
function draw() {
    board.innerHTML = ''; // resets board to empty
    drawSnake();
    drawFood();
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

// Testing draw function 
// draw();

// Draw Food function 
function drawFood() {

    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);

}

//Randomly generated food position in x and y using maths random and * gridsize to spawn food anywhere in 20x20 grid
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

// Snake Movement using shallow copy, not altering the orginial array. 
//Spread operator 0 to get a hold of snakes first postion and copies it.
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
        food = generateFood(); // food has been eaten, new food needed
        clearInterval(gameInterval);// clear past interval
        gameInterval = setInterval(() => {
            move();
            // checkCollistion();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop(); // this removes the element that the unshift function creates. 
    }
}

// test move
// setInterval(() => {
//     move(); //Move first
//     draw(); // draw a new position
// }, 200)

//Start Game function 
function startGame() {
    gameStarted = true; // keep track of running game, for pressing enter to start game
    intructionText.style.display = 'none';
    logo.style.display = 'none'; // removes loading logo and text when the game starts
    gameInterval = setInterval(() => {
        move();
        //checkCollistion();
        draw();
    }, gameSpeedDelay);
}

// space bar event listener 
//two different gamestarts are to ensure game will work on all browsers.
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

  // increase the speed of the snake at various sizes
  function increaseSpeed() {
    console.log(gameSpeedDelay);
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