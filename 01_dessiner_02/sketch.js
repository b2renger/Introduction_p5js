function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(180,100,0);  
  
} 

function draw() {
  
  // magnitude du vecteur directeur de la souris avec pythagore
  //var speed=pow(pow(pmouseX-mouseX,2)+pow(pmouseY-mouseY,2),0.5)/2 
  // ou une expression beaucoup plus simple ... après tout on souhaite juste que la taille des cercles
  // soit  dépendente de la vitesse à laquelle on bouge la souris 
  var speed=(abs(pmouseX-mouseX)+abs(pmouseY-mouseY))/2

    // cercle à la position de la souris
  fill(255,0,0,50)
  noStroke()
  ellipse(mouseX, mouseY, speed, speed);
  
  // symetrie axiale verticale
  fill(255,0,255,50)
  ellipse(mouseX, windowHeight-mouseY, speed, speed);
  
  // symetrie axiale horizontale
  fill(0,0,255,50)
  ellipse(windowWidth-mouseX, mouseY, speed, speed);
  
  // symetrie centrale
  fill(255,255,0,50)
  ellipse(windowWidth-mouseX, windowHeight-mouseY, speed, speed);
}