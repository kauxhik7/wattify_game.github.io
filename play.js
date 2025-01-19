// script.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

let bike = { x: 100, y: 200, width: 50, height: 50, speedY: 0, gravity: 0.5 };
let obstacles = [];
let score = 0;
let gameRunning = false;

// Start Game
document.getElementById("play").addEventListener("click", function () {
  document.getElementById("home-screen").style.display = "none";
  canvas.style.display = "block";
  initializeGame();
});

function initializeGame() {
  bike = { x: 100, y: 200, width: 50, height: 50, speedY: 0, gravity: 0.5 };
  obstacles = [];
  score = 0;
  gameRunning = true;
  spawnObstacles();
  requestAnimationFrame(gameLoop);
}

function spawnObstacles() {
  setInterval(() => {
    if (gameRunning) {
      const obstacleSize = 40;
      const obstacleY = Math.random() * (canvas.height - obstacleSize);
      obstacles.push({ x: canvas.width, y: obstacleY, width: obstacleSize, height: obstacleSize });
    }
  }, 1500);
}

function drawBike() {
  ctx.fillStyle = "blue";
  ctx.fillRect(bike.x, bike.y, bike.width, bike.height);
}

function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach((obstacle) => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function updateObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.x -= 5; // Move obstacles to the left
  });
  obstacles = obstacles.filter((obstacle) => obstacle.x + obstacle.width > 0); // Remove off-screen obstacles
}

function detectCollision() {
  for (let obstacle of obstacles) {
    if (
      bike.x < obstacle.x + obstacle.width &&
      bike.x + bike.width > obstacle.x &&
      bike.y < obstacle.y + obstacle.height &&
      bike.y + bike.height > obstacle.y
    ) {
      gameRunning = false;
      alert(`Game Over! Your score: ${score}`);
      document.getElementById("home-screen").style.display = "block";
      canvas.style.display = "none";
    }
  }
}

function gameLoop() {
  if (!gameRunning) return;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw and update the bike
  bike.speedY += bike.gravity;
  bike.y += bike.speedY;

  if (bike.y > canvas.height - bike.height) {
    bike.y = canvas.height - bike.height; // Prevent bike from falling off the bottom
    bike.speedY = 0;
  }

  drawBike();

  // Update and draw obstacles
  updateObstacles();
  drawObstacles();

  // Collision detection
  detectCollision();

  // Draw the score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);

  // Increase the score
  score++;

  // Request the next frame
  requestAnimationFrame(gameLoop);
}

// Keyboard Controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && gameRunning) {
    bike.speedY = -10; // Jump effect
  }
});
