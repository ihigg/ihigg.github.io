// constants for the size of the canvas and the maximum number of iterations
const CANVAS_SIZE = 400;
const MAX_ITERATIONS = 100;

// these constants determine the region of the complex plane that is rendered
const X_MIN = -2;
const X_MAX = 1;
const Y_MIN = -1;
const Y_MAX = 1;

// the canvas element and its 2D rendering context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// fill the canvas with a black background
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

// iterate over every pixel on the canvas
for (let x = 0; x < CANVAS_SIZE; x++) {
  for (let y = 0; y < CANVAS_SIZE; y++) {
    // map the pixel coordinates to the complex plane
    let c_re = x / CANVAS_SIZE * (X_MAX - X_MIN) + X_MIN;
    let c_im = y / CANVAS_SIZE * (Y_MAX - Y_MIN) + Y_MIN;

    // use the Mandelbrot formula to generate the sequence
    let z_re = c_re, z_im = c_im;
    let isInside = true;
    for (let n = 0; n < MAX_ITERATIONS; n++) {
      // compute the real and imaginary components of the square of the current number
      let z_re_squared = z_re * z_re;
      let z_im_squared = z_im * z_im;

      // apply the Mandelbrot formula to compute the next number in the sequence
      z_im = 2 * z_re * z_im + c_im;
      z_re = z_re_squared - z_im_squared + c_re;

      // if the magnitude of the current number is greater than 2, it will tend towards infinity
      // so we consider it to be outside the set and break out of the loop
      if (z_re_squared + z_im_squared > 4) {
        isInside = false;
        break;
      }
    }

    // if the number is inside the set, color the pixel black; otherwise, color it white
    if (isInside) {
      ctx.fillStyle = 'black';
    } else {
      ctx.fillStyle = 'white';
    }
    ctx.fillRect(x, y, 1, 1);
  }
}
