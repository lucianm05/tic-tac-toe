const circle = document.getElementById('circle');
const cross = document.getElementById('cross');
const optionsMenu = document.getElementById('options-menu');
const options = document.getElementById('options');

const circleIcon = '<i class="far fa-circle"></i>';
const crossIcon = '<i class="fas fa-times"></i>';

const mainTable = document.getElementById('main-table');

const tab1 = document.getElementById('tab1');
const tab2 = document.getElementById('tab2');
const tab3 = document.getElementById('tab3');
const tab4 = document.getElementById('tab4');
const tab5 = document.getElementById('tab5');
const tab6 = document.getElementById('tab6');
const tab7 = document.getElementById('tab7');
const tab8 = document.getElementById('tab8');
const tab9 = document.getElementById('tab9');

const winText = document.getElementById('win');
const tieText = document.getElementById('tie');
const loseText = document.getElementById('lose');
const gameOverTable = document.getElementById('gameover');

const scoreMenu = document.getElementById('score-menu');
const playerScore = document.getElementById('player-score');
const opponentScore = document.getElementById('opponent-score');
const replay = document.getElementById('replay');

let playerScoreValue = 0;
let opponentScoreValue = 0;

let randomNumber;
let index;
let indexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let player;
let opponent;
let tabsArray = [tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8, tab9];

function choose(plr, opp) {
  player = plr;
  opponent = opp;
  optionsMenu.style.display = 'none';
  mainTable.style.display = 'grid';
  scoreMenu.style.display = 'grid';
}

// Player choosing circle
function chooseCircle() {
  choose(circleIcon, crossIcon);
}

//Player choosing cross
function chooseCross() {
  choose(crossIcon, circleIcon);
}

// Player choosing the card to fill and the calculator chooses a random card
function chooseCard(e) {
  generateRandomNumber();
  let target = e.target;
  if (target.classList.value === 'card') {
    tabsArray.splice(tabsArray.indexOf(target), 1);
    target.innerHTML = player;
    target.classList.value += ' player';
    checkGameOver();
    if (tabsArray.length !== 0) {
      tabsArray[index].innerHTML = opponent;
      tabsArray[index].classList.value += ' opponent';
      tabsArray.splice(index, 1);
    }
  }
  checkGameOver();
}

// Generates a random number and the calculator fills the corresponding card
function generateRandomNumber() {
  randomNumber = Math.random() * (tabsArray.length - 1);
  index = parseInt(randomNumber);
  indexArray.splice(indexArray.indexOf(index), 1);
  return index;
}

function gameOver(card1, card2, card3) {
  const playerWinCondition = 'card player';
  const opponentWinCondition = 'card opponent';
    if (card1.classList.value === playerWinCondition && card2.classList.value === playerWinCondition && card3.classList.value === playerWinCondition) {
      tabsArray = [];
      playerScoreValue += 0.5;
      gameResult(winText, playerScoreValue, playerScore);
    } else if (card1.classList.value === opponentWinCondition && card2.classList.value === opponentWinCondition && card3.classList.value === opponentWinCondition) {
      tabsArray = [];
      opponentScoreValue++;
      gameResult(loseText, opponentScoreValue, opponentScore);
    }
    if(tabsArray.length === 0) {
      gameOverTable.style.display = 'block';
      replay.style.display = 'block';
    }
}

function gameResult(result, winnerScore, winner) {
  result.style.display = 'block';
  winner.innerHTML = winnerScore;
  gameOverTable.style.display = 'block';
}

// Checks if the conditions to win are met
function checkGameOver() {
  gameOver(tab1, tab2, tab3);
  gameOver(tab4, tab5, tab6);
  gameOver(tab7, tab8, tab9);
  gameOver(tab1, tab5, tab9);
  gameOver(tab3, tab5, tab7);
  gameOver(tab1, tab4, tab7);
  gameOver(tab2, tab5, tab8);
  gameOver(tab3, tab6, tab9);
}

// Resets the game
function replayGame() {
  tabsArray = [tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8, tab9];
  indexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  gameOverTable.style.display = 'none';
  replay.style.display = 'none';
  winText.style.display = 'none';
  loseText.style.display = 'none';
  tieText.style.display = 'none';
  clearTheTable();
}

// Clears the table
function clearTheTable() {
  for (let i = 0; i < tabsArray.length; i++) {
    tabsArray[i].classList.remove('player');
    tabsArray[i].classList.remove('opponent');
    tabsArray[i].innerHTML = '';
  }
}

circle.addEventListener('click', chooseCircle);
cross.addEventListener('click', chooseCross);
mainTable.addEventListener('click', chooseCard);
replay.addEventListener('click', replayGame);
