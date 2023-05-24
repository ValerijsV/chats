const express = require('express')
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.on('connection', (socket) => {
  console.log('a user connected')
  connections.push(socket);

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('User has disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
