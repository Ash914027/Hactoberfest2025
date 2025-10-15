// Selected buttons and icons
const rockBtn = document.querySelector('.rock-btn');
const paperBtn = document.querySelector('.paper-btn');
const scissorBtn = document.querySelector('.scissors-btn');
const userHandIcon = document.querySelector('.user.hand-icon');
const computerHandIcon = document.querySelector('.computer.hand-icon');
const result = document.querySelector('.result');
const userScore = document.querySelector('.user-score');
const computerScore = document.querySelector('.computer-score');
const handsIcons = document.querySelectorAll('.hand-icon');
const gameButtons = document.querySelectorAll(
  '.rock-btn, .paper-btn, .scissors-btn'
);

// PopupOverlay
const popupOverlay = document.querySelector('.popup-overlay');
const popupTitle = document.querySelector('.popup-title');
const popupCloseBtn = document.querySelector('.popup-close-btn');

// Audio Elements
const clickSound = document.querySelector('.click-sound');
const shakeSound = document.querySelector('.shake-sound');
const winSound = document.querySelector('.win-sound');
const loseSound = document.querySelector('.lose-sound');

// Icons
const rockIcon = '✊';
const paperIcon = '🤚';
const scissorIcon = '✌️';

// play sound
function playSound(sound) {
  sound.currentTime = 0; // Reset to start so it can
  sound.play(); // Play the sound
}

// Computer Choice Array
const iconList = [rockIcon, paperIcon, scissorIcon];

function calculateResult(selectionIcon, winningIcon) {
  userHandIcon.innerText = '🤜';
  computerHandIcon.innerText = '🤛';
  result.innerText = '🙄';

  //start shake animation
  userHandIcon.classList.add('shakeUserHands');
  computerHandIcon.classList.add('shakeComputerHands');

  setTimeout(() => {
    userHandIcon.classList.remove('shakeUserHands');
    computerHandIcon.classList.remove('shakeComputerHands');

    // show user choice
    userHandIcon.innerText = selectionIcon;
    const computerChoice = Math.floor(Math.random() * 3);
    computerHandIcon.innerText = iconList[computerChoice];

    if (computerHandIcon.innerText === userHandIcon.innerText) {
      result.innerText = 'Draw';
    } else if (computerHandIcon.innerText === winningIcon) {
      result.innerText = 'You won!!';
      userScore.innerText = parseInt(userScore.innerText) + 1;
    } else {
      result.innerText = 'Sandeep Won!!';
      computerScore.innerText = parseInt(computerScore.innerText) + 1;
    }

    checkScore();
  }, 3000);
}

// check score
function checkScore() {
  const userScoreValue = parseInt(userScore.textContent);
  const computerScoreValue = parseInt(computerScore.textContent);
  if (userScoreValue === 3) {
    // show popup
    showPopup('You Wins! 🎉');
    playSound(winSound);
  } else if (computerScoreValue === 3) {
    // show popup
    showPopup('Sandeep Wins! 😒');
    playSound(loseSound);
  }
}
function showPopup(message) {
  popupTitle.textContent = message;
  popupOverlay.classList.add('active');
}
function hidePopup() {
  popupOverlay.classList.remove('active');
}
function resetGame() {
  userScore.textContent = '0';
  computerScore.textContent = '0';
  hidePopup();
}
popupCloseBtn.addEventListener('click', resetGame);

handsIcons.forEach((hand) => {
  hand.addEventListener('animationstart', () => {
    playSound(shakeSound); // Play shake sound
  });
});

gameButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    playSound(clickSound); // Play click sound
  });
});

rockBtn.addEventListener('click', () => {
  calculateResult(rockIcon, scissorIcon);
});
paperBtn.addEventListener('click', () => {
  calculateResult(paperIcon, rockIcon);
});
scissorBtn.addEventListener('click', () => {
  calculateResult(scissorIcon, paperIcon);
});
