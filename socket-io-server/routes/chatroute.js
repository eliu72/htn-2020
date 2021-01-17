require('dotenv').config();
const  express  = require("express");
const Chat = require('../models/chat');

const router = express.Router();

router.get('/chats/add', (req, res) => {
  const chat = new Chat({
    message: 'a new message!',
    sender: 'selina'
  });

  chat.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
})

router.get('/chats/:roomid', (req, res) => {
  Chat.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
})

router.get('/chats/all', (req, res) => {
  Chat.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    });
})

module.exports = router;
