class MemoryCardGame {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.moves = 0;
        this.matches = 0;
        this.gameStarted = false;
        this.startTime = null;
        this.timerInterval = null;
        
        // Card symbols - 8 pairs
        this.symbols = ['🎯', '🎨', '🎪', '🎭', '🎸', '🎹', '🎺', '🎻'];
        
        this.initializeElements();
        this.attachEventListeners();
        this.createCards();
        this.updateDisplay();
    }
    
    initializeElements() {
        this.gameBoard = document.getElementById('gameBoard');
        this.movesDisplay = document.getElementById('moves');
        this.timerDisplay = document.getElementById('timer');
        this.matchesDisplay = document.getElementById('matches');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.gameOverModal = document.getElementById('gameOverModal');
        this.finalMoves = document.getElementById('finalMoves');
        this.finalTime = document.getElementById('finalTime');
        this.playAgainBtn = document.getElementById('playAgainBtn');
    }
    
    attachEventListeners() {
        this.newGameBtn.addEventListener('click', () => this.newGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.playAgainBtn.addEventListener('click', () => this.closeModal());
    }
    
    createCards() {
        this.gameBoard.innerHTML = '';
        this.cards = [];
        
        // Create pairs of cards
        const cardSymbols = [...this.symbols, ...this.symbols];
        
        // Shuffle the cards
        this.shuffleArray(cardSymbols);
        
        // Create card elements
        cardSymbols.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            card.innerHTML = '?';
            
            card.addEventListener('click', () => this.flipCard(card));
            
            this.cards.push(card);
            this.gameBoard.appendChild(card);
        });
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    flipCard(card) {
        // Don't allow flipping if card is already flipped or matched
        if (card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }
        
        // Start timer on first move
        if (!this.gameStarted) {
            this.startTimer();
            this.gameStarted = true;
        }
        
        // Flip the card
        card.classList.add('flipped');
        card.innerHTML = card.dataset.symbol;
        this.flippedCards.push(card);
        
        // Check if two cards are flipped
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.updateDisplay();
            
            setTimeout(() => {
                this.checkMatch();
            }, 500);
        }
    }
    
    checkMatch() {
        const [card1, card2] = this.flippedCards;
        
        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Match found!
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.matches++;
            this.updateDisplay();
            
            // Check if game is complete
            if (this.matches === this.symbols.length) {
                setTimeout(() => {
                    this.gameComplete();
                }, 500);
            }
        } else {
            // No match - flip cards back
            card1.classList.add('wrong');
            card2.classList.add('wrong');
            
            setTimeout(() => {
                card1.classList.remove('flipped', 'wrong');
                card2.classList.remove('flipped', 'wrong');
                card1.innerHTML = '?';
                card2.innerHTML = '?';
            }, 500);
        }
        
        this.flippedCards = [];
    }
    
    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }
    
    updateTimer() {
        if (this.startTime) {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    updateDisplay() {
        this.movesDisplay.textContent = this.moves;
        this.matchesDisplay.textContent = `${this.matches}/${this.symbols.length}`;
    }
    
    gameComplete() {
        clearInterval(this.timerInterval);
        this.finalMoves.textContent = this.moves;
        this.finalTime.textContent = this.timerDisplay.textContent;
        this.gameOverModal.classList.add('show');
    }
    
    closeModal() {
        this.gameOverModal.classList.remove('show');
        this.newGame();
    }
    
    newGame() {
        this.resetGame();
        this.createCards();
    }
    
    resetGame() {
        // Reset game state
        this.flippedCards = [];
        this.moves = 0;
        this.matches = 0;
        this.gameStarted = false;
        this.startTime = null;
        
        // Clear timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        // Reset display
        this.timerDisplay.textContent = '00:00';
        this.updateDisplay();
        
        // Clear all card states
        this.cards.forEach(card => {
            card.classList.remove('flipped', 'matched', 'wrong');
            card.innerHTML = '?';
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MemoryCardGame();
});
