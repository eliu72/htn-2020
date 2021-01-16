require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');
const randomColor = require('randomcolor');
const uuid = require('uuid');

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const Chat = require('./models/chat');
const chatRoutes = require('./routes/chatroute');
app.use(chatRoutes);

// Start the server after connecting to mongo
const url = process.env.DB_CONNECTION;
const port = process.env.PORT || 8000;
const connect = mongoose.connect(url, 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Connected to MongoDB');
    // Listen on port 8000 using HTTP
    httpServer.listen(port, () => console.log(`Server started on port ${port}`));

    const users = [];
    const connnections = [];

    // Listen for new socket.io client connections
    io.on('connection', (socket) => {
      const chats = mongoose.connection.db.collection('chats');
      console.log('New user connected.');
      connnections.push(socket);

      // Function to send status
      sendStatus = (status) => {
        io.socket.emit('status', status);
      }

      // Get chats from the mongo collection
      chats.find().limit(100).sort({_id:1}).toArray((err, result) => {
        if (err) throw err;
        console.log("Getting the chat messages");

        // Emit the chat messages
        io.emit('existingmessages', result);
      });

      // Receive message emitted from client
      // socket.on('mymessage', (message) => {
      //   console.log('message', `${socket.id.substr(0, 2)} said ${message}`)
      //   io.emit('mymessage', message);

      // })
      socket.on('mymessage', (somedata) => {
        console.log('message', `${socket.id.substr(0, 2)} said ${somedata}`)
        io.emit('mymessage', somedata);
        const chat = new Chat({
          message: somedata,
          sender: socket.id.substr(0, 2)
        });
      
        chat.save();
      })
      // Disconnect
      socket.on('disconnect', () => {
        console.log('A user disconnected.');
      });

      io.on('heyheyhey', (data) => {
        if (err) throw err;
        console.log("Got the heyheyhey");
      })

      // Handle input events
      io.on('input', (data) => {
        let sender = data.sender;
        let message = data.message;

        // Check sender name and message
        if (sender == '' || message == '') {
          sendStatus('Empty name or message.')
        }
        else {
          chat.insert({sender: sender, message: message}, () => {
            io.emit('output', [data]);
            sendStatus({
              message: 'Message sent',
            })
          })
        }
      })
    })}
  )
  .catch((err) => console.log(err));


// Set static folder 
app.use(express.static(path.join(__dirname, 'client')))

// Parse JSON (application/json content-type)
app.use(bodyParser.json());

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'client/index.html'));
});
