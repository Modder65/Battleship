import { Ship } from "../src/Ship.js";
import { Gameboard } from "../src/Gameboard.js";
import { Player } from "../src/Player.js";

/* SHIP CLASS */

describe("Ship", () => {
  test("creates a new ship with the correct length", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
  });

  describe("hit()", () => {
    test("increases the number of hits in your ship", () => {
      const ship = new Ship(3);
      ship.hit();
      expect(ship.timesHit).toBe(1);
    });
  });

  describe("isSunk()", () => {
    test("the value of the sunk property becomes true when a ship is sunk", () => {
      const ship = new Ship(2);
      ship.hit();
      ship.hit();
      ship.isSunk();
      expect(ship.timesHit).toBe(2);
      expect(ship.sunk).toBe(true);
    });

    test("the value of the sunk property stays false when a ship hasn't been sunk", () => {
      const ship = new Ship(2);
      ship.hit();
      ship.isSunk();
      expect(ship.timesHit).toBe(1);
      expect(ship.sunk).toBe(false);
    });
  });
});

/* GAMEBOARD CLASS*/

describe("Gameboard", () => {
  describe("placeShip()", () => {
    test("places a ship on the gameboard horizontally", () => {
      let board = new Gameboard();
      let shipEntry = board.placeShip(3, "horizontal", 2, 4);
      expect(shipEntry.coordinates).toStrictEqual([
        { row: 2, column: 4 },
        { row: 2, column: 5 },
        { row: 2, column: 6 },
      ]);
    });

    test("places a ship on the gameboard vertically", () => {
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
    test("hits a ship when coordinates match", () => {
      let board = new Gameboard();
      board.placeShip(3, "horizontal", 2, 4);
      board.receiveAttack(2, 4);
      expect(board.ships[0].ship.timesHit).toBe(1);
      expect(board.missedHits.length).toBe(0);
    });

    test("misses a ship when coordinates don't match", () => {
      let board = new Gameboard();
      board.placeShip(3, "horizontal", 2, 4);
      board.receiveAttack(1, 1);
      expect(board.ships[0].ship.timesHit).toBe(0);
      expect(board.missedHits).toStrictEqual([{ row: 1, column: 1 }]);
    });
  });

  describe("allShipsSunk()", () => {
    test("returns false when not all ships are sunk", () => {
      let board = new Gameboard();
      board.placeShip(3, "horizontal", 2, 4);
      board.receiveAttack(2, 4);
      expect(board.allShipsSunk()).toBe(false);
    });

    test("returns true when all ships are sunk", () => {
      let board = new Gameboard();
      board.placeShip(3, "horizontal", 2, 4);
      board.receiveAttack(2, 4);
      board.receiveAttack(2, 5);
      board.receiveAttack(2, 6);
      expect(board.allShipsSunk()).toBe(true);
    });
  });
});

/* PLAYER CLASS */

describe("Player", () => {
  let player;
  let enemyGameboard;

  beforeEach(() => {
    player = new Player();
    enemyGameboard = new Gameboard();
  });

  describe("attack()", () => {
    test("attacks the enemy gameboard at specific coordinates", () => {
      player.attack(enemyGameboard, 3, 4);
      expect(player.previousAttacks).toContainEqual({ row: 3, column: 4 });
    });

    test("records the attack in previousAttacks", () => {
      player.attack(enemyGameboard, 5, 6);
      expect(player.previousAttacks).toContainEqual({ row: 5, column: 6 });
    });
  });

  describe("makeRandomMove()", () => {
    test("makes a random legal move", () => {
      player.makeRandomMove(enemyGameboard);
      expect(player.previousAttacks.length).toBe(1);
    });

    test("does not attack the same coordinate twice", () => {
      for (let i = 0; i < 100; i++) {
        player.makeRandomMove(enemyGameboard);
      }
      const uniqueAttacks = new Set(player.previousAttacks.map(JSON.stringify));
      expect(uniqueAttacks.size).toBe(player.previousAttacks.length);
    });
  });
});
