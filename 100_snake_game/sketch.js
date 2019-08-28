var dead = false;

var snake;

var apples = new Array();

const gridSize = 20;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    snake = new Snake(new Vector(width/2,height/2),new Vector(0,-1),10);
	  snake.draw();
		for(var i = 0; i < 100 ; i++){
			spawnApple();
		}
}

function draw() {
	
	noStroke();
		if(dead){
		background(30);
	}else{
		background(0);
	}
	if(frameCount%10 == 0){	
		if(!dead){

			if(snake.move() == false){
				
				dead = true;
			}
			snake.eat();
		}
	}

	snake.draw();
	
	drawApples();
	
	fill(255);
	textSize(30);
	text("score : "+snake.score, width/2, 50);
}

function keyReleased() {

		if(keyCode == RIGHT_ARROW){
					snake.direction = vectorTurnRight(snake.direction);
		}
		if(keyCode == LEFT_ARROW){
					snake.direction = vectorTurnLeft(snake.direction);
		}

}

function spawnApple(){
	apples.push(new Apple(random(width),random(height)))
}

function drawApples(){

	for(var i = 0 ; i< apples.length ; i++){
		apples[i].draw();
	}
}















