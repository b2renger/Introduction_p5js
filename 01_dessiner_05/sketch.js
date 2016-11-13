var hue; // stocker la teinte d'une couleur

function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(0);  
  hue = 255; // intialisation à bleu
  colorMode(HSB,360,100,100,100) // appliquer le mode HSB
} 

function draw() {

  var size = (abs(pmouseX-mouseX)+abs(pmouseY-mouseY)) + 10 
  
  if (mouseIsPressed) { // si la souris est clickée on dessine avec la fonction de dessin définie ci-dessous
    sp(mouseX,mouseY,size)
  }

  if (keyIsDown(LEFT_ARROW)) { // si la flêche de gauche est préssée
    hue = hue -1  // on modifie la teinte
    hue = constrain(hue,0,360) // on s'assure de rester dans le cadre des valeurs utilisables
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    hue = hue +1
    hue = constrain(hue,0,360)
  }

  // dessiner un petit carré représentant la teinte sélectionnée
  fill(hue,100,100,100)
  rect(0, windowHeight -25 ,25,25)

}


// fonction permettant de dessiner un ensemble de taches de couleurs dans un rayon défini
// ce rayon dépendera de la vitesse de la souris
function sp(x,y,size){
  push()
  noStroke()
  fill(hue,100,100,30) // on applique la teinte et on garde une transparence importante
  translate(x,y)
  for (var i = 0 ; i < size*2 ; i = i+1){
    // coordonées polaire = rayon + angle
    var radius = random(size) 
    var angle = random(TWO_PI)
    // formule de passage de coordonées polaires en coordonnées catésienne
    var xpos = radius*cos(angle)
    var ypos = radius*sin(angle)
    // on dessine une ellipse dont la taille dépend de son éloignement
    ellipse(xpos, ypos, map(radius,0,size,size/5,0), map(radius,0,size,size/5,0))
  }
  pop()
}
