
const express = require('express');
const app = express();
var port = process.env.PORT || 3000;
const server = app.listen(port);

app.use(express.static('public'));

console.log("My socket server is running!");
const socket = require('socket.io');
const io = socket(server);
// on connection event
io.sockets.on('connection', newConnection);
// function for the event
function newConnection(socket){
    console.log('new connection: ' + socket.id);
socket.on('draw', drawEvent);
function drawEvent(drawData){
    socket.broadcast.emit('draw', drawData);
}
}
module.exports = {port};