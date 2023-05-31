// ゲームの設定
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const gridSize = 20;
const gridCount = canvas.width / gridSize;
let snake = [{ x: 0, y: 0 }];
let direction = "right";
let gameLoop;
let food = { x: 0, y: 0 };

// キーボードイベントの処理
document.addEventListener("keydown", changeDirection);

// 初期化
function init() {
    snake = [{ x: 0, y: 0 }];
    direction = "right";
    clearInterval(gameLoop);
    gameLoop = setInterval(update, 150);
    generateFood();
}

// ゲームの更新
function update() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameLoop);
        alert("Game Over!");
        init();
    }
    if (checkFoodCollision()) {
        snake.unshift({ x: food.x, y: food.y });
        generateFood();
    }
    draw();
}

// スネークの移動
function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    if (direction === "right") head.x += gridSize;
    if (direction === "left") head.x -= gridSize;
    if (direction === "up") head.y -= gridSize;
    if (direction === "down") head.y += gridSize;

    snake.unshift(head);
    snake.pop();
}

// 衝突判定
function checkCollision() {
    const head = snake[0];
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height
    ) {
        return true;
    }
    return false;
}

// 餌の生成
function generateFood() {
    food = {
        x: Math.floor(Math.random() * gridCount) * gridSize,
        y: Math.floor(Math.random() * gridCount) * gridSize
    };
}

// エサの衝突判定
function checkFoodCollision() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        return true;
    }
    return false;
}



// 描画
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // 餌の描画
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, gridSize, gridSize);
    // スネークの描画
    snake.forEach(segment => {
        context.fillStyle = "green";
        context.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// 方向変更
function changeDirection(event) {
    const keyPressed = event.keyCode;
    const validKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    if (validKeys[keyPressed]) {
        if (direction === "up" && validKeys[keyPressed] === "down") return;
        if (direction === "down" && validKeys[keyPressed] === "up") return;
        if (direction === "left" && validKeys[keyPressed] === "right") return;
        if (direction === "right" && validKeys[keyPressed] === "left") return;

        direction = validKeys[keyPressed];
    }
}

// ゲームの開始
init();
