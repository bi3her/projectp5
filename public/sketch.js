let RGB = [0,0,0];
let dia = 50;
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100, 100, 255)
}

function draw() {
if(mouseIsPressed){
	fill(RGB[0], RGB[1], RGB[2]);
	ellipse(mouseX, mouseY, dia,dia);
	noStroke();
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
		RGB = get(mouseX, mouseY);
	}
}
