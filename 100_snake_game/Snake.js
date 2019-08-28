function Snake(pos, direction, length){
		
  	    this.position = pos;
        this.cases = new Array();
		this.direction = direction;
		this.score = 0;
	
    for(var i = 0 ; i < length ; i++){
			
        var distance = vectorMultFloat(direction,gridSize*-i);
        var nextPoint = vectorAdd(this.position,distance);
        this.cases[i] = (nextPoint);
				//console.log(cases[i].y);
    }
    
   // console.log(cases.length);
    this.draw = function(){
				var size = 1;
				for(var i = 0 ; i < length ; i++){
					if(i == 0 ){
						fill(200,0,0);
					}else{
						fill(50);
					}
					//size = (length-i)*0.1;
					rectMode(CENTER);
				
					rect(this.cases[i].x,this.cases[i].y,(gridSize)*size,(gridSize)*size);
					
				
				}
    }
	
		this.move = function(){
		
				for(var i = this.cases.length-1;i > 0 ; i--){
					this.cases[i]=this.cases[i-1];
				}
			
				//move first ball
				var distance = vectorMultFloat(this.direction,gridSize);
				this.cases[0] = vectorAdd(this.cases[0],distance)
				
                //warp
                if(this.cases[0].x > width){
                   this.cases[0].x = 0;
                }
                if(this.cases[0].y > height){
                   this.cases[0].y = 0;
                }
                if(this.cases[0].x < 0){
                   this.cases[0].x = width;
                }
                if(this.cases[0].y < 0){
                   this.cases[0].y = height;
                }
            
				// check death
				for(var i = 1;i < length-1 ; i++){					
					if(this.cases[0].x == this.cases[i].x && this.cases[0].y == this.cases[i].y){
						
						return false;
					}
				}
			
				return true;
		}
	
		this.eat = function(){
			for(var i =0; i< apples.length ; i++){
				var dist = getDistance(this.cases[0],apples[i].position);
				
				if(dist < 20){
					
					apples.splice(i,1);
					this.score += 10; 
					length++;
					this.grow();
				}
			}
		}
	
		this.grow = function(){
			this.cases.push(this.cases[this.cases.length-1]);
			console.log("grow : "+this.cases.length);
		}
}
























