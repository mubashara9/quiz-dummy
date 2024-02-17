export default class ScoreboardView {
    constructor(root, playerOneName, playerTwoName, onControlButtonClick) {
        this.root = root;
        this.playerOneScore = 0; // Initialize player one score
        this.playerTwoScore = 0; // Initialize player two score
        this.locked = false; // Initialize locked state

        // Create audio elements for winner sound
        this.winnerAudio = new Audio('https://www.td-dko.com/content/authoringtooldb/1389/7084F4BC-9E04-3DD1-DFD1-9C3EB54DB4C0.mp3');
        this.backgroundMusic = new Audio('');
        this.backgroundMusic.loop = true;
        
 // Initialize click event to start background music
 let backgroundMusicStarted = false;
 const startBackgroundMusic = () => {
	 if (!backgroundMusicStarted) {
		 this.backgroundMusic.play();
		 backgroundMusicStarted = true;
	 }

     
 };

 document.addEventListener('click', startBackgroundMusic);



		// Create audio elements for Player 1 and Player 2
        this.playerOneAudio = new Audio('https://www.td-dko.com/content/authoringtooldb/1389/CD7C9B4F-B95D-3E45-B8C9-C2BFC50776B0.mp3');
        this.playerTwoAudio = new Audio('https://www.td-dko.com/content/authoringtooldb/1389/CD7C9B50-BDD7-A08F-AEC5-52DAF80C4737.mp3');

        // Set up the scoreboard HTML structure
        this.root.innerHTML = `
            <div class="scoreboard">
                <div class="scoreboard__name scoreboard__name--one">${playerOneName}</div>
                <div class="scoreboard__name scoreboard__name--two">${playerTwoName}</div>
                <div class="scoreboard__score" data-for-player="one">${this.playerOneScore}</div>
                <div class="scoreboard__score" data-for-player="two">${this.playerTwoScore}</div>
                <div class="scoreboard__controls" data-for-player="one">
                    <button class="scoreboard__control-button minus">-</button>
                    <button class="scoreboard__control-button plus">+</button>
                </div>
                <div class="scoreboard__controls" data-for-player="two">
                    <button class="scoreboard__control-button minus">-</button>
                    <button class="scoreboard__control-button plus">+</button>
                </div>
            </div>
        `;

        // Select all "+" buttons and attach click event listeners
        this.root.querySelectorAll(".plus").forEach(plusButton => {
            plusButton.addEventListener("click", () => {
                const player = plusButton.parentElement.dataset.forPlayer;

                if (!this.locked) {
                    if (player === "one") {
                        this.playerOneScore += 1; // Increment Player One's score by 1
                    } else {

 // Play Player One's audio when the score increases
 this.playerOneAudio.play(); // Play Player One's audio

                        this.playerTwoScore += 1; // Increment Player Two's score by 1
                    }

					// Play Player Two's audio when the score increases
					this.playerTwoAudio.play(); // Play Player Two's audio

                    // Update the displayed scores
                    this.update(this.playerOneScore, this.playerTwoScore);

                    // Callback function for score updates in the main script
                    onControlButtonClick(player, 'plus');
                }
            });
        });
    }

    // Method to update the scoreboard display with new scores
    update(playerOneScore, playerTwoScore) {
		this.root.querySelector(".scoreboard__score[data-for-player='one']").textContent = playerOneScore;
		this.root.querySelector(".scoreboard__score[data-for-player='two']").textContent = playerTwoScore;
	
		// Check for a winner when a player's score reaches 5
		if (playerOneScore >= 5 || playerTwoScore >= 5) {
			this.playWinnerAudio(); // Play winner audio
			this.locked = true; // Lock the scoreboard
			this.pauseBackgroundMusic(); // Pause background music
			this.displayWinnerMessage(playerOneScore >= 5 ? 'Player 1 Wins!! Great Success!!' : 'Player 2 Wins. Great Success!!');
			this.displayPlayAgainButton();
		}
	}

    // Method to play the winner audio
    playWinnerAudio() {
        this.winnerAudio.play();
    }

	// Method to stop the winner audio
    stopWinnerAudio() {
        this.winnerAudio.pause();
    }


    // Method to pause the background music
    pauseBackgroundMusic() {
        this.backgroundMusic.pause();
    }


    displayWinnerMessage(message) {
        const winnerMessage = document.createElement('div');
        winnerMessage.textContent = message;
        winnerMessage.className = 'winner-message';
        winnerMessage.style.color = 'red'; // Flash in red and yellow
        winnerMessage.style.backgroundColor = 'yellow';
        winnerMessage.style.animation = 'flash 1s linear infinite alternate'; // Flashing effect
        this.root.appendChild(winnerMessage);
    
        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Play Again';
        playAgainButton.className = 'play-again-button';
        playAgainButton.style.backgroundColor = '#92CD41'; // Lighter green
        playAgainButton.style.color = 'white';
        playAgainButton.style.border = '1px solid white';
        playAgainButton.style.padding = '10px 20px';
        playAgainButton.style.fontSize = '1.5em';
        playAgainButton.style.position = 'absolute';
        playAgainButton.style.top = 'calc(50% + 40px)'; // Update the top position to create a 40px space
        playAgainButton.style.left = '50%';
        playAgainButton.style.transform = 'translate(-50%, -50%)';
        playAgainButton.onclick = () => {
            this.playerOneScore = 0;
            this.playerTwoScore = 0;
            this.locked = false;
            this.update(this.playerOneScore, this.playerTwoScore);
            const winnerMessage = this.root.querySelector('.winner-message');
            const playAgainButton = this.root.querySelector('.play-again-button');
            if (winnerMessage) {
                this.root.removeChild(winnerMessage);
            }
            if (playAgainButton) {
                this.root.removeChild(playAgainButton);
            }
            this.stopWinnerAudio(); // Stop the winner audio
            this.backgroundMusic.play(); // Resume background music
    
            // Clear statement text
            const statementText = document.getElementById('statement-text');
            if (statementText) {
                statementText.textContent = '';
            }
    
            // Clear text in Player One box
            const playerOneBox = document.querySelector('.box-player-one');
            if (playerOneBox) {
                playerOneBox.textContent = '';
            }
    
            // Clear text in Player Two box
            const playerTwoBox = document.querySelector('.box-player-two');
            if (playerTwoBox) {
                playerTwoBox.textContent = '';
            }
        };
        this.root.appendChild(playAgainButton);
    }}
