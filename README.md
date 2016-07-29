#Battleships in Javascript

The purpose of this exercise is to create a game engine in Javascript and UI.

##Instruction

# JS console methods
- **addShip(length, orientation, xCoordinate, yCoordinate)** (add ship to the left/right/up/down at given XY and length) 
- **hit(xCoordinate, yCoordinate)** (add hit to the board at given XY)

# JS event handling
- fire(e) method handles clicks received at any given cell, changes cell colour to red when hit, JS hit method listens for a click, when received this method takes over and continue as if it was a click on the grid

###To be done

- error handling for off the grid ship placement
- random ship placements and hits (AI player vs computer)
- storing number of hits per ship and alert when sunken
- method to return a status of each ship, number of hits etc.

####Preview

![battleships-js screenshot](https://raw.githubusercontent.com/maciejk77/battleships-js/master/img/screenshot.png)
