// on définit des variables pour stocker la position de notre disque
var xpos 
var ypos 
// on définit des variables pour stocker la vitesse de notre disque
var xspeed
var yspeed

function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(100);  
  // on initialise nos variables
  xpos = windowWidth/2
  ypos = windowHeight/2
  // on utilise les coordonées polaire pour initialiser la vitesse de déplacement
  xspeed = random(2,10)*cos(random(TWO_PI))
  yspeed = random(2,10)*sin(random(TWO_PI))
  
} 

function draw() { 
  // on dessine notre disque à la position définie par nos variable
  ellipse(xpos, ypos, 20, 20);
  // on augmente la position en abscisses de xspeed unités
  xpos = xpos + xspeed
  // on augmente la position en ordonnée d'yspeed unités
  ypos = ypos + yspeed

  // on vérifie que l'on ne tappe pas le bord gauche ou le bord droit
  if (xpos < 0 || xpos > windowWidth){
    xspeed = xspeed * (-1) // si c'est le cas on inverse le sens de déplacement en abscisses
  }
  // on vérifie que l'on ne tappe pas le haut ou le bas 
  if (ypos < 0 || ypos > windowHeight){
    yspeed = yspeed * (-1) // si c'est le cas on inverse le sens de déplacement en ordonnées
  }


}