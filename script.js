"use strict";

function getPlayerChoice(){
    
    let incorrectInput = true;
    const avaliableChoice = ["rock", "paper", "scissor"];
    do{
        let playerChoice = prompt("Rock, Paper or Scissor? ");
        if(avaliableChoice.includes(playerChoice.toLowerCase())){
            incorrectInput = false;
            return playerChoice.toLowerCase();
        }
    }while(incorrectInput);
}

function getComputerChoice() {
  const computerChoice = ["rock", "paper", "scissor"];
  return computerChoice[getRandomNumber(0, 2)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function playRound(playerSelection = '', computerSelection = ''){
    const optionsArray = ["rock", "paper", "scissor"];
    const playerParity = optionsArray.indexOf(playerSelection.toLowerCase());
    const computerParity = optionsArray.indexOf(computerSelection.toLowerCase());
    return computeResult(playerParity, computerParity, optionsArray);
    
}

function computeResult(playerParity, computerParity, optionsArray){
    if (Math.abs(playerParity - computerParity) != (optionsArray.length - 1)){
        if (playerParity > computerParity){
            return [`You Win! ${titleCase(optionsArray[playerParity])} beats ${titleCase(optionsArray[computerParity])}`,1];
        }

        else if(computerParity == playerParity){
            return [`Draw! Both picked ${titleCase(optionsArray[playerParity])}`,2];
        }

        else{
            return [`You Lose! ${titleCase(optionsArray[computerParity])} beats ${titleCase(optionsArray[playerParity])}`,0];
        }
    }
    else{
        if (playerParity < computerParity){
            return [`You Win! ${titleCase(optionsArray[playerParity])} beats ${titleCase(optionsArray[computerParity])}`, 1];
        }
        else{
            return [`You Lose! ${titleCase(optionsArray[computerParity])} beats ${titleCase(optionsArray[playerParity])}`,0];
        }   
    }
}

function game(){
    let round  = 5;
    let playerScore = 0;
    let computerScore = 0;
    while(round--){
        const result = playRound(getPlayerChoice(),getComputerChoice());
        console.log(result[0])
        if(result[1] == 0){
            computerScore++
        }else if(result[1] == 1){
            playerScore++;
        }    
    }
    printResult(playerScore, computerScore);
}

function printResult(playerScore, computerScore){
    console.log(getResult(playerScore, computerScore));
}

function getResult(playerScore, computerScore){
    if(playerScore > computerScore){
        return "You Won!"
    } else{
        return "You Lost!"
    }
}

function titleCase(str = ''){
    if( str.length < 1){
        return str;
    }else if(str.length == 1){
        return str.toUpperCase();
    }else{
        return str[0].toUpperCase() + str.slice(1,str.length);
    }
}

game();