const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

let score = 0;
let square = {
    x: Math.random() * (canvas.width - 50),
    y: Math.random() * (canvas.height - 50),
    size: 50,
    speed: 5
};

function drawSquare() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(square.x, square.y, square.size, square.size);
}

function moveSquare() {
    square.x += (Math.random() - 0.5) * square.speed * 2;
    square.y += (Math.random() - 0.5) * square.speed * 2;

    // Keep square within canvas bounds
    square.x = Math.max(0, Math.min(square.x, canvas.width - square.size));
    square.y = Math.max(0, Math.min(square.y, canvas.height - square.size));
}

function checkClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (
        mouseX >= square.x &&
        mouseX <= square.x + square.size &&
        mouseY >= square.y &&
        mouseY <= square.y + square.size
    ) {
        score++;
        scoreElement.textContent = score;
        square.x = Math.random() * (canvas.width - square.size);
        square.y = Math.random() * (canvas.height - square.size);
        square.speed += 0.5; // Increase difficulty
    }
}

function gameLoop() {
    moveSquare();
    drawSquare();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', checkClick);
gameLoop();