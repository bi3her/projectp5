let RGB = [
	{
		color : [0,0,0]
	},
	{
		color : [0,0,0]
	},
	{
		color : [0,0,0]
	},
	{
		color : [0,0,0]
	},
	{
		color : [0,0,0]
	}
]
let coords;
let dia = 50;
let socket;
let colorfulMode = false;
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(50, 255, 50)
socket = io();

	socket.on('draw', newDrawing);
	socket.on('draw3', newDrawing3);
}
function newDrawing3(draw3Data){
	for(let i = 0; i < 5; ++i){
		noStroke();
		fill(draw3Data.rgb[i].color[0], draw3Data.rgb[i].color[1], draw3Data.rgb[i].color[2])
		ellipse(draw3Data.coords[i].xy[0], draw3Data.coords[i].xy[1], draw3Data.coords[i].dia2, draw3Data.coords[i].dia2);
	}

}
function newDrawing(drawData){
	noStroke();
	fill(drawData.RGB[0].color[0], drawData.RGB[0].color[1], drawData.RGB[0].color[2]);
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
if(!colorfulMode) {
	fill(RGB[0].color[0], RGB[0].color[1], RGB[0].color[2]);
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
} else {
	for(let i = 0; i < 5; ++i){
		resetCoords();
		noStroke();
		fill(RGB[i].color[0], RGB[i].color[1], RGB[i].color[2])
		ellipse(coords[i].xy[0], coords[i].xy[1], coords[i].dia2, coords[i].dia2);
	}
	draw3Data = {
		coords : coords,
		rgb : RGB
	}
	socket.emit('draw3', draw3Data);
}
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
	if(key.toLowerCase() === "3"){
		colorfulMode = !colorfulMode;
	} else {
		switch (key.toLowerCase()) {
			case "w":
				changeRGB([255, 255, 255]);
				break;
			case "b":
				changeRGB([0, 25, 210]);
				break;
			case "c":
				changeRGB([0, 255, 255]);
				break;
			case "r":
				changeRGB([255, 0, 0]);
				break;
			case "p":
				changeRGB([114, 0, 213]);
				break;
			case "y":
				changeRGB([255, 255, 0]);
				break;
			case "o":
				changeRGB([255, 128, 0]);
				break;
			case "g":
				changeRGB([0, 200, 20]);
				break;
		}
	}

}
function changeRGB(rgb){
	for(let i = 4; i > 0; i--){
		RGB[i].color = RGB[i-1].color;
	}
	RGB[0].color = rgb;
}
function resetCoords(){
	coords = [
		{
			xy : [mouseX+(0.3*dia), mouseY+(0.3*dia)],
			dia2 : dia*0.3
		},
		{
			xy : [mouseX, mouseY],
			dia2 : dia*0.3
		},
		{
			xy : [mouseX-(0.3*dia), mouseY-(0.3*dia)],
			dia2 : dia*0.3
		},
		{
			xy : [mouseX+(0.3*dia), mouseY-(0.3*dia)],
			dia2 : dia*0.3
		},
		{
			xy : [mouseX-(0.3*dia), mouseY+(0.3*dia)],
			dia2 : dia*0.3
		}
	]
}