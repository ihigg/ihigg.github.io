// Get canvas and context
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// Set ball properties
var ballRadius = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;

// Set cursor properties
var cursorX = 0;
var cursorY = 0;

// Set ball color
var ballColor = '#FF0000';
var darkColor = '#000000';

// Set canvas dimensions to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Linear interpolation function
function lerp(start, end, t) {
    return start + (end - start) * t;
}

// Calculate distance between two points
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Draw ball on canvas
function drawBall() {
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = ballColor;
    context.fill();
    context.closePath();
}

function updateBallPosition() {
    // Set the interpolation factor (t) to a value between 0 and 1
    var t = 0.1;
    // Calculate the new ball position using the lerp function
    ballX = lerp(ballX, cursorX, t);
    ballY = lerp(ballY, cursorY, t);
}

// Update cursor position
function updateCursorPosition(event) {
    cursorX = event.clientX;
    cursorY = event.clientY;
}

// Interpolate the ball's color based on its distance to the cursor
function updateBallColor() {
    var maxDistance = distance(0, 0, canvas.width, canvas.height);
    var currentDistance = distance(ballX, ballY, cursorX, cursorY);
    var t = currentDistance / maxDistance;
    ballColor = lerpColor(ballColor, darkColor, t);
}

// Linear interpolation between two colors
function lerpColor(color1, color2, t) {
    var color1Rgb = hexToRgb(color1);
    var color2Rgb = hexToRgb(color2);
    var r = lerp(color1Rgb.r, color2Rgb.r, t);
    var g = lerp(color1Rgb.g, color2Rgb.g, t);
    var b = lerp(color1Rgb.b, color2Rgb.b, t);
    return rgbToHex(r, g, b);
}

// Convert hex color to rgb
function hexToRgb(hex) {
    var bigint = parseInt(hex.replace('#', ''), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return {
        r: r,
        g: g,
        b: b
    };
}

// Convert rgb color to hex
function rgbToHex(r, g, b) {
    var hex = ((r << 16) | (g << 8) | b).toString(16);
    return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
}

// Update canvas
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    updateBallPosition();
    updateBallColor();
    requestAnimationFrame(draw);
}

// Start animation
draw();

// Update cursor position on mouse move
canvas.addEventListener('mousemove', updateCursorPosition);