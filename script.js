'use strict';

const createSecretNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};
let secretNumber = createSecretNumber();
let score = 20;
let highscore = 0;

let buttonCheckEl = document.querySelector('.check');
let buttonAgainEl = document.querySelector('.again');
let messageEl = document.querySelector('.message');
let numberEl = document.querySelector('.number');
let valueEl = document.querySelector('.guess');
let scoreEl = document.querySelector('.score');
let bodyEl = document.querySelector('body');
let highscoreEl = document.querySelector('.highscore');

const displayMessage = message => (messageEl.textContent = message);
const setNumber = number => (numberEl.textContent = number);
const setValue = value => (valueEl.value = value);
const setScore = value => (scoreEl.textContent = value);
const setBackgroundColor = color => (bodyEl.style.backgroundColor = color);
const setWidth = width => (numberEl.style.width = width);
const init = function () {
  score = 20;
  secretNumber = createSecretNumber();

  setValue('');
  setNumber('?');
  setScore(score);
  displayMessage('Start guessing...');
  setBackgroundColor('#222');
  setWidth('15rem');
  valueEl.readOnly = false;
};

buttonCheckEl.addEventListener('click', function () {
  const guess = Number(valueEl.value);
  // When there is no input
  if (!guess) {
    displayMessage('⛔ No Number!');

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');

    setNumber(secretNumber);

    setBackgroundColor('#60b347');

    setWidth('30rem');

    valueEl.readOnly = true;

    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
      score--;
      setScore(score);
    } else {
      displayMessage('💥 You lost the game!');
      setScore(0);
    }
  }
});

buttonAgainEl.addEventListener('click', init);
