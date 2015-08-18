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
  socket.on('message_to_server', function (data) {
    data_json = JSON.parse(data);
    socket.broadcast.to(data_json.room).send(JSON.stringify({room:data_json.room, msg: JSON.parse(data_json.msg)}));
  });

  socket.on('unsubscribe', function(room) {
    console.log('leaving room', room);
    socket.leave(room); 
    socket.emit("numclients",{'clients': io.sockets.clients(room).length});
    socket.emit("client_exited");
  });

  socket.on('disconnect', function () {
  });
});
