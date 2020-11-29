let RGB = [0,0,0];
let dia = 50;
var socket;
//import {port} from '../server.js';

//requirejs.config({
	//By default load any module IDs from js/lib
	//baseUrl: 'P5Project',
	//except, if the module ID starts with "app",
	//load it from the js/app directory. paths
	//config is relative to the baseUrl, and
	//never includes a ".js" extension since
	//the paths config could be for a directory.
	//paths: {
	//	app: 'public/sketch'
	//}
//});
function setup() {
	import {port} from '../server.js';

	createCanvas(windowWidth, windowHeight);
	background(50, 255, 50)
	//	requirejs(["server"], function(server){
	//	});
	socket = io.connect('http://localhost:'+ port);
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
}

function mouseWheel(event){

		if(event.delta > 0 && dia > 10){
			dia -= 2;
		} else if(dia < 250){
			dia += 2;
		}

}
function mousePressed(){
	if(mouseButton === RIGHT){
		RGB = [get(mouseX, mouseY)[0], get(mouseX, mouseY)[1], get(mouseX, mouseY)[2]]
	}
}
