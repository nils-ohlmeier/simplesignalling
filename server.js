var io = require('socket.io').listen(8080);

io.set('transports', ['websocket']);

io.sockets.on('connection', function (socket) {
  socket.on('subscribe', function(room) { 
    console.log('joining room', room);
    socket.join(room); 
    socket.emit("subscribed",{'room': room});
    socket.emit("numclients",{'clients': io.sockets.clients(room).length});
    socket.broadcast.to(room).emit("client_joined");
  });

  socket.on('unsubscribe', function(room) {
    console.log('leaving room', room);
    socket.leave(room); 
    socket.emit("numclients",{'clients': io.sockets.clients(room).length});
    socket.emit("client_exited");
  });

  socket.on('message', function (data) {
    socket.broadcast.to(data.room).send(data.msg);
  });

  socket.on('disconnect', function () {
  });
});
