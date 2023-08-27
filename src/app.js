// Import necessary classes and styles
import "./Ship.js";
import "./Gameboard.js";
import "./Player.js";
import "./style.css";

// Import classes from other files
import { Gameboard } from "./Gameboard.js";
import { Player } from "./Player.js";

// Initialize gameboards for user and computer
let userBoard = new Gameboard();
let computerBoard = new Gameboard();

// Initialize players
let user = new Player();
let computer = new Player();

// Initialize game variables
let currentShipLength = 5;
let shipsPlaced = 0;
let currentOrientation = "horizontal";
let userRedSquares = 0;
let computerRedSquares = 0;
let gameEnded = false; // New variable to track if the game has ended

// Get DOM elements
const rotateButton = document.querySelector("#rotateButton");
const startButton = document.querySelector("#startButton");
const startOverButton = document.querySelector(".startOverButton");

// Event listener for rotating ship orientation
rotateButton.addEventListener("click", function () {
  currentOrientation =
    currentOrientation === "horizontal" ? "vertical" : "horizontal";
});

// Event listener for starting the game
startButton.addEventListener("click", function () {
  if (shipsPlaced !== 5) {
    alert("you Havent finished placing all of your ships");
    return;
  } else {
    // Enable computer board and disable buttons
    document
      .querySelector(".computerBoardContainer")
      .classList.remove("disabled");
    rotateButton.classList.add("disabled");
    startButton.classList.add("disabled");

    // Place computer's ships and set up event listeners for user attacks
    placeComputerShips();
    let computerGridCells = document.querySelectorAll(".grid-cell-computer");
    computerGridCells.forEach((cell) => {
      cell.addEventListener("click", handleUserAttack);
    });
  }
});

// Event listener for starting over
startOverButton.addEventListener("click", function () {
  // Reload the page to start over
  location.reload();
});

// Function to create both UI gameboards
function createGrid(player) {
  let gridContainer = document.querySelector(`.${player}GridContainer`);
  let row = 0;
  let col = 0;

  for (let i = 0; i < 100; i++) {
    let gridCell = document.createElement("div");
    gridContainer.appendChild(gridCell);
    gridCell.classList.add(`grid-cell-${player}`);
    gridCell.setAttribute("data-row", row);
    gridCell.setAttribute("data-col", col);

    if (player == "user") {
      gridCell.addEventListener("mouseover", highlightPlacement);
      gridCell.addEventListener("click", confirmPlacement);
    }

    col++;
    if (col === 10) {
      col = 0;
      row++;
    }
  }
}

// Function to highlight ship placement
function highlightPlacement(event) {
  const hoveredCell = event.target;
  const row = parseInt(hoveredCell.getAttribute("data-row"));
  const col = parseInt(hoveredCell.getAttribute("data-col"));

  const previouslyHighlighted = document.querySelectorAll(".highlight");
  previouslyHighlighted.forEach((cell) => cell.classList.remove("highlight"));

  for (let i = 0; i < currentShipLength; i++) {
    let cellToHighlight;
    if (currentOrientation === "horizontal") {
      cellToHighlight = document.querySelector(
        `[data-row='${row}'][data-col='${col + i}']`
      );
    } else {
      cellToHighlight = document.querySelector(
        `[data-row='${row + i}'][data-col='${col}']`
      );
    }
    if (cellToHighlight) {
      cellToHighlight.classList.add("highlight");
    }
  }
}

// Function to confirm ship placement on gameboard
function confirmPlacement(event) {
  let startRow = parseInt(event.target.getAttribute("data-row"));
  let startColumn = parseInt(event.target.getAttribute("data-col"));

  const result = userBoard.placeShip(
    currentShipLength,
    currentOrientation,
    startRow,
    startColumn
  );

  if (result === false) {
    alert("Illegal placement, either out of bounds or on taken spot");
    return;
  }

  let highlighted = document.querySelectorAll(".highlight");
  highlighted.forEach((cell) => {
    cell.classList.remove("highlight");
    cell.classList.add("ship-placed");
  });

  shipsPlaced++;

  if (shipsPlaced === 1) {
    currentShipLength = 4;
  } else if (shipsPlaced === 2 || shipsPlaced === 3) {
    currentShipLength = 3;
  } else if (shipsPlaced === 4) {
    currentShipLength = 2;
  }

  if (shipsPlaced === 5) {
    let userGridCells = document.querySelectorAll(".grid-cell-user");
    userGridCells.forEach((cell) => {
      cell.removeEventListener("mouseover", highlightPlacement);
      cell.removeEventListener("click", confirmPlacement);
    });
  }
}

// Function to randomly place computers ships on gameboard
function placeComputerShips() {
  const shipLengths = [5, 4, 3, 3, 2];
  const orientations = ["horizontal", "vertical"];

  shipLengths.forEach((length) => {
    let placed = false;

    while (!placed) {
      const randomRow = Math.floor(Math.random() * 10);
      const randomCol = Math.floor(Math.random() * 10);
      const randomOrientation =
        orientations[Math.floor(Math.random() * orientations.length)];

      placed = computerBoard.placeShip(
        length,
        randomOrientation,
        randomRow,
        randomCol
      );

      if (placed) {
        // Update the UI to reflect the ship placement
        for (let i = 0; i < length; i++) {
          let row = randomRow + (randomOrientation === "vertical" ? i : 0);
          let col = randomCol + (randomOrientation === "horizontal" ? i : 0);

          const cell = document.querySelector(
            `.grid-cell-computer[data-row='${row}'][data-col='${col}']`
          );
          if (cell) {
            cell.classList.add("computerShip-placed");
          }
        }
      }
    }
  });
}

// Function to handle user's attack
function handleUserAttack(event) {
  const row = parseInt(event.target.getAttribute("data-row"));
  const column = parseInt(event.target.getAttribute("data-col"));

  const result = user.attack(computerBoard, row, column);

  if (result === "That move has already been made, choose another") {
    alert(result);
    return;
  }

  const wasHit = computerBoard.receiveAttack(row, column);
  const cell = document.querySelector(
    `.grid-cell-computer[data-row='${row}'][data-col='${column}']`
  );

  if (wasHit) {
    cell.style.backgroundColor = "red";
    computerRedSquares++;
  } else {
    cell.style.backgroundColor = "purple";
  }

  // Added a check for gameEnded before calling gameOver() so alert message doesnt fire twice
  if (!gameEnded) {
    gameOver();
  }
  handleComputerAttack();
}

// Function to handle computer's randomly generated attacks
function handleComputerAttack() {
  const { row, column } = computer.makeRandomMove(userBoard);
  computer.attack(userBoard, row, column);

  const wasHit = userBoard.receiveAttack(row, column);
  const cell = document.querySelector(
    `.grid-cell-user[data-row='${row}'][data-col='${column}']`
  );

  if (wasHit) {
    cell.style.backgroundColor = "red";
    userRedSquares++;
  } else {
    cell.style.backgroundColor = "purple";
  }

  if (!gameEnded) {
    gameOver();
  }
}

// Function to check if any ship is sunk
function checkIfSunk(gameboard, player) {
  gameboard.ships.forEach((shipEntry) => {
    if (shipEntry.ship.isSunk() && !gameboard.sunkenShips.has(shipEntry)) {
      gameboard.sunkenShips.add(shipEntry);
      if (player === "user") {
        userSunkenShips++;
      } else {
        computerSunkenShips++;
      }
    }
  });
}

// Function to check for game over
function gameOver() {
  checkIfSunk(userBoard, "user");
  checkIfSunk(computerBoard, "computer");

  if (userRedSquares == 17) {
    alert("Computer wins!");
    startOverButton.classList.remove("disabled");
    gameEnded = true; // Set gameEnded to true
  } else if (computerRedSquares == 17) {
    alert("User wins!");
    startOverButton.classList.remove("disabled");
    gameEnded = true; // Set gameEnded to true
  }
}

createGrid("user");
createGrid("computer");
