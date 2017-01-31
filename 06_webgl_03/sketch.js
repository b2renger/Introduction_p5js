
var nodes = []; // un tableau pour stocker les position en 3D
var rad = 100   // un rayon de départ
var theta,phi,r //variables pour stocker les coordonnées sphériques !
var noiseF // un facteur de bruit pour le déplacement à l'aide d'un bruit de Perlin

var settings  // une variable pour la librairie quicksettings
var xrot,yrot,zpos // trois variables pour définir l'orientation de la caméra

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // on utilise le mode webgl : on peut donc faire de la 3D
    background(0);

    // intialisation de nos coordonées sphériques : deux angles et une distance
    theta = random(TWO_PI)
    phi = random(TWO_PI)
    r = 0
    noiseF = random(500)

    // initialisation de la position de notre camera
    xrot =0
    yrot =0
    zpos =-500

    // création des élément de gui pour manipuler la caméra
    // chaque élément dispose d'une fonction callback : càd qui est executée quand lorsqu'il y a une
    // interaction de l'utilisateur avec l'élément en question
    settings = QuickSettings.create(5, 5, "Camera Controls");
    settings.addRange("x rotation", -PI, PI, 0, 0.1, camXChange);
    settings.addRange("y rotation", -PI, PI, 0, 0.1, camYChange);
    settings.addRange("z position", -2500, 1500, -500, 1, camZChange);
    settings.addButton("reset camera", resetCam);
}

// callback pour les éléments gui
function camXChange(val){
    xrot = val
}
function camYChange(val){
    yrot = val
}
function camZChange(val){
    zpos= val
}
function resetCam(){
    xrot =0
    yrot =0
    zpos =-500
}

function draw() {

    background(0);
    // un effet visuel de modification de l'éclairage en fonction de la position de la souris
    // http://p5js.org/examples/3d-multiple-lights.html
    var locY = (mouseX / height - 0.5) * (-2);
    var locX = (mouseY / width - 0.5) * 2;
    ambientLight(25);
    directionalLight(200, 0, 0, 0.55, 0.25, 0.25);
    pointLight(200, 0, 100, locX, locY, 0);
    pointLight(200, 100, 100, -locX, -locY, 0);

    // positionnement de notre dessin en fonction de variables dédiés à la caméra
    translate(0,0,zpos);
    rotateY(yrot);
    rotateX(xrot);

    // on limite le nombre d'éléments crées et la vitesse à laquelle ils se créent
    if(frameCount%10 ==0 && nodes.length < 500){

        // on repart à la racine si le rayon est inférieur à 10
        // et on ré-initialise toutes les valeurs importantes
        if(rad < 10){
            theta = random(PI)
            phi = random(TWO_PI)
            r = 0
            rad = 100
            noiseF = random(500)
        }

        r+= rad/2 // on s'éloigne du centre à vitesse constance
        // avec une orientation dépendant d'un bruit de Perlin
        noiseF += 0.085
        theta += map(noise(noiseF,10,20),0,1,-0.055,0.055)
        phi += map(noise(10,noiseF,42),0,1,-0.055,0.055)

        // on diminue le rayon tout en le conservant dans un intevalle acceptable.
        rad -= rad/15
        rad = constrain(rad, 1,rad);

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
        translate(this.xpos,this.ypos, this.zpos)
        sphere(this.rad)
        pop()
    }
}
