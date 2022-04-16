//=============================================================================
const express = require('express');
const cors = require('cors');
const app = express();
const port = 9000;
const io_port = 9000;
const fs = require('fs');

// const database = require("./config/db");
// database.connect();
var http = require('http');
const server = http.createServer(app);

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});
app.get('/lightswitch', (req, res) => {
  fs.readFile('./static/data.json', 'utf8', (err, jsonData) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
      res.json({
        success: false,
        data: {},
      });
    } else {
      // parse JSON string to JSON object
      let data = { ...JSON.parse(jsonData) };
      if (data) {
        res.json({
          success: true,
          data,
        });
      }
    }
  });
});
// import socketIO
const socketio = require('./src/util/socketIO');
socketio(server);

server.listen(process.env.PORT || io_port, () =>
  console.log(`Socket listening on port ${process.env.PORT || io_port}!`)
);
