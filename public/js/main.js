console.log("adxl");
// const SERVER_URI = "http://localhost:9000";
const SERVER_URI = "https://anidroid.herokuapp.com/";

var socket = io(SERVER_URI);
socket.on("connect", () => {
  // either with send()
  socket.emit("status", `client connected`);
  socket.emit("adxl", "test adxl server");
});
socket.on("adxl", (data) => {
  // either with send()
  console.log(data);
});
