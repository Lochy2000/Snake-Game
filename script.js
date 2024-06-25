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
