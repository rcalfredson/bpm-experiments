var canvas = document.querySelector('.visualizer');
var canvasCtx = canvas.getContext("2d");
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
var source = audioCtx.createMediaElementSource(audioPlayer);
source.connect(analyser);
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
canvasCtx.clearRect(0, 0, 800, 100);

var draw = function() {

  var drawVisual = requestAnimationFrame(draw);

  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, 800, 100);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

  canvasCtx.beginPath();

  var sliceWidth = 800 * 1.0 / bufferLength;
  var x = 0;

  for(var i = 0; i < bufferLength; i++) {

    var v = dataArray[i] / 128.0;
    var y = v * 100/2;

    if(i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height/2);
  canvasCtx.stroke();
};

draw();
audioPlayer.crossOrigin = 'anonymous';
BeatAnalyzer.findBeat(audioPlayer);