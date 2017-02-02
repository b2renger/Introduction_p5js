
var nodes = []; // un tableau pour stocker les position en 3D
var rad = 100   // un rayon de départ
var theta,phi,r //variables pour stocker les coordonnées sphériques !
var noiseF // un facteur de bruit pour le déplacement à l'aide d'un bruit de Perlin

var settings  // une variable pour la librairie quicksettings
var cam // une variable pour notre caméra


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // on utilise le mode webgl : on peut donc faire de la 3D
    background(0);

    // intialisation de nos coordonées sphériques : deux angles et une distance
    theta = random(TWO_PI)
    phi = random(TWO_PI)
    r = 0
    noiseF = random(500)

    // initialisation de la position de notre camera
    cam = new EasyCam()

    // création des élément de gui pour manipuler la caméra
    // chaque élément dispose d'une fonction callback : càd qui est executée quand lorsqu'il y a une
    // interaction de l'utilisateur avec l'élément en question
    settings = QuickSettings.create(5, 5, "Camera Controls");
    settings.addButton("camera reset", function () {
        cam.resetCam()
    });
    settings.addButton("regenerate system", regenerate);
}

function regenerate() {
    nodes = [];
    theta = random(TWO_PI)
    phi = random(TWO_PI)
    r = 0
    noiseF = random(500)
}


function draw() {

    background(0);
     cam.update() // on actualise les transformation de la classe EasyCam
    // un effet visuel de modification de l'éclairage en fonction de la position de la souris
    var locY = (mouseX / width - 0.5) * (5);
    var locX = (mouseY / height - 0.5) * (-5);
    ambientLight(25);
    directionalLight(200, 200, 200, 0.55, 0.25, 0.25);
    pointLight(200, 150, 100, locY, locX, 0);
    pointLight(150, 100, 200, -locY, -locX, 0);

    // on limite le nombre d'éléments crées et la vitesse à laquelle ils se créent
    if( nodes.length < 20000){

        // on repart à la racine si le rayon est inférieur à 10
        // et on ré-initialise toutes les valeurs importantes
        if(rad < 5){
            theta = random(PI)
            phi = random(TWO_PI)
            r = 0
            rad = 100
            noiseF = random(500)
        }
        // on diminue le rayon tout en le conservant dans un intevalle acceptable.
        rad -= rad/15
        rad = constrain(rad, 1,rad);

        r+= rad/2 // on s'éloigne du centre à vitesse constance
        // avec une orientation dépendant d'un bruit de Perlin
        noiseF += 0.085
        theta += map(noise(noiseF,10,20),0,1,-0.055,0.055)
        phi += map(noise(10,noiseF,42),0,1,-0.055,0.055)

        // on convertit nos coordonnées sphériques en coordonnées cartésiennes
        // https://en.wikipedia.org/wiki/Spherical_coordinate_system#Cartesian_coordinates
        var x = r * sin(theta) * cos(phi)
        var y = r * sin(theta) * sin(phi)
        var z = r * cos(theta)

        // on créer un nouvel objet aux positions calculées, avec le nouveau diamètre
        nodes.push(new Node(x,y,z,rad))
    }

    // on dessine l'ensemble des objets stockés
    for (var i = 0 ; i < nodes.length ; i++){
        nodes[i].draw();
    }
}

// ainsi que la taille d'une sphere. Cette classe ne fait que stocker des valeurs
// et dessiner une sphère à l'endroit et à la taille définie par ces valeurs.
function Node(x,y,z,rad) {
    this.xpos = x;
    this.ypos = y;
    this.zpos = z;
    this.rad = rad;

    this.draw = function(){
        push()
        specularMaterial(250)
        translate(this.xpos,this.ypos, this.zpos)
        sphere(this.rad)
        pop()
    }
}


// appeler les fonction de EazyCam pour en fonction des actions de l'utilisateur
function mouseDragged() {
    cam.drag(mouseX, mouseY, pmouseX, pmouseY)
}

function mouseWheel(val) {
    // val.deltaY récupère la variation de déplacement à deux doigts
    // sur le touch pad de haut en bas
    cam.move(val.deltaY)
}
// une classe pour manipuler la caméra 3D avec la souris.
// maintenir cliqué et déplacer la souris pour regarder autour
// molette de la souris pour se rapprocher ou s'éloigner.
function EasyCam() {
    // 3 variables d'états + 3 cibles pour interpolation
    this.xrot = PI / 4
    this.yrot = -PI / 3
    this.zpos = 200
    this.xrotTarget = PI / 4
    this.yrotTarget = PI / 3
    this.zposTarget = 0
    this.update = function () {
        // interpolation des varaibales d'état
        this.xrot += (this.xrotTarget - this.xrot) * 0.05
        this.yrot += (this.yrotTarget - this.yrot) * 0.05
        this.zpos += (this.zposTarget - this.zpos) * 0.1
            // orientation des dessin qui suiveront l'appel de cette fonction
        translate(0, 0, this.zpos);
        rotateX(this.xrot)
        rotateY(this.yrot)
    }
    this.resetCam = function () {
        this.xrot = PI / 4
        this.yrot = -PI / 3
        this.zpos = 0
        this.xrotTarget = PI / 4
        this.yrotTarget = -PI / 3
        this.zposTarget = 0
    }
    this.drag = function (x, y, px, py) {
        // changer la valeur de la cible en fonction du déplacement de la souris
        // en abscisses et en ordonées
        this.xrotTarget += (y - py) / 100;
        this.yrotTarget += (x - px) / 100;
    }
    this.move = function (val) {
        //changer la valeur de la position cible le long de l'axe z
        this.zposTarget += val
    }
}
