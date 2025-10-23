let randomNumber;
let attempts;

// Initialize the game
function initGame() {
    randomNumber = Math.floor(Math.random() * 50) + 1;
    attempts = 0;
    document.getElementById('guessInput').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = 'message';
    document.getElementById('attempts').textContent = '';
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessBtn').disabled = false;
}

// Check if number is even
function isEven(num) {
    return num % 2 === 0;
}

// Handle guess
function handleGuess() {
    const guessInput = document.getElementById('guessInput');
    const messageDiv = document.getElementById('message');
    const attemptsDiv = document.getElementById('attempts');
    const guess = parseInt(guessInput.value);

    // Validation
    if (!guess || guess < 1 || guess > 50) {
        messageDiv.textContent = '⚠️ Please enter a valid number between 1 and 50!';
        messageDiv.className = 'message error';
        return;
    }

    attempts++;
    attemptsDiv.textContent = `Attempts: ${attempts}`;

    // Check if guess is correct
    if (guess === randomNumber) {
        messageDiv.textContent = `🎉 Congratulations! You guessed it right in ${attempts} attempts!`;
        messageDiv.className = 'message success';
        guessInput.disabled = true;
        document.getElementById('guessBtn').disabled = true;
        return;
    }

    // Provide hints
    let hints = [];
    
    // Higher or lower hint
    if (guess < randomNumber) {
        hints.push('📈 Try a BIGGER number');
    } else {
        hints.push('📉 Try a SMALLER number');
    }

    // Even/odd hint
    if (isEven(guess) !== isEven(randomNumber)) {
        if (isEven(randomNumber)) {
            hints.push('The number is EVEN');
        } else {
            hints.push('The number is ODD');
        }
    }

    // Range hint (give after 3 attempts)
    if (attempts >= 3) {
        const diff = Math.abs(guess - randomNumber);
        if (diff <= 5) {
            hints.push('🔥 You\'re very close!');
        } else if (diff <= 10) {
            hints.push('🌡️ Getting warmer!');
        } else if (diff <= 20) {
            hints.push('❄️ Still cold!');
        }
    }

    messageDiv.textContent = hints.join(' | ');
    messageDiv.className = 'message hint';
    guessInput.value = '';
    guessInput.focus();
}

// Event listeners
document.getElementById('guessBtn').addEventListener('click', handleGuess);

document.getElementById('guessInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

document.getElementById('resetBtn').addEventListener('click', initGame);

// Start the game when page loads
initGame();