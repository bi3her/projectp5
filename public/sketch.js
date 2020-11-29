let RGB = [0,0,0];
let dia = 50;
var socket;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(50, 255, 50)
socket = io();

	socket.on('draw', newDrawing);
}
function newDrawing(drawData){
	noStroke();
	fill(drawData.RGB[0], drawData.RGB[1], drawData.RGB[2]);
	ellipse(drawData.X, drawData.Y, drawData.dia);
}
function draw() {
}
function mouseDragged(){
	if(mouseIsPressed && mouseButton === LEFT){
sendingDrawEmits()
	}
}
function sendingDrawEmits(){
	fill(RGB[0], RGB[1], RGB[2]);
	ellipse(mouseX, mouseY, dia, dia);
	noStroke();
	drawData = {
		X: mouseX,
		Y: mouseY,
		RGB: RGB,
		dia: dia
	}
	//console.log(drawData);
	socket.emit('draw', drawData);
}
function mouseWheel(event){

		if(event.delta > 0 && dia > 10){
			dia -= 5;
		} else if(dia < 250){
			dia += 5;
		}

}
function mousePressed(){
	sendingDrawEmits()

}
function keyTyped(){
	switch (key.toLowerCase()){
		case "w":
			RGB = [255, 255, 255];
			break;
		case "b":
			RGB = [0, 25, 210];
			break;
		case "c":
			RGB = [0, 255, 255];
			break;
		case "r":
			RGB = [255, 0,0];
			break;
		case "p":
			RGB = [114, 0, 213];
			break;
		case "y":
			RGB = [255, 255, 0];
			break;
		case "o":
			RGB = [255, 128, 0];
			break;
		case "g":
			RGB = [0, 200, 20];
			break;
	}
}
