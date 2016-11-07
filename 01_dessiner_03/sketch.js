

function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(0);  
  
} 

function draw() {  

  var speed=(abs(pmouseX-mouseX)+abs(pmouseY-mouseY))/2

  strokeWeight(speed/2)
    // cercle à la position de la souris
  stroke(255,0,0,25)
 
  line(mouseX, mouseY, windowWidth/2, windowHeight/2 );

  // symetrie axiale verticale
  stroke(255,0,255,25)
  line(mouseX, windowHeight-mouseY, windowWidth/2, windowHeight/2);
  
  // symetrie axiale horizontale
  stroke(0,0,255,25)
  line(windowWidth-mouseX, mouseY, windowWidth/2, windowHeight/2);
  
  // symetrie centrale
  stroke(255,255,0,25)
  line(windowWidth-mouseX, windowHeight-mouseY, windowWidth/2, windowHeight/2);
  
}

