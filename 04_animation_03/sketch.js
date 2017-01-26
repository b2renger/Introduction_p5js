var anchorX, anchorY // coordonées du point d'ancrage du dessin
var distance, orientation // variable pour stocker les coordonées polaires de notre cercle
var diam; // diametre du cercle
var noiseF; // une variable que l'on va faire évoluer à chaque image pour notre bruit de Perlin

function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(100);  
  
  diam = random(20,50)
  anchorX = windowWidth/2;
  anchorY = windowHeight/2;
  
  distance = 0;
  orientation = random(TWO_PI);
  
  noiseF = 5
  
} 

function draw() {
  
  diam -= 0.1 // on diminue le diamètre
  distance += 1; // on augmente la distance
  orientation += map(noise(noiseF,10,20),0,1,-0.015,0.015) // on ajuste l'orientation avec un bruit de Perlin et la fonction map
  // noise(noiseF,10,20) permet de générer un bruit compris entre 0 et 1
  // ce résultat est directement utilisé dans la fonction map, pour convertir le résultat de l'intervalle [0,1] à l'intervalle [-0.015,0.015]
  // qui peut être assimilable à un angle en radians soit des variations comprises entre + ou - 1 degrée par image
  noiseF += 0.005 // on incrémente la variable évolutive pour générer notre bruit
  
  // on calcule la position en coordonnées cartésiennes à partir de nos coordonnées polaires
  var xpos = anchorX + distance * cos(orientation)  
  var ypos = anchorY + distance * sin(orientation)
  
  ellipse(xpos,ypos,diam,diam)
  
  // si le diamètre est suffisament petit on réinitialise un certain nombre de variables
  if(diam<0.1){
    noiseF = random(-1000,1000)
    diam = random(20,50)
    distance = 0;
    orientation = random(TWO_PI);  
  }
  
}

function mousePressed(){
  anchorX = mouseX
  anchorY = mouseY
  diam = random(20,50)
}