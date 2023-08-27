import { Ship } from "../src/Ship.js";
import { Gameboard } from "../src/Gameboard.js";
import { Player } from "../src/Player.js";

/* SHIP CLASS */

describe("Ship", () => {
  test("Creates a ship with the specified length", () => {
    let ship = new Ship(4);
    expect(ship.length).toBe(4);
  });

  describe("hit()", () => {
    test("Records a hit on a ship", () => {
      let ship = new Ship(4);
      ship.hit();
      expect(ship.timesHit).toBe(1);
    });
  });

  describe("isSunk()", () => {
    test("Checks if a ship has been sunk", () => {
      let ship = new Ship(3);
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });

    test("Checks if a ship has not been sunk", () => {
      let ship = new Ship(3);
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(false);
    });
  });
});

/* GAMEBOARD CLASS */

describe("Gameboard", () => {
  describe("placeShip()", () => {
    test("Places a ship horizontally at the specified coordinates", () => {
      let board = new Gameboard();
      let shipEntry = board.placeShip(3, "horizontal", 2, 3);
      expect(shipEntry.coordinates).toStrictEqual([
        { row: 2, column: 3 },
        { row: 2, column: 4 },
        { row: 2, column: 5 },
      ]);
    });

    test("Places a ship vertically at the specified coordinates", () => {
      let board = new Gameboard();
      let shipEntry = board.placeShip(3, "vertical", 3, 5);
      expect(shipEntry.coordinates).toStrictEqual([
        { row: 3, column: 5 },
        { row: 4, column: 5 },
        { row: 5, column: 5 },
      ]);
    });
  });

  describe("receiveAttack()", () => {
    test("If an attack hits a ship increment timesHit by 1", () => {
      let board = new Gameboard();
      let shipEntry = board.placeShip(3, "vertical", 3, 5);
      board.receiveAttack(4, 5);
      expect(shipEntry.ship.timesHit).toBe(1);
      expect(board.missedHits).toStrictEqual([]);
    });

    test("If an attack misses a ship append attack coordinates to missedHits array", () => {
      let board = new Gameboard();
      let shipEntry = board.placeShip(3, "vertical", 3, 5);
      board.receiveAttack(6, 7);
      expect(shipEntry.ship.timesHit).toBe(0);
      expect(board.missedHits).toStrictEqual([{ row: 6, column: 7 }]);
    });
  });
});

/* PLAYER CLASS */

describe("Player", () => {
  describe("isMoveLegal()", () => {
    test("Checks if a given move is legal", () => {
      let computerBoard = new Gameboard();
      let computer = new Player();
      computerBoard.receiveAttack(4, 6);
      expect(computer.isMoveLegal(computerBoard, 4, 5)).toBe(true);
    });

    test("Checks if a given move is illegal", () => {
      let computerBoard = new Gameboard();
      let computer = new Player();
      computerBoard.receiveAttack(4, 5);
      expect(computer.isMoveLegal(computerBoard, 4, 5)).toBe(false);
    });
  });

  describe("attack()", () => {
    test("Makes an attack on the enemy gameboard if move is legal", () => {
      let computerBoard = new Gameboard();
      let user = new Player();
      user.attack(computerBoard, 2, 3);
      expect(computerBoard.allAttacks).toStrictEqual([{ row: 2, column: 3 }]);
    });

    test("Returns a message if the move if move is illegal", () => {
      let computerBoard = new Gameboard();
      let user = new Player();
      computerBoard.receiveAttack(2, 3);
      const result = user.attack(computerBoard, 2, 3);
      expect(result).toBe("That move has already been made, choose another");
    });
  });

  describe("makeRandomMove()", () => {
    test("Generates a random legal move", () => {
      let userBoard = new Gameboard();
      let computer = new Player();
      const move = computer.makeRandomMove(userBoard);

      expect(move.row).toBeGreaterThanOrEqual(0);
      expect(move.row).toBeLessThanOrEqual(9);
      expect(move.column).toBeGreaterThanOrEqual(0);
      expect(move.column).toBeLessThanOrEqual(9);
      expect(computer.isMoveLegal(userBoard, move.row, move.column)).toBe(true);
    });
  });
});
