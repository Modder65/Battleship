export class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.sunk = false;
  }

  hit() {
    this.timesHit++;
  }

  isSunk() {
    if (this.length == this.timesHit) {
      this.sunk = true;
    } else {
      this.sunk = false;
    }
    return this.sunk;
  }
}
