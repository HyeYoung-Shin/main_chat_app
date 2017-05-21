io.sockets.on('connection', function(socket){
/*
  console.log('user connected: ', socket.id);
  var name = "user" + count++;
  io.to(socket.id).emit('change name', name);
*/
  socket.on('random_request', function(data){
    console.log('request to make Random chat');


    socket.join(data.roomname);
    socket.set('room', data.roomname);
    socket.set('username', data.username);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
    io.emit('disconnected', name);
  });

  socket.on('send message', function(name,text){
    var msg = name + ' : '+ text;
    console.log(msg);
    io.emit('receive message', msg);
  });

});
