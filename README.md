# SnakeGame
live game-- https://lochy2000.github.io/Snake-Game/ 

Played the Snake Game a lot when I was growing up. Made this game because it brings back a lot of good memories, but also it used a lot of the concepts that I learnt in javascript model, such as maniplating the DOM. 
Overall, the game works well and I found testing the game enjoyable. 
Currently the game play only works on a Comptuer. The Game is resposive to fit on different screens and has a start button for phones.
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

 ## Score 

 #### Current score 

 The score is updated by taking the snakes current length and turning it into a string using the .tostring() function. Which is then displayed using .padStart (3,'0') giving a three digit score possiblity.
 
 ![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/89af6805-34b7-4518-a49d-31c61af42927)

 #### High score
Using the same functions as the score, the high score will only update if the current score is greater than the high score.

 ![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/f768baea-0d91-4dc5-902d-171d5f6866d0)

## Game play

#### Movement 
Event listener used to listen for arrow keys. Arrows can be used to give directions to snake. Up, down, left and right.
Game speed was also designed to increase at 25 points, 50 points, 100 points and 150points. This adds difficulty levels to the game, making it progressively harder as you play. 

#### Food and Points

Two foods will always be displayed on the screen.
The food uses three different fruits, which match a higher score bonus. Apple is - two points, Orange - three points, Watermellon – 4 points. 
Point system. Each point = +1 block in length. So, if a player got 4 points from the food the snake would increase in size by 4 blocks. This means the ultimate highest game score would be 400 points as you would run out of space on the game board. 
The food is generated on a random position on the grid using Math.random() and Math.floor(). 

#### Growing 

The snake continues to create length using unshift function but as it does this it uses pop function to remove this previous length it created. 
When the snake’s coordinates match the food position it will momentarily stop the pop function which will allow the snake to grow by one square. 
Then using the .push() function the snakes length array is updated saving its length.


#### Collision 

If the snake collides with any of the borders the round ends. If the snake collides with itself the round ends. 
Using If statement the consol check the snakes’ coordinates with the grid size and if they match it will mean the snake has collided with the walls. Similar with the body, using a for loop, which uses the snakes array length and if these are the same as the snakes head coordinates it means it collided. Followed by gameRestart function.

#### Game Restart and stop

When the snakes collide's with an obsliticle a restart function resets all the game functions back to the orginal game board state. This resets the food position, the snakes current length and adds the game logo and text back to block from none.

#### Phone 

Currently the phone version can start with a start button. The phone version has two buttons, left and right. The event listener is similar to the keyboard, expect it only has a left and right input. This means when the snake is moving horizontal to the board, the buttons will move the snake up and down. Otherwise if the snake is moving vertical the buttons will move left and right.

![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/364cdc26-2fc9-4797-9aa0-8762c2112441)



## Testing 

<ul>
 
#### <li>Accesiblity</li>

![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/f0d81c0b-6827-4be2-920f-433b85d33f87)


#### <li> HTML </li>
![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/d75f7a39-abf3-400b-8a75-2ff764406d7f)

![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/1df7e417-6bbb-41b2-9ecd-1f0caee9f865)

#### <li> CSS </li>
![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/bb487ec7-950e-4652-8619-3a62a14f3da5)

![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/4805f9a7-8c18-49d2-849e-7f04c9cbc6e8)

####  <li>JavaScript</li>
 <ul>
  <li> The javascript checker came up with 47 warnings. Majority of which said I should use ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz). However, all the functions worked as required and didn't see any reason in changing.</li>
 </ul>    
 
![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/243a1af1-6cfe-4d75-9221-b700dfa98893)


####  <li>Search engines</li>
 <ul>
  <li> Game runs and functions perfectly across multipe search engines</li>
 </ul>

 ####  <li>Media Query</li>
 <ul>
  <li>The game board is designed to fit on all screen sizes. On any screen less then 768px the game layout changes to buttons. This allows for a touch version of the game that will be mobile phone compatible.</li>
 </ul>
 
![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/c5fe19a7-9b81-46d6-add0-e8e99b091a23)


  
#### <li>Game testing </li>
played the game a bunch and had others try to play it.
<ul>
 <li>Made sure every time enter was pressed game would start, removing logo and text from game board.</li>
 <li>Made sure that both foods loaded randomly and each time.</li>
 <li>Made sure that the three different foods added the correct points to the snake.</li>
 <li>Made sure that the high score would update each time a high score was gotten.</li>
 <li>Made sure the snake would collide with all 4 sides of the box. Triggering gamestop and restart functions</li>
 <li>Made sure the snake would collide with itself, triggering gamestop and restart.</li>
 <li>Made sure snakes length and speed updated accordingly </li>
 <li>Tested game on Chrome,Microsoft edge and firefly. All functions work.</li>
</ul>

</ul>

## Bugs

#### Collision bug which caused the snake to go through food and not de spawning it. Fixing Collision Detection Bug:
•	There was a typo in the checkCollision function where snake.y should be snake[i].y.
#### Food spawning on snake. Solution:
•	Added snake coordinates to generateFood function. This meant the food would never spawn on the snakes body no matter how long.
#### Loading logo on screen under 600 px was too big. Java script functions would override style.css media query. Solution:
•	Added window.innerwidth >=600  to stopGame function and window.innerwidth< 600 to startGame function.
#### Phone version 
• Various methods were tried and tested, however, i was unable to get the javascript eventlistener working on the mobile version.

## Deployment

#### Version control 
The game was made using Visual studio code. It was pushed to Github using a remote repository called ‘Snake-Game’
Git hub commands were used through-out to push the game to the remote repository. The commands used were as follows: 
<ul>
<li>Git add . – adds files to staging area</li>
<li>Git commit -m “  ” – commits changes to local repository to await to be pushed to Github</li>
<li>Git push – this pushes all code to remote repository stored on Github</li> 
</ul>

#### Deployement to GitHub Page
Site was deployed to github pages. To make sure game would function properly. This is done as follows: 
<ul>
<li>In the ‘Snake-Game’ repository navigate to setting</li>
<li>In pages on settings used the drop-down menu, to select master branch and save.</li>
<li>Once saved a live link is provided which the game can be played on.</li>
</ul>
Live version --  https://lochy2000.github.io/Snake-Game/ 

#### Cloning of repository locally 
<ul>
<li>Find the desired repository.</li>
<li>Locate code button above all project files</li>
<li>Click on HTTPS and copy repository link.</li>
<li>I used Visual studios, and pasted the url into the IDE’s terminal</li>
</ul>

## Credits
Thankyou to spence my mentor for the support, helping with various troubleshooting problems and explaining some of the JavaScript concepts. Also, thank you to my friend Max who tested this game by playing for any issues.

#### Content
<ul>
<li>The main inspiration for this game came from Freedcodecamp tutorial walk through. Most of the code used in the HTML,CSS and Javascript were takin from this tutorial.
[https://www.youtube.com/watch?v=uyhzCBEGaBY ](https://www.youtube.com/watch?v=uyhzCBEGaBY) </li>
<li>Also, code institute lessons in If/Else statement, switch statements and for loops, were useful for understand the concepts.</li>
<li>Additionally, W3Shools and Developer-Mozilla were also useful for explaining various functions.</li>
</ul>

#### Media 
![image](https://github.com/Lochy2000/Snake-Game/assets/164012429/5fca9b7d-45ec-45cb-9ecb-9b0f1125ac39)
<ul>
 <li> All image came of Canva. The background image was AI generated. The food images were stock photos. And the Snake was designed on Canva builder.</li>
</ul>








