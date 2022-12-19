onmessage = function(e) {
  var data = [];
  var maxIterations = e.data.maxIterations;
  var width = e.data.width;
  var height = e.data.height;
  var xmin = e.data.xmin;
  var ymin = e.data.ymin;
  var xmax = e.data.xmax;
  var ymax = e.data.ymax;
  var zoom = e.data.zoom;
  var panX = e.data.panX;
  var panY = e.data.panY;
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var a = xmin + (xmax - xmin) * x / width;
      var b = ymin + (ymax - ymin) * y / height;
      var ca = a;
      var cb = b;
      var n = 0;
      while (n < maxIterations) {
        var aa = a * a - b * b;
        var bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) {
          break;
        }
        n++;
      }
      var bright = n == maxIterations ? 0 : 255 * Math.log(n) / Math.log(maxIterations - 1);
      data.push(bright, bright, bright, 255);
    }
  }
  postMessage({
    workerIndex: e.data.workerIndex,
    data: data
  });
};