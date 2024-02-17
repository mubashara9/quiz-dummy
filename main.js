import ScoreboardView from "./scoreboard/ScoreboardView.js";

let playerOneScore = 0;
let playerTwoScore = 0;

// Create audio elements for winner sound, player one, and background music. Tyrone says uppa selts.
const winnerAudio = new Audio(
  "https://www.td-dko.com/content/authoringtooldb/1389/7084F4BC-9E04-3DD1-DFD1-9C3EB54DB4C0.mp3"
);
const playerOneAudio = new Audio(
  "https://www.td-dko.com/content/authoringtooldb/1389/CD7C9B4F-B95D-3E45-B8C9-C2BFC50776B0.mp3"
);
const playerTwoAudio = new Audio(
  "https://www.td-dko.com/content/authoringtooldb/1389/CD7C9B50-BDD7-A08F-AEC5-52DAF80C4737.mp3"
);
const backgroundMusic = new Audio("");

// Get the root element by ID
const root = document.querySelector("#app");

// Initialize the ScoreboardView
const view = new ScoreboardView(
  root,
  "Player One",
  "Player Two",
  (player, direction) => {
    const difference = direction === "minus" ? -1 : 1;
    handleScoreAndAudio(player);

    // Update the scoreboard display
    view.update(playerOneScore, playerTwoScore);

    // Check for a winner when a player's score reaches 5
    if (playerOneScore >= 5 || playerTwoScore >= 5) {
      playWinnerAudio(); // Play winner audio and pause background music
      displayWinnerMessage(
        playerOneScore >= 5
          ? "Player 1 Wins. Great Success!!"
          : "Player 2 Wins. Great Success!!"
      );
      locked = true; // Lock the scoreboard
    }
  }
);

// Array of statements
const statements = [
  "Sometimes, driving without wearing a seatbelt is OK.",
  "Expensive office furniture is a waste of money.",
  "You should always support your co-workers even if you disagree with them.",
  "By the age of 21, you don’t need to study anymore.",
  "Artificial intelligence should replace human jobs.",
  "Qualifications are more important than experience.",
  "All unhealthy food and cigarettes should be banned for health reasons.",
  "All company offices should have a recreation room for staff.",
  "Healthcare should always be free for everyone.",
  "Making mistakes at work is OK. There's always someone who can fix them.",
  "Working hard is good for you.",
  "Job satisfaction is not as important as a big salary.",
  "You don't need to be around intelligent people to grow in your job.",
  "Always give positive feedback at work, even when employees make mistakes.",
  "Style is more important than substance.",
  "Where possible, humans should work from home.",
  "Poor performing employees should be supported by stronger employees.",
];

// Get elements
const statementText = document.getElementById("statement-text");
const generateStatementBtn = document.getElementById("generate-statement");

// Function to generate a random statement
function generateRandomStatement() {
  const randomIndex = Math.floor(Math.random() * statements.length);
  statementText.textContent = statements[randomIndex];
}

// Event listener for the Generate Statement button
generateStatementBtn.addEventListener("click", generateRandomStatement);

// Function to display winner message
function displayWinnerMessage(message) {
  const winnerMessage = document.createElement("div");
  winnerMessage.textContent = message;
  winnerMessage.className = "winner-message";
  winnerMessage.style.color = "red"; // Flash in red and yellow
  winnerMessage.style.backgroundColor = "yellow";
  winnerMessage.style.animation = "flash 1s linear infinite alternate"; // Flashing effect
  document.body.appendChild(winnerMessage);

  // Create Play Again button
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";
  playAgainButton.className = "play-again-button";
  playAgainButton.style.backgroundColor = "#92CD41"; // Lighter green
  playAgainButton.style.color = "white";
  playAgainButton.style.border = "1px solid white";
  playAgainButton.style.padding = "5px 10px";
  playAgainButton.style.fontSize = "1.5em";
  playAgainButton.style.position = "absolute";
  playAgainButton.style.top = "30%";
  playAgainButton.style.left = "50%";
  playAgainButton.style.transform = "translate(-50%, -50%)";

  playAgainButton.onclick = function () {
    // Reset scores and unlock the scoreboard
    playerOneScore = 0;
    playerTwoScore = 0;
    locked = false;
    view.updateScores(playerOneScore, playerTwoScore);

    // Remove the winner message and Play Again button
    document.body.removeChild(winnerMessage);
    document.body.removeChild(playAgainButton);
    winnerAudio.pause(); // Stop the winner sound
  };
  document.body.appendChild(playAgainButton);
}

// Add event listener for user interaction to start background audio
document.addEventListener(
  "click",
  () => {
    backgroundMusic.play();
  },
  { once: true }
); // Use

// Function to create and display Player One and Player Two buttons
function displayPlayerButtons() {
  const playerOneButton = document.createElement("button");
  playerOneButton.textContent = "Player One";
  playerOneButton.className = "player-button player-one";
  playerOneButton.style.fontFamily = "'Press Start 2P', sans-serif"; // Change font family
  playerOneButton.style.backgroundColor = "blue"; // Blue color
  playerOneButton.style.color = "white";
  playerOneButton.style.border = "1px solid white";
  playerOneButton.style.padding = "10px 20px";
  playerOneButton.style.fontSize = "1em";
  playerOneButton.style.position = "fixed";
  playerOneButton.style.bottom = "20%";
  playerOneButton.style.left = "40%";
  playerOneButton.onclick = function () {
    handleScoreAndAudio("one");
    view.update(playerOneScore, playerTwoScore);
  };
  document.body.appendChild(playerOneButton);

  const playerTwoButton = document.createElement("button");
  playerTwoButton.textContent = "Player Two";
  playerTwoButton.className = "player-button player-two";
  playerTwoButton.style.fontFamily = "'Press Start 2P', sans-serif"; // Change font family
  playerTwoButton.style.backgroundColor = "red"; // Red color
  playerTwoButton.style.color = "white";
  playerTwoButton.style.border = "1px solid white";
  playerTwoButton.style.padding = "10px 20px";
  playerTwoButton.style.fontSize = "1em";
  playerTwoButton.style.position = "fixed";
  playerTwoButton.style.bottom = "20%";
  playerTwoButton.style.right = "40%";
  playerTwoButton.onclick = function () {
    handleScoreAndAudio("two");
    view.update(playerOneScore, playerTwoScore);
  };
  document.body.appendChild(playerTwoButton);

  // Add event listeners to buttons for responsiveness on window resize
  window.addEventListener("resize", () => {
    updatePositions(playerOneButton, playerTwoButton);
  });

  // Call function to initially display buttons
  updatePositions(playerOneButton, playerTwoButton);
}

// Function to update positions of buttons
function updatePositions(playerOneButton, playerTwoButton) {
  const screenWidth = window.innerWidth;

  // Calculate new positions based on the screen width
  const leftMargin = screenWidth > 768 ? "40%" : "20%";
  const rightMargin = screenWidth > 768 ? "40%" : "20%";

  playerOneButton.style.left = leftMargin;
  playerTwoButton.style.right = rightMargin;
}

// Call the function to display Player One and Player Two buttons
//displayPlayerButtons();
// Function to generate a random sentence for Player One inside the box below Player One button
function generateRandomSentenceForPlayerOne() {
  const playerOneSentences = [
    "I completely agree that ...",
    "I totally agree with that ...",
    "I go along with that ...",
    "This statement has my full support because ...",
    "I’m all in favor of this because ...",
    "I’m all for this because ...",
  ];

  const randomIndex = Math.floor(Math.random() * playerOneSentences.length);
  const sentence = playerOneSentences[randomIndex];

  const playerOneBox = document.querySelector(".box-player-one");
  playerOneBox.textContent = sentence;
}

// Function to generate a random sentence for Player Two inside the box below Player Two button
function generateRandomSentenceForPlayerTwo() {
  const playerTwoSentences = [
    "I completely disagree that ...",
    "I totally disagree with that ...",
    "I can’t go along with that ...",
    "I’m dead set against this because ...",
    "I’m not in favor of this because ...",
    "I am strongly opposed to this statement because ...",
  ];

  const randomIndex = Math.floor(Math.random() * playerTwoSentences.length);
  const sentence = playerTwoSentences[randomIndex];

  const playerTwoBox = document.querySelector(".box-player-two");
  playerTwoBox.textContent = sentence;
}
displayPlayerButtons();
// Add click event listeners to Player One and Player Two buttons to display random sentences inside boxes
document
  .querySelector(".player-one")
  .addEventListener("click", generateRandomSentenceForPlayerOne);
document
  .querySelector(".player-two")
  .addEventListener("click", generateRandomSentenceForPlayerTwo);

// Function to create a box below Player One button
function createBoxBelowPlayerOne() {
  const box = document.createElement("div");
  box.textContent = "";
  box.style.fontFamily = "'Press Start 2P', sans-serif";
  box.style.fontSize = "1.10em";
  box.style.backgroundColor = "transparent"; // Transparent background color for Player Two box
  box.style.color = "#ffffff"; // White text color
  box.style.padding = "10px";
  box.style.textAlign = "center";
  box.style.position = "absolute";
  box.style.bottom = "40px"; // Adjust the bottom position as needed
  box.style.left = "44%";
  box.style.transform = "translateX(-50%)";
  box.style.width = "200px"; // Fixed width
  box.style.height = "100px"; // Fixed height
  box.style.border = "2px solid red"; // Blue border for Player One box
  box.className = "box-player-one"; // Add a class for easy selection
  if (window.matchMedia("(max-width: 768px)").matches) {
    box.style.bottom = "40px";
    box.style.left = "30%";
  }

  document.body.appendChild(box);
}

// Function to create a box below Player Two button
function createBoxBelowPlayerTwo() {
  const box = document.createElement("div");
  box.textContent = "";
  box.style.fontFamily = "'Press Start 2P', sans-serif";
  box.style.fontSize = "1.10em";
  box.style.backgroundColor = "transparent"; // Transparent background color for Player Two box
  box.style.color = "#ffffff"; // White text color
  box.style.padding = "10px";
  box.style.textAlign = "center";
  box.style.position = "absolute";
  box.style.bottom = "40px"; // Adjust the bottom position as needed
  box.style.left = "56%";
  box.style.transform = "translateX(-50%)";
  box.style.width = "200px"; // Fixed width
  box.style.height = "100px"; // Fixed height
  box.style.border = "2px solid blue"; // Red border for Player Two box
  box.className = "box-player-two"; // Add a class for easy selection
  if (window.matchMedia("(max-width: 768px)").matches) {
    box.style.bottom = "40px";
    box.style.left = "70%";
  }
  document.body.appendChild(box);
}

// Call functions to create boxes below Player One and Player Two buttons
createBoxBelowPlayerOne();
createBoxBelowPlayerTwo();
