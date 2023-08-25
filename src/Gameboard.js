import { Ship } from "./Ship.js";

export class Gameboard {
  constructor() {
    this.ships = [];
    this.missedHits = [];
    this.takenSpots = [];
  }

  placeShip(length, orientation, startRow, startColumn) {
    let coordinates = [];
    const ship = new Ship(length);
    let tempTakenSpots = []; // Temporary array to hold spots being considered

    for (let i = 0; i < ship.length; i++) {
      let row = orientation === "horizontal" ? startRow : startRow + i;
      let column = orientation === "horizontal" ? startColumn + i : startColumn;

      // Check if the spot is taken or if the ship overflows the board
      if (
        row >= 10 ||
        column >= 10 ||
        this.takenSpots.some(
          (spot) => spot.row === row && spot.column === column
        )
      ) {
        alert("spot is taken or out of bounds, choose another spot");
        return; // Return without placing the ship
      }

      coordinates.push({ row, column });
      tempTakenSpots.push({ row, column }); // Add the spot to the temporary array
    }

    // If placement is successful, add the temporary spots to the takenSpots array
    this.takenSpots = this.takenSpots.concat(tempTakenSpots);

    let shipEntry = { ship, coordinates };
    this.ships.push(shipEntry);
    return shipEntry; // Return the ship entry to indicate success
  }

  receiveAttack(row, column) {
    let hit = false;
    for (let i = 0; i < this.ships.length; i++) {
      for (let j = 0; j < this.ships[i].coordinates.length; j++) {
        if (
          row == this.ships[i].coordinates[j].row &&
          column == this.ships[i].coordinates[j].column
        ) {
          this.ships[i].ship.hit();
          hit = true;
          break;
        }
      }
      if (hit) break;
    }
    if (!hit) {
      this.missedHits.push({ row, column });
    }
    return hit; // Return the hit value to indicate whether it was a hit or miss
  }

  allShipsSunk() {
    return this.ships.every((shipEntry) => shipEntry.ship.isSunk());
  }
}
