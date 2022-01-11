const { uuid } = require("uuidv4");
// socketio handler
socketIO = (server) => {
  const io = require("socket.io")(server);
  io.on("connect", (socket) => {
    console.log(socket.id);
    socket.on("adxl", (data) => {
      io.emit("adxl", data);
    });
    socket.on("status", () => {
      let count = { count: io.engine.clientsCount };
      io.emit("online", JSON.stringify(count));
    });
    socket.on("disconnect", () => {
      let count = { count: io.engine.clientsCount };
      io.emit("online", JSON.stringify(count));
    });
  });
};

module.exports = socketIO;
