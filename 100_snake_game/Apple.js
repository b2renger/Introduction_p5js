function Apple(x,y){
	this.position = new Vector(x,y);
	
	this.draw = function(){
		

		stroke(150);
		noFill();
		ellipse(this.position.x,this.position.y,15,15);
		fill(200);
		ellipse(this.position.x,this.position.y,10,10);
		
	}
}



