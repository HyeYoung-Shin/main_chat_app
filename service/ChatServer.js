io.sockets.on('connection', function(socket){
  console.log('user connected: ', socket.id);

  var usernum=0;
  var roomnum =0;

  while(io.sockets.adapter.rooms["room-"+roomnum] && io.sockets.adapter.rooms["room-"+roomnum].length > 1 ){
    roomnum++;
  }

  socket.join("room-"+roomnum);
  console.log('connected room No.', roomnum);
  console.log('room length: ', io.sockets.adapter.rooms["room-"+roomnum].length);

  if(io.sockets.adapter.rooms["room-"+roomnum].length == 1)
      usernum = 1;
  if(io.sockets.adapter.rooms["room-"+roomnum].length == 2)
      usernum = 2;

  var name = "user" + usernum;
  io.to(socket.id).emit('change name', name);
  io.sockets.in("room-"+roomnum).emit('receive message', name+"님이 입장했습니다.");


  socket.on('disconnect', function(){
    socket.leave("room-"+roomnum);
    console.log('user disconnected: ', socket.id);
    socket.broadcast.to("room-"+roomnum).emit('disconnected', name);
  });

  socket.on('room disconnect', function(){
    socket.leave("room-"+roomnum);
    console.log('room disconnected ');
  });

  socket.on('send message', function(name,text){
    var msg = name + ' : '+ text;
    var trouble = 0;
//    console.log(msg);
    if(text == "ㅂㅅ" || "ㅄ"){
      trouble = 1;
    }
    io.sockets.in("room-"+roomnum).emit('receive message', msg, trouble);
  });
});
