# SnakeGame

Played the Snake Game a lot when I was growing up. Made this game because it brings back a lot of good memories, but also it used a lot of the concepts that I learnt in javascript model, such as maniplating the DOM. 
Overall, the game works well and I found testing the game enjoyable. 
The game would work on a game however, the event key listeners currently only work on a computuer making the game only for computers.
![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/7b953e15-cee1-4755-8e2d-2b036d25f139)


## Features

### Game Board, Logo and text

#### Game Board 
Snake is able to move around a 20x20 square. This allows for 400 blocks that the snake can move freely on. 
The board was made in CSS using the grid-template-coloum / row command. 

![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/360ebd69-d7fb-4e89-8641-0945bd8fb540)

#### Loading image and text
Loading image was created to give a retro pixel style feel for the game. The text gives basic instructions on how to load the game, by pressing spacebar. When space bar is entered event listener removes logo and text.

 ![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/9b112ca2-6a83-47b1-8c82-d3b9e56204c6)  ![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/4d27906e-3bf8-4c73-a719-a375931d6c79) 

 ### Score 

 #### Current score 

 The score is updated by taking the snakes current length and turing it into a string using the .tostring() function. Which is then displayed using .padStart (3,'0') giving a three digit score possiblity.
 
 ![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/89af6805-34b7-4518-a49d-31c61af42927)

 #### High score

 High Score shows when players snake collides with something. Using the same functions as the score, the high score will only update if the current score is greater than the high score.

 ![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/f768baea-0d91-4dc5-902d-171d5f6866d0)

 ### Game play

 #### Movement 
Event listeners used to listen for arrow keys. Arrows can be used to give directions to snake. Up, down, left and right.
Game speed was also designed to increase at 25 points, 50 points, 100 points and 150points. This adds difficulty levels to the game, making it progressively harder as you play. 

#### Food and Points

Two foods will always be displayed on the screen.
The food uses three different fruits, which match a higher score bonus. Apple is - two points, Orange - three points, Watermellon – 4 points. 
Point system. Each point = 1 block. So, if a player got 4 points from the food the snake would increase in size by 4 blocks. This means the ultimate highest game score would be 400 points as you would run out of space on the game board. 
The food is generated on a random position on the grid using Math.random() and Math.floor(). 

#### Growing 

The snake continues to create length using unshift function but as it does this it uses pop function to remove this previous length it created. 
When the snake’s coordinates match the food position it will momentarily stop the pop function which will allow the snake to grow by one square. 
Then using the .push() function the snakes length array is updated saving its length.


#### Collision 

If the snake collides with any of the borders the round ends. If the snake collides with itself the round ends. 
Using If statement the consol check the snakes’ coordinates with the grid size and if they match it will mean the snake has collided with the walls. Similar with the body, using a for loop, which uses the snakes array length and if these are the same as the snakes head coordinates it means it collided. Followed by gameRestart function.

#### Game Restart and stop

When the snakes collide's with an obsliticle a restart function resets all the game functions back to the orginal game board. This resets the food position, the snakes current length and adds the game logo and text back to block from none.










