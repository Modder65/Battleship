// Define a Player class
export class Player {
  // The constructor initializes the Player object. Currently empty as no properties are set at the moment.
  constructor() {}

  // Method to check if a move is legal (i.e., the cell has not been attacked before).
  isMoveLegal(enemyGameboard, row, column) {
    // Loop through all previous attacks on the enemy gameboard.
    for (let i = 0; i < enemyGameboard.allAttacks.length; i++) {
      // If the row and column match any previous attack, the move is not legal.
      if (
        row === enemyGameboard.allAttacks[i].row &&
        column === enemyGameboard.allAttacks[i].column
      ) {
        return false;
      }
    }
    // If the loop completes without returning false, the move is legal.
    return true;
  }

  // Method to attack the enemy gameboard.
  attack(enemyGameboard, row, column) {
    // Check if the move is legal using the isMoveLegal method.
    if (this.isMoveLegal(enemyGameboard, row, column)) {
      // If the move is legal, call the receiveAttack method on the enemy gameboard.
      enemyGameboard.receiveAttack(row, column);
    } else {
      // If the move is not legal, return a message indicating so.
      return "That move has already been made, choose another";
    }
  }

  // Method to make a random move against the enemy.
  makeRandomMove(enemyGameboard) {
    let row, column;
    // Keep generating random row and column values until a legal move is found.
    do {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
    } while (!this.isMoveLegal(enemyGameboard, row, column));

    // Return the row and column of the legal move.
    return { row, column };
  }
}
