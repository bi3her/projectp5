
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port);
const fs = require('fs');
let firstClient;

    app.use(express.static('public'));

fs.writeFile("emits.txt", "", err => {})
console.log("My socket server is running!");
const socket = require('socket.io');
const io = socket(server);
// on connection event
io.sockets.on('connection', newConnection);
// function for the event
function newConnection(socket){
    console.log(socket.id)
    const emits = fs.readFileSync("emits.txt", "utf8").split("\n");
    if(emits[0] !== '') {
        for (let i = 0; i < emits.length; ++i) {
            io.to(socket.id).emit(JSON.parse(emits[i])["emit"], JSON.parse(emits[i])["data"]);
        }
    }
  //console.log(socket.client)
// socket.on('draw', drawEvent);
socket.on('draw3', draw3Event);
socket.on('drawLine', drawLineEvent)
    function drawLineEvent(drawLineData){
    if(drawLineData.dia > 250){
        drawLineData.dia = 250;
    }
        append("drawLine", drawLineData);
    socket.broadcast.emit('drawLine', drawLineData)
    }
function draw3Event(draw3Data){
if(draw3Data.coords[0].dia2 > 75){
   draw3Data.coords[0].dia2 = 75;
}
      append("draw3",draw3Data);

        socket.broadcast.emit('draw3', draw3Data)
}
// function drawEvent(drawData){
//     if(drawData.dia > 250){
//         drawData.dia = 250;
//     }
//     socket.broadcast.emit('draw', drawData);
// }

}
function append(emit,data) {
    const limit = fs.readFileSync("emits.txt", "utf8").split("\n");
    if (limit.length >= 300) {
        limit.shift();
        fs.writeFileSync("emits.txt", limit.toString().replace(/},{"e/g, "}\n{\"e"), err => {
            if (err !== null) {
                console.log(err)
            }
        });

    }
    if (fs.readFileSync("emits.txt", "utf8") === "") {
        fs.appendFileSync("emits.txt", JSON.stringify({emit: emit, data: data}))

    } else{
        fs.appendFileSync("emits.txt", "\n" + JSON.stringify({emit: emit, data: data}))
}
}