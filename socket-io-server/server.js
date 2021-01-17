// require('dotenv').config();
// const express = require('express');
// const socketio = require('socket.io');
// const http = require('http');
// const path = require('path');

// const bodyParser = require('body-parser');
// const cors = require('cors');
// const randomColor = require('randomcolor');
// const uuid = require('uuid');

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server); 

const io = require('socket.io')();


// Set static folder 
app.use(express.static(path.join(__dirname, 'socket-io-client/src')))

// Parse JSON (application/json content-type)
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'socket-io-client/src/App.js'));
});

// const users = [];
// const connnections = [];

// // Listen for new socket.io client connections
// io.on('connection', (socket) => {
//   console.log('New user connected.');
//   connnections.push(socket);
  
//   // Receive message emitted from client
//   socket.on('mymessage', (message) => {
//     console.log('message', `${socket.id.substr(0, 2)} said ${message}`)
//     io.emit('mymessage', message);
//   })
//   socket.on('disconnect', () => {
//     console.log('A user disconnected.');
//   });
// });

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});

// Listen on port 8000 using HTTP
const port = process.env.PORT || 8000;
io.listen(port)
// server.listen(port, () => console.log(`Server started on port ${port}`));