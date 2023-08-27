// Import necessary classes and styles
import "./Ship.js";
import "./Gameboard.js";
import "./Player.js";
import "./style.css";

import { Gameboard } from "./Gameboard.js";
import { Player } from "./Player.js";

let userBoard = new Gameboard();
let computerBoard = new Gameboard();

let user = new Player();
let computer = new Player();

let currentShipLength = 5;
let shipsPlaced = 0;
let currentOrientation = "horizontal";

let userRedSquares = 0;
let computerRedSquares = 0;
let gameEnded = false;

const rotateButton = document.querySelector("#rotateButton");
const startButton = document.querySelector("#startButton");
const startOverButton = document.querySelector(".startOverButton");

rotateButton.addEventListener("click", function () {
  currentOrientation =
    currentOrientation === "horizontal" ? "vertical" : "horizontal";
});

startButton.addEventListener("click", function () {
  if (shipsPlaced !== 5) {
    alert("you Havent finished placing all of your ships");
    return;
  } else {
    document
      .querySelector(".computerBoardContainer")
      .classList.remove("disabled");

    rotateButton.classList.add("disabled");
    startButton.classList.add("disabled");
    placeComputerShips();
    let computerGridCells = document.querySelectorAll(".grid-cell-computer");
    computerGridCells.forEach((cell) => {
      cell.addEventListener("click", handleUserAttack);
    });
  }
});

startOverButton.addEventListener("click", function () {
  // Reload the page to start over
  location.reload();
});

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

  if (!gameEnded) {
    gameOver();
  }
  handleComputerAttack();
}

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
