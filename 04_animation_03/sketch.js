
var posX, posY // stocker la position de notre objet
var speedX, speedY // stocker sa vitesse
var friction = 0.05 // un force de friction pour faire ralentir les objets (résistance de l'air)
var force = 10 // une force d'attraction ou de répulsion en fonction du mode choisi
var attraction = true // choix du mode true => la souris attire la balle , false => la souris repousse la balle

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100);

    posX = windowWidth/2
    speedX = random(0.5,2)*cos(random(TWO_PI))

    posY = windowHeight/2
    speedY = random(0.5,2)*sin(random(TWO_PI))

    textSize(14)
    textAlign(CENTER, BOTTOM)
} 

function draw() {
    text("press ' a ' to attract the ball and ' r ' to repulse it",windowWidth/2,windowHeight - 5)

    // on utilise des vecteur pour stocker les positions, vitesses, cibles, cela facilite l'appel des fonctions de calcul
    var vtarget = createVector(mouseX,mouseY)// un vecteur qui représente les coordonnées de notre cible.
    var vpos = createVector(posX, posY) // un vecteur qui represente notre position

    // en fonction du mode choisi on appelle la fonction de calcul physique souhaitée
    // ces fonctions vont calculer les nouvelles accélération, vitesses et positions en fonction
    // des distances, de la force choisie ci-dessus et du coefficient de friction.
    if (attraction) calculs_physiques_attraction(vpos, vtarget)
    else calculs_physiques_repulsion(vpos, vtarget)

    // on vérifie les collisions
    if (posX < 0 || posX > windowWidth) speedX = speedX * (-1)
    if (posY < 0 || posY > windowHeight) speedY = speedY * (-1)

    // on dessine notre cercle
    ellipse(posX, posY, 20, 20);
}

// en change le mode en fonction d'interaction clavier
function keyPressed(){
    if (key == 'a' || key == 'A') attraction = true;
    if (key == 'r' || key == 'R') attraction = false;
}

// une fonction pour calculer la position
function calculs_physiques_attraction(pos, target){
    // on ré-initialise l'accélération
    var accX = 0
    var accY = 0
    // on calcule un force de friction : une résistance au mouvement, pour que notre objet s'arrête s'il n'est
    // plus soumis à aucune force. Cette force doit être inversement proportionnelle au déplacement et donc à
    // la vitesse pour ralentir l'objet en mouvement
    var frict = createVector(speedX,speedY);
    frict.normalize(); // cette opération ne permet de conserver que la direction du vecteur / l'orientation
    frict.mult(-1) // on inverse le vecteur vitesse normalié pour qu'il soit opposé au déplacement
    frict.mult(friction) // on multiplie par notre coefficient de friction
    // on ajoute ce résultat à l'accélération que l'on va applique à notre objet
    accX +=  frict.x;
    accY +=  frict.y;

    // déplacement : l'objet va être attiré par la souris
    var dir = pos.sub(target); // on obtient le vecteur de déplacement : différence entre la position et la cible
    var d = dir.mag(); // on calcul sa magnitude : la distance  qui sépare les deux points du vecteur
    dir.normalize();
    dir.mult(-1);
    dir.div(1/d*d) // on fait en sorte que la force appliquée dépende de l'inverse du carré de la distance
    dir.div(force) // on multiplie par la force souhaitée
    // on ajoute cela à l'accélération
    accX = accX+ dir.x;
    accY = accY+ dir.y;

    // on ajoute l'accélération à la vitesse
    speedX = speedX + accX
    speedY = speedY + accY

    // on ajoute la vitesse à la position
    posX = posX + speedX
    posY = posY + speedY

}

function calculs_physiques_repulsion(pos, target){

    var accX = 0
    var accY = 0
    // force de friction inversement proportionnelle au déplacement
    var frict = createVector(speedX,speedY);
    frict.normalize();
    frict.mult(-1)
    frict.mult(friction)
    accX = accX + frict.x;
    accY = accY + frict.y;

    // déplacement
    var dir = pos.sub(target);
    var d = dir.mag();
    if(d < 100){
        dir.normalize();
        dir.mult(1);
        dir.div(1/d*d)
        dir.div(force)
        accX = accX+ dir.x;
        accY = accY+ dir.y;
    }

    speedX = speedX + accX
    speedY = speedY + accY

    posX = posX + speedX
    posY = posY + speedY

}
