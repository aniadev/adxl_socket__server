console.log("adxl");
// const SERVER_URI = "http://localhost:9000";
const SERVER_URI = "https://anidroid.herokuapp.com/";

// DOM handler
var socket = io(SERVER_URI);

var x_span = document.getElementById("x-value");
var y_span = document.getElementById("y-value");
var z_span = document.getElementById("z-value");
var adxlCanvas = document.getElementById("adxl-cvs");
var ctx = adxlCanvas.getContext("2d");
const CVS_WIDTH = 500;
const CVS_HEIGHT = 200;

adxlCanvas.width = CVS_WIDTH;
adxlCanvas.height = CVS_HEIGHT;

function canvasDraw(ax, ay, az) {
  // co dinh ax
  ax = preset(ax);
  ay = preset(ay);
  az = preset(az);
  //    ax = [-10 : 10]
  console.log(ax);
  let radius = 80;
  let alphaX = (ax / 10 - 1) * (Math.PI / 2);
  ctx.beginPath();
  //   clear canvas
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, CVS_WIDTH, CVS_HEIGHT);
  ctx.fillStyle = "#000";
  ctx.moveTo(CVS_WIDTH / 2, CVS_HEIGHT / 2);
  ctx.lineTo(
    CVS_WIDTH / 2 + radius * Math.cos(alphaX),
    CVS_HEIGHT / 2 + radius * Math.sin(alphaX)
  );
  ctx.stroke();
}

function preset(val) {
  return val <= -10 ? -10 : val > 10 ? 10 : val;
}

function setValue(x, y, z) {
  x_span.innerHTML = x;
  y_span.innerHTML = y;
  z_span.innerHTML = z;
}

socket.on("connect", () => {
  // either with send()
  socket.emit("status", `client connected`);
  socket.emit("adxl", "test adxl server");
});
socket.on("adxl", (data) => {
  // either with send()
  //   console.log(data);
  let { x, y, z } = data;
  setValue(x, y, z);
  canvasDraw(x, y, z);
});
