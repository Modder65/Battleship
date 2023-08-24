import { Gameboard } from "./Gameboard.js";

export class Player {
  constructor(isComputer = false) {
    this.isComputer = isComputer;
    this.gameBoard = new Gameboard();
    this.previousAttacks = [];
  }

  attack(enemyGameboard, row, column) {
    enemyGameboard.receiveAttack(row, column);
    this.previousAttacks.push({ row, column });
  }

  makeRandomMove(enemyGameboard) {
    let row, column;
    do {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
    } while (
      this.previousAttacks.some(
        (attack) => attack.row === row && attack.column === column
      )
    );

    this.attack(enemyGameboard, row, column);
  }
}
