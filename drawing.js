// game constants
var TARGET_SIZE = 50;
var TARGET_COLOR = "#449";
var BALL_SIZE = 15;
var BALL_COLOR = "#c44";
var OUTLINE_SIZE = 5;
var OUTLINE_COLOR = "#000";
var BOARD_SIZE = 500;
var MOVE_DIST = 10;

var ctx = null;
var ball = {x: BOARD_SIZE / 2,
            y: BOARD_SIZE / 2};

function initCtx(elem) {
    return elem.getContext("2d");
}

function drawBall(x, y) {
    ctx.fillStyle = BALL_COLOR;
    ctx.lineStyle = OUTLINE_COLOR;
    ctx.lineWidth = OUTLINE_SIZE;

    ctx.arc(x, y, BALL_SIZE, 0, 2 * Math.PI);

    ctx.fill();
    ctx.stroke();
}

function drawTarget(x, y) {
    ctx.fillStyle = TARGET_COLOR;
    ctx.fillRect(x, y, TARGET_SIZE, TARGET_SIZE);
}

function drawBoard() {
    ctx.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);
    
    ctx.beginPath();
    var end = BOARD_SIZE - TARGET_SIZE;
    drawTarget(0, 0);
    drawTarget(0, end);
    drawTarget(end, 0);
    drawTarget(end, end);
    
    drawBall(ball.x, ball.y);
}

function moveBall(dx, dy) {
    ball.x += dx;
    ball.y += dy;

    drawBoard();
}
