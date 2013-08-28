var io = require('socket.io').listen(8080);

io.set('transports', ['websocket']);

io.sockets.on('connection', function (socket) {
  console.log("connect");
  var room = socket.handshake.query.room || "";
  if (room != "") {
    socket.join(room);
  }
  console.log("room: ", room);
  socket.on('message', function (msg) {
    console.log('message ', msg);
    socket.broadcast.to(room).send(msg);
  });

  socket.on('disconnect', function () {
    console.log("disconnect");
  });
});
