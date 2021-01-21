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
let colorfulMode = 0;
let canvas;
function setup() {
	 canvas = createCanvas(windowWidth, windowHeight);
	background(50, 255, 50);
	
socket = io();

	socket.on('canvas', canvas => {
		loadPixels();
		console.log(pixels);
		console.log(canvas)
		for(let i = 0; i > pixels.length; i+=3){
			pixels[i] = canvas[i];
			pixels[i+1] = canvas[i+1]
			pixels[i+2] = canvas[i+2]
		}
		updatePixels();
		console.log("recieved");
	})
//	socket.on('draw', newDrawing);
	socket.on('draw3', newDrawing3);
	socket.on('drawLine', newDrawingLine)
}
function newDrawing3(draw3Data){
	for(let i = 0; i < 5; ++i){
		noStroke();
		fill(draw3Data.rgb[i].color[0], draw3Data.rgb[i].color[1], draw3Data.rgb[i].color[2])
		ellipse(draw3Data.coords[i+1].xy[0], draw3Data.coords[i+1].xy[1], draw3Data.coords[0].dia2, draw3Data.coords[0].dia2);
	}

}
function newDrawing(drawData){
	noStroke();
	fill(drawData.rgb[0].color[0], drawData.rgb[0].color[1], drawData.rgb[0].color[2]);
	ellipse(drawData.X, drawData.Y, drawData.dia);
}
function newDrawingLine(drawLineData){
	strokeWeight(drawLineData.dia);
	stroke(drawLineData.rgb.color[0], drawLineData.rgb.color[1], drawLineData.rgb.color[2]);
	line(drawLineData.X, drawLineData.Y, drawLineData.pX, drawLineData.pY)

}
function draw() {

}
function mouseDragged(){
	if(mouseIsPressed && mouseButton === LEFT){
sendingDrawEmits()
	}
}
function sendingDrawEmits(){
// if(colorfulMode === 0) {
// 	fill(RGB[0].color[0], RGB[0].color[1], RGB[0].color[2]);
// 	ellipse(mouseX, mouseY, dia, dia);
// 	noStroke();
// 	drawData = {
// 		X: mouseX,
// 		Y: mouseY,
// 		rgb: RGB,
// 		dia: dia
// 	}
// 	//console.log(drawData);
// 	socket.emit('draw', drawData);
// } else
	if(colorfulMode === 0){
	strokeWeight(dia);
	stroke(RGB[0].color[0], RGB[0].color[1], RGB[0].color[2]);
	line(mouseX, mouseY, pmouseX, pmouseY)
	drawLineData= {
		X: mouseX,
		Y: mouseY,
		pX: pmouseX,
		pY: pmouseY,
		rgb: RGB[0],
		dia: dia
	}
socket.emit('drawLine', drawLineData)
}
	else if(colorfulMode === 1){
		for(let i = 0; i < 5; ++i){
			resetCoords();
			noStroke();
			fill(RGB[i].color[0], RGB[i].color[1], RGB[i].color[2])
			ellipse(coords[i+1].xy[0], coords[i+1].xy[1], coords[0].dia2, coords[0].dia2);
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
		if(colorfulMode === 1){
			colorfulMode = 0;
		} else {
			colorfulMode++
		}
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
			// case "t":
			// loadPixels();
			// const data = pixels;
			// console.log(data)
			// socket.emit('canvas', data);
			// console.log(pixelDensity());
			// 	break;
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
	const dia2 = dia*0.3
	coords = [
		{
		dia2 : dia2
		},
		{
			xy : [mouseX+(dia2), mouseY+(dia2)]
		},
		{
			xy : [mouseX, mouseY]
		},
		{
			xy : [mouseX-(dia2), mouseY-(dia2)]
		},
		{
			xy : [mouseX+(dia2), mouseY-(dia2)]
		},
		{
			xy : [mouseX-(dia2), mouseY+(dia2)]
		}
	]
}
// function compressArray(array){
// 	let arrayy = array;
//    let Array = []
// 	let num = 0;
//    let constant = []
//
// 		for(let n = 0; n < array.length; n++){
// if(arrayy.length < 4){
// 	break;
// }
// 			if(constant.length < 1){
// 				constant.push(arrayy[0], arrayy[1], arrayy[2], arrayy[3])
// 			} else if(constant[0] === arrayy[0] || constant[1] === arrayy[1] || constant[2] === arrayy[2] || constant[3] === arrayy[3]){
// 				num++
// 				arrayy.slice(0, 4);
// 				console.log("a")
// 			} else if(constant[0] !== arrayy[0] || constant[1] !== arrayy[1] || constant[2] !== arrayy[2] || constant[3] !== arrayy[3]){
//
// 				Array.push([arrayy[0], arrayy[1], arrayy[2], arrayy[3], num])
// 				num = 0;
// 				constant = [arrayy[0], arrayy[1], arrayy[2], arrayy[3]]
// 			}
// 		}
// return Array;
//
// }