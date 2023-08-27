import { Gameboard } from "./Gameboard.js";

export class Player {
  constructor() {}

  isMoveLegal(enemyGameboard, row, column) {
    for (let i = 0; i < enemyGameboard.allAttacks.length; i++) {
      if (
        row === enemyGameboard.allAttacks[i].row &&
        column === enemyGameboard.allAttacks[i].column
      ) {
        return false;
      }
    }
    return true;
  }

  attack(enemyGameboard, row, column) {
    if (this.isMoveLegal(enemyGameboard, row, column)) {
      enemyGameboard.receiveAttack(row, column);
    } else {
      return "That move has already been made, choose another";
    }
  }

  makeRandomMove(enemyGameboard) {
    let row, column;
    do {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
    } while (!this.isMoveLegal(enemyGameboard, row, column));

    return { row, column };
  }
}
