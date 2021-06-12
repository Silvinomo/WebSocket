var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(3000, function () {
  console.log('listening for requests on port 3000');
});

// Socket setup
var io = socket(server);

// Listen for new connection and print a message in console
io.on('connection', (socketIO) => {
  console.log(`New connection ${socketIO.id}`);

  // Listening for chat event
  socketIO.on('chat', function (data) {
    // console.log('chat event trigged at server');
    // console.log('need to notify all the clients about this event');
    io.sockets.emit('chat', data);
  });

  // Listening for typing event
  socketIO.on('typing', function (data) {
    // console.log(`Server received ${data} is typing`);
    // console.log('need to inform all the clients about this');
    io.sockets.emit('typing', data);
    //socketIO.broadcast.emit('typing', data);
  });
});
