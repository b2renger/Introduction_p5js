
var capture; // création d'une variable pour stocker notre élement de capture vidéo

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO); // créer un élément html5 d'accès à la webcam
  capture.size(windowWidth/2, windowHeight/2); // définir la résolution de captation
  capture.hide(); // cacher l'élement vidéo HTML5
  colorMode(HSB,360,100,100,100) // passer en mode HSB
}

function draw() {
  background(255);
  scale(-1,1)  // inverser les coordonnées pour effet miroir
  image(capture, -windowWidth/2, 0, windowWidth/2, windowHeight/2); // afficher l'image de la capture vidéo
  tint(map(mouseX,0,windowWidth,0,360),100,100,100) // teinter l'image précédement dessinée en fonction de la position de la souris
}