"use strict";

function getComputerChoice() {
  const computerChoice = ["rock", "paper", "scissor"];
  return computerChoice[getRandomNumber(1, 3)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min + 1);
}
