function Vector(x,y){
	this.x = x;
	this.y = y;
}

function vectorAdd(v1,v2){
	var x = v1.x + v2.x;
	var y = v1.y + v2.y;
	return new Vector(x,y);
}

function vectorMultFloat(v1,mult){
	var x = v1.x * mult;
	var y = v1.y * mult;
	return new Vector(x,y);
}

function vectorMultVector(v1,v2){
		var x = v1.x * v2.x;
	var y = v1.y * v2.y;
	return new Vector(x,y);
}

function vectorRotation(v,theta){
	cs = cos(theta);
	sn = sin(theta);
	//console.log( v.x * cs - v.y * sn);
//	var x = v.x * cs - v.y * sn;
//	var y = v.x * sn + v.y * cs;
	
//	var x = -v.y;
//	var y = v.x;
	
	return new Vector(x,y);
}

function vectorTurnRight(v){
	var newVector;
	// if up
	if(v.x == 0 && v.y == -1){
		//right
		newVector = new Vector(1,0);
	}//if right
	if(v.x == 1 && v.y == 0){
		//down
		newVector = new Vector(0,1);
	}//if down
	if(v.x == 0 && v.y == 1){
		//left
		newVector = new Vector(-1,0);
	}//if left
	if(v.x == -1 && v.y == 0){
		//up
		newVector = new Vector(0,-1);
	}
	return newVector;
}

function vectorTurnLeft(v){
	var newVector;
	// if up
	if(v.x == 0 && v.y == -1){
		//left
		newVector = new Vector(-1,0);
	}//if left
	if(v.x == -1 && v.y == 0){
		//down
		newVector = new Vector(0,1);
	}//if down
	if(v.x == 0 && v.y == 1){
		//right
		newVector = new Vector(1,0);
	}//if right
	if(v.x == 1 && v.y == 0){
		//up
		newVector = new Vector(0,-1);
	}
	return newVector;
}

function getDistance(v1,v2){
	var vect1 = createVector(v1.x,v1.y);
	var vect2 = createVector(v2.x,v2.y);
	var distance = vect1.dist(vect2);
	return distance;
}








