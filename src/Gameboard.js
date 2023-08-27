// Import the Ship class from Ship.js
import { Ship } from "./Ship.js";

// Define a Gameboard class
export class Gameboard {
  // The constructor initializes the Gameboard object with empty arrays for ships, missedHits, and allAttacks.
  // It also initializes an empty Set for sunkenShips.
  constructor() {
    this.ships = []; // Array to store all the ships placed on the gameboard.
    this.missedHits = []; // Array to store the coordinates of missed hits.
    this.allAttacks = []; // Array to store all the attack coordinates.
    this.sunkenShips = new Set(); // Set to store the ships that have been sunk.
  }

  // Method to place a ship on the gameboard.
  placeShip(length, orientation, startRow, startColumn) {
    const coordinates = []; // Array to store the coordinates where the ship will be placed.

    // Loop through each square where the ship will be placed.
    for (let i = 0; i < length; i++) {
      let row = startRow + (orientation === "vertical" ? i : 0);
      let column = startColumn + (orientation === "horizontal" ? i : 0);

      // Check if the ship placement is out of bounds.
      if (row >= 10 || column >= 10) return false;

      // Check if any part of the ship overlaps with another ship.
      if (
        this.ships.some((shipEntry) =>
          shipEntry.coordinates.some(
            (coord) => coord.row === row && coord.column === column
          )
        )
      ) {
        return false;
      }

      // Add the coordinate to the coordinates array.
      coordinates.push({ row, column });
    }

    // Create a new Ship object and add it to the ships array along with its coordinates.
    const ship = new Ship(length);
    const shipEntry = { ship, coordinates };
    this.ships.push(shipEntry);
    return true;
  }

  // Method to handle an attack on the gameboard.
  receiveAttack(row, column) {
    let wasHit = false; // Variable to store whether the attack was a hit or not.

    // Loop through each ship to see if it was hit.
    for (let i = 0; i < this.ships.length; i++) {
      for (let j = 0; j < this.ships[i].coordinates.length; j++) {
        if (
          row === this.ships[i].coordinates[j].row &&
          column === this.ships[i].coordinates[j].column
        ) {
          // If the ship was hit, call its hit method.
          this.ships[i].ship.hit();
          wasHit = true;
          break;
        }
      }
      if (wasHit) break;
    }

    // Add the attack coordinate to the allAttacks array.
    this.allAttacks.push({ row, column });
    return wasHit; // Return whether the attack was a hit or not.
  }
}
