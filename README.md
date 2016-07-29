#Battleships in Javascript

The purpose of this exercise is to create a game engine in Javascript and UI.

## JS console methods
- **addShip(length, orientation, xCoordinate, yCoordinate)** add ship to left/right/up/down at given XY and length
- **hit(xyOfTheCell)** add hit to the board at given XY e.g. 'J10'

## JS event handling
- **fire(e)** method handles clicks received at any given cell, changes cell colour to red when hit, JS hit method passes a click, when received event handler takes over and continue as if it was a click on the grid

###To be done

- error handling for off the grid ship placement
- random ship placements and hits (AI player vs computer)
- storing number of hits per ship and alert when sunken
- method to return a status of each ship, number of hits etc.
- delete/decrease number of cells after each hit until Game Over message appears

####Preview

![battleships-js screenshot](https://raw.githubusercontent.com/maciejk77/battleships-js/master/img/screenshot.png)
