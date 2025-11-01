const clickBtn = document.getElementById('clickBtn');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('bestScore');
const finalMessage = document.getElementById('finalMessage');
const circle = document.querySelector('.timer circle');

let score = 0;
let timeLeft = 10;
let gameActive = false;
let timer;
let bestScore = localStorage.getItem('bestScore') || 0;
bestScoreDisplay.textContent = bestScore;

clickBtn.addEventListener('click', () => {
  if (!gameActive) {
    startGame();
  } else {
    score++;
    scoreDisplay.textContent = score;
    animateButton();
  }
});

function startGame() {
  score = 0;
  timeLeft = 10;
  gameActive = true;
  scoreDisplay.textContent = score;
  clickBtn.textContent = "Click!";
  circle.style.strokeDashoffset = 0;
  finalMessage.classList.remove("show");
  finalMessage.textContent = "";
  updateTimer();

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function updateTimer() {
  timeDisplay.textContent = timeLeft;
  const dashOffset = ((10 - timeLeft) / 10) * 283;
  circle.style.strokeDashoffset = dashOffset;
}

function endGame() {
  clearInterval(timer);
  gameActive = false;
  clickBtn.textContent = "Restart";

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('bestScore', bestScore);
    bestScoreDisplay.textContent = bestScore;
  }

  finalMessage.innerHTML = `
    🎯 Final Score: <strong>${score}</strong><br>
    🎮 Game Completed! Click <strong>Restart</strong> to play again.
  `;
  finalMessage.classList.add("show");
}

function animateButton() {
  clickBtn.style.transform = 'scale(1.2)';
  setTimeout(() => (clickBtn.style.transform = 'scale(1)'), 100);
}

