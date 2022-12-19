// constant for the maximum number of iterations
const MAX_ITERATIONS = 100;

// these constants determine the region of the complex plane that is rendered
const X_MIN = -2;
const X_MAX = 1;
const Y_MIN = -1;
const Y_MAX = 1;

// the canvas element and its 2D rendering context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions to the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Constants for the canvas width and height
var CANVAS_WIDTH = canvas.width;
var CANVAS_HEIGHT = canvas.height;

const mapping = [
  [66, 30, 15],
  [25, 7, 26],
  [9, 1, 47],
  [4, 4, 73],
  [0, 7, 100],
  [12, 44, 138],
  [24, 82, 177],
  [57, 125, 209],
  [134, 181, 229],
  [211, 236, 248],
  [241, 233, 191],
  [248, 201, 95],
  [255, 170, 0],
  [204, 128, 0],
  [153, 87, 0],
  [106, 52, 3]
];

// A function to draw a mandelbrot set
function drawMandelbrot() {
  // for each pixel in the canvas
  for (let xPixel = 0; xPixel < CANVAS_WIDTH; xPixel++) {
    for (let yPixel = 0; yPixel < CANVAS_HEIGHT; yPixel++) {
      // calculate the corresponding complex number
      let x = mapToReal(xPixel);
      let y = mapToImaginary(yPixel);

      // calculate the number of iterations
      let n = iterations(x, y);

      // calculate the color based on the number of iterations
      let color = calculateColor(n);

      // draw the pixel
      drawPixel(xPixel, yPixel, color);
    }
  }
}

// A function to map a pixel coordinate to a real number
function mapToReal(xPixel) {
  return map(xPixel, 0, CANVAS_WIDTH, X_MIN, X_MAX);
}

// A function to map a pixel coordinate to an imaginary number
function mapToImaginary(yPixel) {
  return map(yPixel, 0, CANVAS_HEIGHT, Y_MIN, Y_MAX);
}

// A function to map a value from one range to another
function map(value, min1, max1, min2, max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

// A function to calculate the number of iterations for a given complex number, using the acceleratted escape time algorithm
function iterations(x, y) {
  let a = x;
  let b = y;
  for (let n = 0; n < MAX_ITERATIONS; n++) {
    let aa = a * a;
    let bb = b * b;
    let twoab = 2 * a * b;
    a = aa - bb + x;
    b = twoab + y;
    if (aa + bb > 16) {
      return n;
    }
  }
  return MAX_ITERATIONS;
}

// A function to sample the color gradient
function calculateColor(n) {
  if (n === MAX_ITERATIONS) {
    return [0, 0, 0];
  }
  return mapping[n % mapping.length];
}

// A function to draw a pixel
function drawPixel(x, y, color) {
  ctx.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
  ctx.fillRect(x, y, 1, 1);
}

// Update the canvas when the window is resized
window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  CANVAS_WIDTH = canvas.width;
  CANVAS_HEIGHT = canvas.height;
  drawMandelbrot();
});

// Draw the mandelbrot set
drawMandelbrot();