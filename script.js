'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0E = document.querySelector('.player--0');
const player1E = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0];
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

class PlayerInfo {
  constructor(currentScore, activePlayer, playing) {
    this.currentScore = currentScore;
    this.activePlayer = activePlayer;
    this.playing = playing;
  }
  currentPlayer() {
    this.activePlayer = this.activePlayer === 0 ? 1 : 0;
  }

  diceNumber() {
    return Math.trunc(Math.random() * 6) + 1;
  }
}

const player = new PlayerInfo(0, 0, true);

const switchPlayer = () => {
  document.getElementById(`current--${player.activePlayer}`).textContent = 0;
  player.currentPlayer();
  player.currentScore = 0;
  player0E.classList.toggle('player--active');
  player1E.classList.toggle('player--active');
};

console.log(player.activePlayer);

btnRoll.addEventListener('click', () => {
  if (player.playing) {
    player.diceNumber();

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${player.diceNumber()}.png`;

    if (player.diceNumber() !== 1) {
      player.currentScore += player.diceNumber();
      document.getElementById(`current--${player.activePlayer}`).textContent =
        player.currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', _ => {
  if (player.playing) {
    scores[player.activePlayer] += player.currentScore;
    document.getElementById(`score--${player.activePlayer}`).textContent =
      scores[player.activePlayer];

    if (scores[player.activePlayer] >= 100) {
      player.playing = false;
      document
        .querySelector(`.player--${player.activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${player.activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', _ => {
  player.activePlayer = 0;
  player.currentScore = 0;
  player.playing = true;
  scores = [0, 0];
  document.getElementById(`score--${1}`).textContent = 0;
  document.getElementById(`score--${0}`).textContent = 0;
  document.querySelector(`.player--${0}`).classList.remove('player--winner');
  document.querySelector(`.player--${1}`).classList.remove('player--winner');
  document.querySelector(`.player--${0}`).classList.add('player--active');
  document.querySelector(`.player--${1}`).classList.remove('player--active');
});
