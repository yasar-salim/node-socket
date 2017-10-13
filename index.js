let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
 
io.on('connection', (socket) => {
  
    //console.log(socket);

  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});   
    io.emit('message', {text: socket.nickname + ' left',type: '1', from: socket.nickname, created: new Date()});  
  });
 
  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', {user: nickname, event: 'joined'});    

    console.log(nickname);
    //console.log(io.sockets.clients());
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {text: message.text,type: message.type, from: socket.nickname, created: new Date()});   
    console.log(message); 
  });

  socket.on('typing', (message) => {
    io.emit('typing', {text: message.text,from: socket.nickname});   
    console.log(message); 
  });
});
 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});