// set grid to x/y length and set square size in pixels
var xLength = 10;
var yLength = 10;
var squareSize = 50;
var shipsSquares = 17;

// Carrier 5 hits | Battleship 4 hits | Destroyer 3 hits | Submarine 3 hits | Patrol Boat 2 hits
// Total - 17 hits required to sunk all

// an array of letters to add to Y coordinates and to each square of the grid
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

// counter to increment up to 17, sum of ship squares, all sunk
var hitsCounter = 0;

// get container element by id
var GameBoardContainer = document.getElementById("gameboard");

// specifying size of board and access to the grid array
var boardObj = new GameBoard(10, 10); 
var board = boardObj.tiles;

// generating game board object
function GameBoard (xLength, yLength) {
  this.tiles = []; // will represent the games board
  this.ships = []; // will contain information on each ship added to the board

  for (var x = 0; x < xLength; x++) {
    for (var y = 0; y < yLength; y++) {
      if (!this.tiles[x]) this.tiles[x] = [];
      this.tiles[x][y] = 0;
    }
  }
}

// create grid by manipulating DOM and CSS
function getUIGrid() { 

  for (i = 0; i < yLength; i++) {
    for (j = 0; j < xLength; j++) {

      // create div for each box and set the size
      var square = document.createElement("div");
      GameBoardContainer.appendChild(square);

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

}  

// function getObj(length, orientation, xCoord, yCoord, xyArr) {
//   return ship = {
//     length: length,
//     orientation: orientation,
//     xCoord: xCoord,
//     yCoord: yCoord,
//     xyArr: xyArr,
//     hits: 0
//   };
// }

// var xyArr = [];
function addShip(length, orientation, xCoord, yCoord) {

  for(i = 0; i < length; i++) {
    
    if(board[xCoord][yCoord] === 0) {
      board[xCoord][yCoord] = 1;
      // xyArr.push(xCoord, yCoord);

      switch(orientation) {
        case 'right':
          xCoord++;
          break;
        case 'left':
          xCoord--;
          break;
        case 'up':
          yCoord--;
          break;
        case 'down':
          yCoord++;
          break;  
      } 
      // xyArr.push(xCoord, yCoord);
    }
  }
// boardObj.ships.push( getObj(length, orientation, xCoord, yCoord, xyArr) );
return true;
}

function hit(xy) {
  // method to simulate click from the console instead of click on the grid, using current click event handler
  var x = xy.substring(0,1).toUpperCase();
  var y = xy.substring(1,3) - 1;
  x = letters.indexOf(x);
  document.getElementById('s' + x + y).click();
  return true;
}

function fire(e) {
    // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
  if (e.target !== e.currentTarget) {
    // extract xCoord and yCoord from the HTML element's id
    var xCoord = e.target.id.substring(2,3);
    var yCoord = e.target.id.substring(1,2);   
    // 0 -> empty, 1 -> part of a ship, 2 -> a sunken part of a ship, 3 -> a missed shot
    
    // if player clicks a square with no ship, change the yCoordor and change square's value
    if (board[xCoord][yCoord] === 0) {
      e.target.style.background = '#bbb';
      // set this square's value to 3 to indicate that they fired and missed
      console.log('fire ' + xCoord + yCoord + ' ===> miss');
      board[xCoord][yCoord] = 3;
      
    // if player clicks a square with a ship, change the yCoordor and change square's value
    } else if (board[xCoord][yCoord] === 1) {
      e.target.style.background = 'red';
      // set this square's value to 2 to indicate the ship has been hit
      console.log('fire ' + xCoord + yCoord + ' ===> hit');
      board[xCoord][yCoord] = 2;
      
      // increment hitsCounter each time a ship is hit
      hitsCounter++;
      // hitsCounter reached the limit, all sunken ships.
      if (hitsCounter === shipsSquares) {
        console.log('All ships destroyed, GAME OVER!');
      }
      
    // if player clicks a square that's been previously hit, a warning appears
    } else if (board[xCoord][yCoord] > 1) {
      console.log('fire ' + xCoord + yCoord + ' ===> already hit');
    }   
  }
  e.target.innerText = ''; 
  e.stopPropagation();
}

getUIGrid();

// set event listener for all elements in gameboard, run fire function when square is clicked
GameBoardContainer.addEventListener("click", fire, false);