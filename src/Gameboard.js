import { Ship } from "./Ship.js";

export class Gameboard {
  constructor() {
    this.ships = [];
    this.missedHits = [];
    this.allAttacks = [];
    this.sunkenShips = new Set();
  }

  placeShip(length, orientation, startRow, startColumn) {
    const coordinates = [];
    for (let i = 0; i < length; i++) {
      let row = startRow + (orientation === "vertical" ? i : 0);
      let column = startColumn + (orientation === "horizontal" ? i : 0);

      if (row >= 10 || column >= 10) return false;

      if (
        this.ships.some((shipEntry) =>
          shipEntry.coordinates.some(
            (coord) => coord.row === row && coord.column === column
          )
        )
      ) {
        return false;
      }

      coordinates.push({ row, column });
    }

    const ship = new Ship(length);
    const shipEntry = { ship, coordinates };
    this.ships.push(shipEntry);
    return true;
  }

  receiveAttack(row, column) {
    let wasHit = false;
    for (let i = 0; i < this.ships.length; i++) {
      for (let j = 0; j < this.ships[i].coordinates.length; j++) {
        if (
          row === this.ships[i].coordinates[j].row &&
          column === this.ships[i].coordinates[j].column
        ) {
          this.ships[i].ship.hit(); // Make sure this line is actually being executed
          wasHit = true;
          break;
        }
      }
      if (wasHit) break;
    }
    this.allAttacks.push({ row, column });
    return wasHit;
  }
}
