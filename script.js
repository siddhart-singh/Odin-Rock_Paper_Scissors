"use strict";

let round = 1;
const computerScoreBoard = document.querySelector(".computer-points").children;
const computerScoreIcon = document.querySelector(".computer-icon").children;
const playerScoreBoard = document.querySelector(".player-points").children;
const computerChoice = document.querySelector(".computer").children;
const playerChoice = document.querySelector(".player");
const playerScoreIcon = document.querySelector(".player-icon").children;
const roundUI = document.querySelector(".round");
let currentComputerScore = 0;
let currentPlayerScore = 0;
let playerScore = 0;
let computerScore = 0;

function init() {
  //Computer Score

  for (let el of computerScoreBoard) {
    el.classList.add("hidden");
  }
  computerScoreBoard[0].classList.remove("hidden");

  for (let el of computerScoreIcon) {
    el.classList.add("hidden");
  }
  computerScoreIcon[2].classList.remove("hidden");
  //PLayer Score

  for (let el of playerScoreBoard) {
    el.classList.add("hidden");
  }
  playerScoreBoard[0].classList.remove("hidden");

  for (let el of playerScoreIcon) {
    el.classList.add("hidden");
  }
  playerScoreIcon[2].classList.remove("hidden");

  playerChoice.addEventListener("click", (e) => {
    
    if (round < 6) {
      game(e.target.alt.split("-")[1]);
    }
  });
}

function getComputerChoice() {
  const computerChoiceArray = ["rock", "paper", "scissor"];
  const computerChoiceIndex = getRandomNumber(0, 2);
  computerChoice[computerChoiceIndex].classList.add("selected");
  computerChoice[computerChoiceIndex].addEventListener("transitionend", () => {
    setTimeout(() => {
      computerChoice[computerChoiceIndex].classList.remove("selected");
    }, 500);
  });
  return computerChoiceArray[computerChoiceIndex];
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
  console.log(playerParity);
  if (result === "win") {
    playerScoreBoard[currentPlayerScore].classList.add("hidden");
    playerScoreBoard[++currentPlayerScore].classList.remove("hidden");
    console.log(
      `You Win! ${titleCase(optionsArray[playerParity])} beats ${titleCase(
        optionsArray[computerParity]
      )}`
    );
    return 1;
  } else if (result === "lose") {
    computerScoreBoard[currentComputerScore].classList.add("hidden");
    computerScoreBoard[++currentComputerScore].classList.remove("hidden");
    console.log(
      `You Lose! ${titleCase(optionsArray[computerParity])} beats ${titleCase(
        optionsArray[playerParity]
      )}`
    );
    return 0;
  } else {
    console.log(`Draw! Both picked ${titleCase(optionsArray[playerParity])}`);
    return 2;
  }
}

function displayScoreIcon(currentPlayerScore, currentComputerScore) {
  if (currentPlayerScore > currentComputerScore) {
    playerScoreIcon[1].classList.add("hidden");
    playerScoreIcon[2].classList.add("hidden");
    playerScoreIcon[3].classList.remove("hidden");

    computerScoreIcon[1].classList.remove("hidden");
    computerScoreIcon[2].classList.add("hidden");
    computerScoreIcon[3].classList.add("hidden");
  } else if (currentPlayerScore < currentComputerScore) {
    playerScoreIcon[1].classList.remove("hidden");
    playerScoreIcon[2].classList.add("hidden");
    playerScoreIcon[3].classList.add("hidden");

    computerScoreIcon[1].classList.add("hidden");
    computerScoreIcon[2].classList.add("hidden");
    computerScoreIcon[3].classList.remove("hidden");
  } else {
    playerScoreIcon[1].classList.add("hidden");
    playerScoreIcon[2].classList.remove("hidden");
    playerScoreIcon[3].classList.add("hidden");

    computerScoreIcon[1].classList.add("hidden");
    computerScoreIcon[2].classList.remove("hidden");
    computerScoreIcon[3].classList.add("hidden");
  }
}

function game(playerChoice) {
  const result = playRound(playerChoice, getComputerChoice());
  if (result == 0) {
    computerScore++;
    round++;
  } else if (result == 1) {
    playerScore++;
    round++;
  }
  displayScoreIcon(currentPlayerScore, currentComputerScore);
  updateRound(round);
  if (round > 5) {
    printResult(playerScore, computerScore);
  }
}

function printResult(playerScore, computerScore) {
  if (playerScore > computerScore) {
    for (let el of playerScoreIcon) {
      if (el.dataset.icon == "won") {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }

    for (let el of computerScoreIcon) {
      if (el.dataset.icon == "lost") {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
  } else {
    for (let el of playerScoreIcon) {
      if (el.dataset.icon == "lost") {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }

    for (let el of computerScoreIcon) {
      if (el.dataset.icon == "won") {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
  }
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

function updateRound(round){
  if(round < 6){
  roundUI.textContent = round;
  }else{
    roundUI.textContent = "";
  }
}

init();

