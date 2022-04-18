const { uuid } = require('uuidv4');
const fs = require('fs');
// socketio handler
socketIO = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  io.on('connect', (socket) => {
    fs.readFile('./static/data.json', 'utf8', (err, jsonData) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      } else {
        // parse JSON string to JSON object
        let data = { ...JSON.parse(jsonData) };
        if (data) {
          io.emit('lightSwitch', jsonData);
          console.log(jsonData);
        }
      }
    });
    socket.on('adxl', (data) => {
      io.emit('adxl', data);
    });
    socket.on('status', () => {
      let count = { count: io.engine.clientsCount };
      io.emit('online', JSON.stringify(count));
    });
    socket.on('disconnect', () => {
      let count = { count: io.engine.clientsCount };
      io.emit('online', JSON.stringify(count));
    });
    socket.on('lightSwitch', (data) => {
      io.emit('lightSwitch', data);
      fs.writeFile('./static/data.json', data, function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  });
};

module.exports = socketIO;
