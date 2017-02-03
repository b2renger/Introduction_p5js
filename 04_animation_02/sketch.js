var targetX, targetY; // stocker la position de notre cible
var posX, posY; // stocker la position de notre objet

function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(100); 
  
  posX = windowWidth/2
  targetX = windowWidth /2

  posY = windowHeight/2
  targetY = windowHeight /2
} 

function draw() {
  
  // notre cible est la position de la souris
  targetX = mouseX
  targetY = mouseY
  
  // on ajoute une petite portion de la distance nous séparant de notre cible à notre position
  posX += (targetX - posX) * 0.01
  posY += (targetY- posY) * 0.01

  ellipse(posX, posY, 20, 20);
}
