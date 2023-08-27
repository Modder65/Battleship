// Define a Ship class
export class Ship {
  // The constructor initializes the Ship object with a given length and sets timesHit to 0.
  constructor(length) {
    this.length = length; // The length of the ship, determined by the number of squares it occupies.
    this.timesHit = 0; // The number of times this ship has been hit. Initialized to 0.
  }

  // The hit method increments the timesHit property by 1.
  // This is called whenever the ship is hit during the game.
  hit() {
    this.timesHit++;
  }

  // The isSunk method checks if the ship is sunk.
  // A ship is considered sunk if the number of times it has been hit equals its length.
  isSunk() {
    return this.length === this.timesHit;
  }
}
