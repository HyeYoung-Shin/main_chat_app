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
  var trouble =0;
  io.to(socket.id).emit('change name', name);
  io.sockets.in("room-"+roomnum).emit('receive message', name+"님이 입장했습니다.");

  if(io.sockets.adapter.rooms["room-"+roomnum].length == 1){
    io.sockets.in("room-"+roomnum).emit('receive message', "상대방을 기다리는 중입니다.");
  }
  else if(io.sockets.adapter.rooms["room-"+roomnum].length == 2){
    io.sockets.in("room-"+roomnum).emit('receive message', "채팅을 시작하세요.");
  }

  //when disconnected from chat server
  socket.on('disconnect', function(){
    socket.leave("room-"+roomnum);
    console.log('user disconnected: ', socket.id);
    socket.broadcast.to("room-"+roomnum).emit('disconnected', name);
  });

  socket.on('send message', function(name,text){
    var msg = name + ' : '+ text;
    io.sockets.in("room-"+roomnum).emit('receive message', msg);

    var wordItem;
    var check=0;
    console.log(text);

    //check the message using db directory
    textArray = v.split(text, ' ');

    for( var i=0; textArray[i] != null ; i++){
      wordItem = textArray[i];

      Word.findOne({word:wordItem}, function(err, data){
        if(err) return console.log("Data finding err:" , err);
        if(data != null){
          console.log(data.word+data.frequency);
          if(check != 1){
            check = 1;
            trouble = trouble+1;
            io.to(socket.id).emit('receive warning',trouble);
          }
        }
      });
    }

  });
});
