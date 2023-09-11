"use strict";

// const result = playRound("rock", getComputerChoice())
// console.log(result);

function getComputerChoice() {
  const computerChoice = ["rock", "paper", "scissor"];
  return computerChoice[getRandomNumber(0, 3)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function playRound(playerSelection = '', computerSelection = ''){
    const optionsArray = ["rock", "paper", "scissor"];
    const playerParity = optionsArray.indexOf(playerSelection.toLowerCase());
    const computerParity = optionsArray.indexOf(computerSelection.toLowerCase());
    return computerResult(playerParity, computerParity, optionsArray);
    
}

function computerResult(playerParity, computerParity, optionsArray){
    if (Math.abs(playerParity - computerParity) != (optionsArray.length - 1)){
        if (playerParity > computerParity){
            return `You Win! ${optionsArray[playerParity]} beats ${optionsArray[computerParity]}`;
        }

        else if(computerParity == playerParity){
            return `Draw! Both picked ${optionsArray[playerParity]}`
        }

        else{
            return `You Lose! ${optionsArray[computerParity]} beats ${optionsArray[playerParity]}`;
        }
    }
    else{
        if (playerParity < computerParity){
            return `You Win! ${optionsArray[playerParity]} beats ${optionsArray[computerParity]}`;
        }
        else{
            return `You Lose! ${optionsArray[computerParity]} beats ${optionsArray[playerParity]}`;
        }   
    }
}