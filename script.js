// define HTML elements
const board = document.getElementById('game-board');

// Define game variables
const gridSize = 20
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'right';

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
draw();

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
function move() {
    const head = { ...snake[0] }; //Spread operator 0 to get a hold of snakes first postion and copies it.
    switch (direction) {
        case 'up':
            head.y--; // the direction of the snake head
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

    snake.unshift (head); // this adds another head element onto the current one

    snake.pop(); // this removes the last element from the array. Which is the unshift.
}

// test move
// setInterval(() => {
//     move(); //Move first
//     draw(); // draw a new position
// }, 200)
