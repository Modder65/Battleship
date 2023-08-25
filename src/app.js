// Import necessary classes and styles
import "./Ship.js";
import "./Gameboard.js";
import "./Player.js";
import "./style.css";

import { Ship } from "./Ship.js";
import { Gameboard } from "./Gameboard.js";
import { Player } from "./Player.js";

// Initialize player, ship lengths, current ship index, and orientation
let player = new Player(false);
let computer = new Player(true);
let shipLengths = [5, 4, 3, 3, 2];
let currentShipIndex = 0;
let orientation = "horizontal";
let computerCells;

// Function to initialize the game
function initializeGame() {
  renderGameboards();
  document
    .getElementById("rotate-button")
    .addEventListener("click", rotateShip);
  document
    .getElementById("start-game-button")
    .addEventListener("click", startGame);
}

// Function to rotate the ship orientation
function rotateShip() {
  orientation = orientation === "horizontal" ? "vertical" : "horizontal";
}

// Function to create the grid for the gameboard
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

// Function to highlight the ship on hover
function highlightShip(e) {
  let grid = document.getElementById("grid");
  let cells = Array.from(grid.children);
  let index = cells.indexOf(e.target);
  let length = shipLengths[currentShipIndex]; // Get the length of the current ship

  cells.forEach((cell) => cell.classList.remove("highlight"));

  // Highlight cells based on orientation
  for (let i = 0; i < length; i++) {
    let nextIndex = orientation === "horizontal" ? index + i : index + i * 10;
    if (nextIndex < cells.length) {
      cells[nextIndex].classList.add("highlight");
    }
  }
}

// Function to place the ship on click
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

  // If the ship is successfully placed, move to the next ship
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
      // Enable the start game button if all ships have been placed
      document.getElementById("start-game-button").disabled = false;
    }
  }
}

// Function to randomly place the computer's ships
function placeComputerShips() {
  let computerGridContainer = document.getElementById(
    "computer-grid-container"
  );
  let computerCells = Array.from(computerGridContainer.children[0].children);

  // Iterate through the ship lengths to place each ship
  shipLengths.forEach((length) => {
    let success = false;

    // Keep trying to place the ship until successful
    while (!success) {
      let randomIndex = Math.floor(Math.random() * 100);
      let randomOrientation = Math.random() < 0.5 ? "horizontal" : "vertical";
      let startRow = Math.floor(randomIndex / 10);
      let startColumn = randomIndex % 10;

      // Check if the ship would be out of bounds
      if (
        (randomOrientation === "horizontal" && startColumn + length > 9) ||
        (randomOrientation === "vertical" && startRow + length > 9)
      ) {
        continue; // Skip this iteration and try again
      }

      // Check if the ship would be connected to another ship
      let connected = false;
      for (let i = -1; i <= length; i++) {
        let row = randomOrientation === "horizontal" ? startRow : startRow + i;
        let column =
          randomOrientation === "horizontal" ? startColumn + i : startColumn;

        if (
          computer.gameBoard.takenSpots.some(
            (spot) => spot.row === row && spot.column === column
          )
        ) {
          connected = true;
          break;
        }
      }
      if (connected) continue; // Skip this iteration and try again

      // Attempt to place the ship on the computer's gameboard
      success = computer.gameBoard.placeShip(
        length,
        randomOrientation,
        startRow,
        startColumn
      );

      // If successful, update the UI (optional, as the computer's ships are hidden)
      if (success) {
        for (let i = 0; i < length; i++) {
          let nextIndex =
            randomOrientation === "horizontal"
              ? randomIndex + i
              : randomIndex + i * 10;
          if (nextIndex < computerCells.length) {
            // You can add a class to style the computer's ships if needed
            computerCells[nextIndex].classList.add("computer-ship");
          }
        }
      }
    }
  });
}

// Function to render both player's and computer's gameboards
function renderGameboards() {
  let gridContainer = document.getElementById("grid-container");
  let computerGridContainer = document.getElementById(
    "computer-grid-container"
  );
  gridContainer.innerHTML = "";
  computerGridContainer.innerHTML = "";
  gridContainer.appendChild(createGrid());
  computerGridContainer.appendChild(createGrid()); // Create computer's grid
  computerCells = Array.from(computerGridContainer.children[0].children); // Get reference to computer's cells
}

// Function to start the game by displaying the computer's board
// Hides the rotate and start button after game is started
function startGame() {
  document.getElementById("computer-board").style.display = "block";
  document.getElementById("start-game-button").style.display = "none";
  document.getElementById("rotate-button").style.display = "none";
  placeComputerShips();
  computerCells.forEach((cell) => {
    cell.addEventListener("click", playerTurn);
  });
}

// Function to handle the player's turn
function playerTurn(e) {
  let index = computerCells.indexOf(e.target);
  if (index === -1) return; // Check if the target element is part of the expected array

  let row = Math.floor(index / 10);
  let col = index % 10;

  let hit = computer.gameBoard.receiveAttack(row, col);
  e.target.style.backgroundColor = hit ? "red" : "purple";
  computerTurn();
}

// Function to handle the computer's turn
function computerTurn() {
  let [row, col] = computer.makeRandomMove(player.gameBoard); // Make sure to pass the player's gameboard

  // Check if the attack coordinates are valid
  let hit = player.gameBoard.ships.some((shipEntry) =>
    shipEntry.coordinates.some(
      (coord) => coord.row === row && coord.column === col
    )
  );
  let playerCells = Array.from(document.getElementById("grid").children);
  let index = row * 10 + col;
  playerCells[index].style.backgroundColor = hit ? "red" : "purple"; // Change color to red if hit, purple if miss
}

// Call initializeGame to start the game setup
initializeGame();
