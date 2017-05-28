
io.sockets.on('connection', function(socket){
  var count =1;

  console.log('user connected: ', socket.id);
  var name = "user" + count++;
  io.to(socket.id).emit('change name', name);

  socket.on('random_request', function(){
    console.log('request to make Random chat');

    var rooms = io.sockets.manager.rooms;
         for (var key in rooms){
             if (key == ''){
                 continue;
             }

             if (rooms[key].length == 1){
                 var roomKey = key.replace('/', '');
                 socket.join(roomKey);
                 io.sockets.in(roomKey).emit('completeMatch', {});
                 socketRoom[socket.id] = roomKey;
                 return;
             }
         }

         socket.join(socket.id);
         socketRoom[socket.id] = socket.id;
/*
    socket.join(data.roomname);
    socket.set('room', data.roomname);
    socket.set('username', data.username);
    */
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
