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
    console.log(socket.id);
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
      fs.writeFile('../../static/data.json', data, function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  });
};

module.exports = socketIO;
