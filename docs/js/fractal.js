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
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const rgbMapping = [
  'rgb(66, 30, 15)',
  'rgb(25, 7, 26)',
  'rgb(9, 1, 47)',
  'rgb(4, 4, 73)',
  'rgb(0, 7, 100)',
  'rgb(12, 44, 138)',
  'rgb(24, 82, 177)',
  'rgb(57, 125, 209)',
  'rgb(134, 181, 229)',
  'rgb(211, 236, 248)',
  'rgb(241, 233, 191)',
  'rgb(248, 201, 95)',
  'rgb(255, 170, 0)',
  'rgb(204, 128, 0)',
  'rgb(153, 87, 0)',
  'rgb(106, 52, 3)'
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

// A function to calculate the number of iterations for a given complex number
function iterations(x, y) {
  let a = x;
  let b = y;
  let n = 0;
  while (n < MAX_ITERATIONS) {
    let aa = a * a;
    let bb = b * b;
    let twoab = 2.0 * a * b;
    a = aa - bb + x;
    b = twoab + y;
    // if a + bi is greater than 2 in magnitude, it will diverge to infinity
    if (Math.sqrt((a * a) + (b * b)) > 2.0) {
      break;
    }
    n++;
  }
  return n;
}

// A function to sample the color gradient
function calculateColor(n) {
  if (n === MAX_ITERATIONS) {
    return 'rgb(0, 0, 0)';
  }
  return rgbMapping[n % rgbMapping.length];
}

// A function to draw a pixel
function drawPixel(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}

// draw the mandelbrot set
drawMandelbrot();