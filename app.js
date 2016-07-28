// set grid to x/y length and set square size in pixels
var xLength = 10;
var yLength = 10;
var squareSize = 50;
var shipsSquares = 17;

// get container element by id
var gameBoardContainer = document.getElementById("gameboard");

// create grid by manipulating DOM and CSS
for (i = 0; i < yLength; i++) {
  for (j = 0; j < xLength; j++) {

    // an array of letters to add to Y coordinates and to each square of the grid
    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    // create div for each box and set the size
    var square = document.createElement("div");
    gameBoardContainer.appendChild(square);

    // give each div element a unique id based on its xCoord and yCoordumn
    square.id = 's' + j + i;
    square.innerText = letters[j] + '' + (i + 1);      
    
    // set each grid square's coordinates: multiples of the current xCoord or yCoordumn number
    var topXY = j * squareSize;
    var leftXY = i * squareSize;      
    
    // use CSS absolute positioning to place each grid square on the page
    square.style.top = topXY + 'px';
    square.style.left = leftXY + 'px';            
  }
}

/* 
      Carrier     - 5 hits
      Battleship  - 4 hits
      Destroyer   - 3 hits
      Submarine   - 3 hits
      Patrol Boat - 2 hits
      Total - 17 hits required to sunk all
*/

// counter to increment up to 17, sum of ship squares, all sunk
var hitsCounter = 0;

// 0 = empty, 1 = part of a ship, 2 = a sunken part of a ship, 3 = a missed shot

var gameBoard = [
        [0,0,0,1,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,0],
        [0,0,0,0,0,0,1,0,0,0],
        [1,0,0,0,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0],
        [1,0,0,1,0,0,0,0,0,0],
        [1,0,0,1,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,0]
        ]

// set event listener for all elements in gameboard, run fire function when square is clicked
gameBoardContainer.addEventListener("click", fire, false);

function fire(e) {
    // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
  if (e.target !== e.currentTarget) {
    // extract xCoord and yCoord from the HTML element's id
    var xCoord = e.target.id.substring(1,2);
    var yCoord = e.target.id.substring(2,3);
        
    // if player clicks a square with no ship, change the yCoordor and change square's value
    if (gameBoard[xCoord][yCoord] === 0) {
      e.target.style.background = '#bbb';
      // set this square's value to 3 to indicate that they fired and missed
      console.log('fire ' + xCoord + yCoord + ' ===> miss');
      gameBoard[xCoord][yCoord] = 3;
      
    // if player clicks a square with a ship, change the yCoordor and change square's value
    } else if (gameBoard[xCoord][yCoord] === 1) {
      e.target.style.background = 'red';
      // set this square's value to 2 to indicate the ship has been hit
      console.log('fire ' + xCoord + yCoord + ' ===> hit');
      gameBoard[xCoord][yCoord] = 2;
      
      // increment hitsCounter each time a ship is hit
      hitsCounter++;
      // hitsCounter reached the limit, all sunken ships.
      if (hitsCounter === shipsSquares) {
        console.log('All ships destroyed! GAME');
      }
      
    // if player clicks a square that's been previously hit, a warning appears
    } else if (gameBoard[xCoord][yCoord] > 1) {
      console.log('fire ' + xCoord + yCoord + ' ===> already hit');
    }   
  }
  e.stopPropagation();
}