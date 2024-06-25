// define HTML elements
const board = document.getElementById('game-board');

// Define game variables
let snake = [{x:10, y:10}];

// Adds game map, snake and food
function draw () {
    board.innerHTML = ''; // resets board to empty
    drawsnake();
}

// Draw snake 
function drawsnake (){
    snake.forEach ((segement) => {
        const snakeElement = createGameElement ('div', 'snake');
        setPosition (snakeElement, segement);
        board.appendChild (snakeElement)
    })
}

//create snake or food
function createGameElement (tag, className) {
    const element = document.creatElement (tag);
    element.className = className;
    return element
}

// Set the position of snake or food 
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}