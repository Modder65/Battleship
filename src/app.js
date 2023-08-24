import "./Ship.js";
import "./Gameboard.js";
import "./Player.js";
import "./style.css";

import { Ship } from "./Ship.js";
import { Gameboard } from "./Gameboard.js";
import { Player } from "./Player.js";

let player = new Player(false);
let shipLengths = [5, 4, 3, 3, 2]; // Ship lengths
let currentShipIndex = 0;
let orientation = "horizontal";

function initializeGame() {
  renderGameboards();
  document
    .getElementById("rotate-button")
    .addEventListener("click", rotateShip);
  document
    .getElementById("start-game-button")
    .addEventListener("click", startGame);
}

function rotateShip() {
  orientation = orientation === "horizontal" ? "vertical" : "horizontal";
}

function createGrid() {
  let grid = document.createElement("div");
  grid.id = "grid";
  for (let i = 0; i < 100; i++) {
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.addEventListener("mouseover", highlightShip);
    cell.addEventListener("click", placeShip);
    grid.appendChild(cell);
  }
  return grid;
}

function highlightShip(e) {
  let grid = document.getElementById("grid");
  let cells = Array.from(grid.children);
  let index = cells.indexOf(e.target);
  let length = shipLengths[currentShipIndex]; // Current ship length

  cells.forEach((cell) => cell.classList.remove("highlight"));

  for (let i = 0; i < length; i++) {
    let nextIndex = orientation === "horizontal" ? index + i : index + i * 10;
    if (nextIndex < cells.length) {
      cells[nextIndex].classList.add("highlight");
    }
  }
}

function placeShip(e) {
  let grid = document.getElementById("grid");
  let cells = Array.from(grid.children);
  let index = cells.indexOf(e.target);

  let startRow = Math.floor(index / 10);
  let startColumn = index % 10;

  let length = shipLengths[currentShipIndex]; // Current ship length

  // Place the ship on the player's gameboard
  let success = player.gameBoard.placeShip(
    length,
    orientation,
    startRow,
    startColumn
  );

  if (success) {
    for (let i = 0; i < length; i++) {
      let nextIndex = orientation === "horizontal" ? index + i : index + i * 10;
      if (nextIndex < cells.length) {
        cells[nextIndex].classList.add("ship");
        cells[nextIndex].classList.remove("highlight");
      }
    }
    currentShipIndex++; // Move to the next ship
    if (currentShipIndex >= shipLengths.length) {
      // All ships have been placed
      // You can add code here to transition to the next phase of the game
      document.getElementById("start-game-button").disabled = false;
    }
  }
}

function renderGameboards() {
  let gridContainer = document.getElementById("grid-container");
  let computerGridContainer = document.getElementById(
    "computer-grid-container"
  );
  gridContainer.innerHTML = "";
  computerGridContainer.innerHTML = "";
  gridContainer.appendChild(createGrid());
  computerGridContainer.appendChild(createGrid()); // Create computer's grid
}

function startGame() {
  document.getElementById("computer-board").style.display = "block";
}

initializeGame();
