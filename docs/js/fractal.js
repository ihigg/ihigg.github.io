var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var imageData = ctx.createImageData(width, height);
var data = imageData.data;

var workers = [];
var workerCount = 4;
var workerData = [];
var workerIndex = 0;

var maxIterations = 100;
var zoom = 1;
var panX = 0;
var panY = 0;

var startTime = Date.now();

for (var i = 0; i < workerCount; i++) {
  var worker = new Worker('js/worker.js');
  worker.onmessage = function(e) {
    var workerIndex = e.data.workerIndex;
    var partialData = e.data.data;
    workerData[workerIndex] = partialData;
    if (workerData.length == workerCount) {
      drawImage();
    }
  };
  workers.push(worker);
}

function drawImage() {
  for (var i = 0; i < workerData.length; i++) {
    var partialData = workerData[i];
    for (var j = 0; j < partialData.length; j++) {
      data[i * partialData.length + j] = partialData[j];
    }
  }
  ctx.putImageData(imageData, 0, 0);
  console.log('Rendered in ' + (Date.now() - startTime) + 'ms');
}

function render() {
  workerData = [];
  for (var i = 0; i < workers.length; i++) {
    var worker = workers[i];
    var xmin = -2.5;
    var xmax = 1;
    var ymin = -1;
    var ymax = 1;
    var x = xmin + (xmax - xmin) * (i / workers.length);
    var y = ymin + (ymax - ymin) * (i / workers.length);
    var w = (xmax - xmin) / workers.length;
    var h = (ymax - ymin) / workers.length;
    worker.postMessage({
      workerIndex: i,
      maxIterations: maxIterations,
      width: width,
      height: height,
      xmin: x,
      ymin: y,
      xmax: x + w,
      ymax: y + h,
      zoom: zoom,
      panX: panX,
      panY: panY
    });
  }
}

render();