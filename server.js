var io = require('socket.io').listen(8080);

io.set('transports', ['websocket']);

io.sockets.on('connection', function (socket) {
  var room = socket.handshake.query.room || "";
  if (room != "") {
    socket.join(room);
  }
  socket.on('message', function (msg) {
    socket.broadcast.to(room).send(msg);
  });

  socket.on('disconnect', function () {
  });
});
