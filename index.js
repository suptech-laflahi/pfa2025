let ctx;
let player1Y, player2Y, ballX, ballY, ballSpeedX, ballSpeedY, player1Score, player2Score;
const paddleWidth = 10, paddleHeight = 100, ballSize = 20, paddleSpeed = 7;
const keys = {};
let gameActive = false;

const hitSound = new Audio('hit.wav');
const scoreSound = new Audio('score.wav');
const winSound = new Audio('win.wav');

document.body.style.animation = "bgAnimation 5s infinite alternate";
document.body.style.overflow = "hidden";

document.getElementById("startGame").addEventListener("click", () => {
    const player1Name = document.getElementById("player1Name").value.trim();
    const player2Name = document.getElementById("player2Name").value.trim();
    if (!player1Name || !player2Name) {
        alert("Veuillez entrer les noms des deux joueurs.");
        return;
    }

    document.getElementById("displayPlayer1Name").textContent = player1Name;
    document.getElementById("displayPlayer2Name").textContent = player2Name;

    // Hide the "Play Online" button when the game starts
    document.getElementById("play-online").style.display = "none"; 
    document.getElementById("scoreboard").style.display = "none";

    // Show the game menu and scoreboard
    document.querySelector(".menu").style.display = "none";
    document.querySelector(".scoreboard").style.display = "block";
    document.querySelector(".background-image").style.display = "none"
    document.querySelector(".Btn").style.display="none"

    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = 800;
    canvas.height = 400;
    canvas.style.border = "5px solid white";
    canvas.style.borderRadius = "15px";
    canvas.style.backgroundColor = "#D2691E";
    ctx = canvas.getContext('2d');

    player1Y = canvas.height / 2 - paddleHeight / 2;
    player2Y = canvas.height / 2 - paddleHeight / 2;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 7;
    ballSpeedY = 7;
    player1Score = 0;
    player2Score = 0;
    gameActive = true;

    document.addEventListener('keydown', (e) => (keys[e.key] = true));
    document.addEventListener('keyup', (e) => (keys[e.key] = false));
    gameLoop();
});

function gameLoop() {
    if (!gameActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Ligne centrale
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(canvas.width / 2 - 2, 0, 4, canvas.height);

    // Dessin des raquettes
    ctx.fillStyle = '#FF4500';
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
    ctx.fillStyle = '#008B8B';
    ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);

    // Dessin de la balle avec effet ombre
    ctx.fillStyle = '#FFD700';
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Mise à jour des scores
    document.getElementById('player1Score').textContent = player1Score;
    document.getElementById('player2Score').textContent = player2Score;

    // Contrôles des joueurs
    if (keys['q'] && player1Y > 0) player1Y -= paddleSpeed;
    if (keys['w'] && player1Y < canvas.height - paddleHeight) player1Y += paddleSpeed;
    if (keys['ArrowUp'] && player2Y > 0) player2Y -= paddleSpeed;
    if (keys['ArrowDown'] && player2Y < canvas.height - paddleHeight) player2Y += paddleSpeed;

    // Déplacement de la balle
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Rebond haut/bas
    if (ballY - ballSize / 2 <= 0 || ballY + ballSize / 2 >= canvas.height) {
        ballSpeedY *= -1;
    }

    // Rebond sur les raquettes
    if (ballX - ballSize / 2 <= paddleWidth && ballY > player1Y && ballY < player1Y + paddleHeight) {
        ballSpeedX *= -1;
        ballX = paddleWidth + ballSize / 2;
        hitSound.play();
    }
    
    if (ballX + ballSize / 2 >= canvas.width - paddleWidth && ballY > player2Y && ballY < player2Y + paddleHeight) {
        ballSpeedX *= -1;
        ballX = canvas.width - paddleWidth - ballSize / 2;
        hitSound.play();
    }

    // Vérifier si un joueur marque un point
    if (ballX < 0) {
        player2Score++;
        scoreSound.play();
        resetBall();
    } else if (ballX > canvas.width) {
        player1Score++;
        scoreSound.play();
        resetBall();
    }

    // Vérification du gagnant
    if (player1Score >= 10 || player2Score >= 10) {
        endGame();
        return;
    }
    requestAnimationFrame(gameLoop);
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * 7;
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * 7;
}

function endGame() {
    gameActive = false;
    const winner = player1Score >= 5 ? document.getElementById("displayPlayer1Name").textContent : document.getElementById("displayPlayer2Name").textContent;
    winSound.play();
    alert(`Bravo ${winner}, tu as gagné ! 🎉`);
    document.body.removeChild(canvas);
    document.querySelector(".menu").style.display = "flex";
    document.querySelector(".scoreboard").style.display = "none";
    document.getElementById("play-online").style.display = "block";
    document.querySelector(".Btn").style.display="block"
    document.querySelector(".background-image").style.display = "block"

}

document.getElementById('play-online').addEventListener('click', function() {
    window.location.href = 'sign.html'
});

function updateScore(newScore) {
    const scoreboard = document.querySelector('.scoreboard');
    scoreboard.textContent = newScore;
    scoreboard.classList.add('score-change');
    setTimeout(() => scoreboard.classList.remove('score-change'), 500);
}