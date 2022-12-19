// worker.js

// listen for messages from the main script
self.addEventListener('message', function(e) {
  // calculate the mandelbrot set
  var data = calculateMandelbrot(e.data);
  // send the main script a message
  self.postMessage(data);
});

// calculate the mandelbrot set
function calculateMandelbrot(data) {
  var width = data.width;
  var height = data.height;
  var x = data.x;
  var y = data.y;
  var scale = data.scale;
  var maxIterations = 100;
  var pixels = new Uint8ClampedArray(width * height * 4);
  for (var py = 0; py < height; py++) {
    for (var px = 0; px < width; px++) {
      var x0 = (px / width) * 3.5 - 2.5;
      var y0 = (py / height) * 2 - 1;
      x0 = x0 * scale + x;
      y0 = y0 * scale + y;
      var x = 0;
      var y = 0;
      var iteration = 0;
      while (x * x + y * y <= 4 && iteration < maxIterations) {
        var xtemp = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = xtemp;
        iteration++;
      }
      var p = (py * width + px) * 4;
      if (iteration < maxIterations) {
        var c = 3 * Math.log(iteration) / Math.log(maxIterations - 1.0);
        if (c < 1) {
          pixels[p + 0] = 255 * c;
          pixels[p + 1] = 0;
          pixels[p + 2] = 0;
        } else if (c < 2) {
          pixels[p + 0] = 255;
          pixels[p + 1] = 255 * (c - 1);
          pixels[p + 2] = 0;
        } else {
          pixels[p + 0] = 255;
          pixels[p + 1] = 255;
          pixels[p + 2] = 255 * (c - 2);
        }
      } else {
        pixels[p + 0] = 0;
        pixels[p + 1] = 0;
        pixels[p + 2] = 0;
      }
      pixels[p + 3] = 255;
    }
  }
  return {
    width: width,
    height: height,
    pixels: pixels
  };
}