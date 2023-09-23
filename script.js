"use strict";

let round = 5;
//Computer Score
const computerScoreBoard = document.querySelector(
  ".computer-score > .points"
).children;

for (let el of computerScoreBoard) {
  el.classList.add("hidden");
}
let currentComputerScore = 0;
computerScoreBoard[0].classList.remove("hidden");

//PLayer Score

const playerScoreBoard = document.querySelector(
  ".player-score > .points"
).children;

for (let el of playerScoreBoard) {
  el.classList.add("hidden");
}
let currentPlayerScore = 0;
playerScoreBoard[0].classList.remove("hidden");

const playerChoice = document.querySelector(".player");
playerChoice.addEventListener("click", (e) => {
  game(e.target.alt.split("-")[1]);
});

function getPlayerChoice() {}
function getComputerChoice() {
  const computerChoice = ["rock", "paper", "scissor"];
  return computerChoice[getRandomNumber(0, 2)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function playRound(playerSelection = "", computerSelection = "") {
  const optionsArray = ["rock", "paper", "scissor"];
  const playerParity = optionsArray.indexOf(playerSelection.toLowerCase());
  const computerParity = optionsArray.indexOf(computerSelection.toLowerCase());
  return computeResult(playerParity, computerParity, optionsArray);
}

function computeResult(playerParity, computerParity, optionsArray) {
  if (Math.abs(playerParity - computerParity) != optionsArray.length - 1) {
    if (playerParity > computerParity) {
      return printComputeResult(
        "win",
        playerParity,
        computerParity,
        optionsArray
      );
    } else if (computerParity == playerParity) {
      return printComputeResult(
        "draw",
        playerParity,
        computerParity,
        optionsArray
      );
    } else {
      return printComputeResult(
        "lose",
        playerParity,
        computerParity,
        optionsArray
      );
    }
  } else {
    if (playerParity < computerParity) {
      return printComputeResult(
        "win",
        playerParity,
        computerParity,
        optionsArray
      );
    } else {
      return printComputeResult(
        "lose",
        playerParity,
        computerParity,
        optionsArray
      );
    }
  }
}

function printComputeResult(
  result,
  playerParity,
  computerParity,
  optionsArray
) {

  if (result === "win") {
    playerScoreBoard[currentPlayerScore].classList.add("hidden");
    playerScoreBoard[++currentPlayerScore].classList.remove("hidden");
    console.log(`You Win! ${titleCase(optionsArray[playerParity])} beats ${titleCase(optionsArray[computerParity])}`);
    return 1;
  } else if (result === "lose") {
    computerScoreBoard[currentComputerScore].classList.add("hidden");
    computerScoreBoard[++currentComputerScore].classList.remove("hidden");
    console.log(`You Lose! ${titleCase(optionsArray[computerParity])} beats ${titleCase(optionsArray[playerParity])}`)
    return 0;
  } else {
    console.log(`Draw! Both picked ${titleCase(optionsArray[playerParity])}`)
    return 2;
  }
}

function game(playerChoice) {
  let playerScore = 0;
  let computerScore = 0;
  const result = playRound(playerChoice, getComputerChoice());
  if (round > 0) {
    if (result == 0) {
      computerScore++;
      round--;
    } else if (result == 1) {
      playerScore++;
      round--;
    }
  } else {
    printResult(playerScore, computerScore);
  }
}

function printResult(playerScore, computerScore) {
  console.log(getResult(playerScore, computerScore));
}

function getResult(playerScore, computerScore) {
  if (playerScore > computerScore) {
    return "You Won!";
  } else {
    return "You Lost!";
  }
}

function titleCase(str = "") {
  if (str.length < 1) {
    return str;
  } else if (str.length == 1) {
    return str.toUpperCase();
  } else {
    return str[0].toUpperCase() + str.slice(1, str.length);
  }
}
