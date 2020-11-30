
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port);

app.use(express.static('public'));

console.log("My socket server is running!");
const socket = require('socket.io');
const io = socket(server);
// on connection event
io.sockets.on('connection', newConnection);
// function for the event
function newConnection(socket){

  //console.log(socket.client)
socket.on('draw', drawEvent);
socket.on('draw3', draw3Event);
function draw3Event(draw3Data){
if(draw3Data.coords[0].dia2 > 75){
   draw3Data.coords[0].dia2 = 75;
}


        socket.broadcast.emit('draw3', draw3Data)

}
function drawEvent(drawData){
    if(drawData.dia > 250){
        drawData.dia = 250;
    }
    socket.broadcast.emit('draw', drawData);
}

}
module.exports = {port};