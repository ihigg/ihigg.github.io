// create a new worker
var worker = new Worker('js/worker.js');

// listen for messages from the worker
worker.addEventListener('message', function(e) {
  // draw the image
  drawImage(e.data);
});

// send the worker a message
worker.postMessage({
  width: 500,
  height: 500,
  x: -0.5,
  y: 0,
  scale: 1
});

// draw the image
function drawImage(data) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var imageData = ctx.createImageData(data.width, data.height);
  for (var i = 0; i < data.pixels.length; i++) {
    imageData.data[i] = data.pixels[i];
  }
  ctx.putImageData(imageData, 0, 0);
}