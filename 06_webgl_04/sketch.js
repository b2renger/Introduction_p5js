
var nodes = []; // un tableau pour stocker les position en 3D
var stems = [];

var maxRad = 42
var maxIteration = 500
var niteration=0

var seed

var settings  // une variable pour la librairie quicksettings
var xrot,yrot,zpos // trois variables pour définir l'orientation de la caméra

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // on utilise le mode webgl : on peut donc faire de la 3D
    background(0);

    stems.push(new Stem(0,0,0,maxRad,0.0025))

    // initialisation de la position de notre camera
    xrot =0
    yrot =-PI/2
    zpos =-500



    // création des élément de gui pour manipuler la caméra
    // chaque élément dispose d'une fonction callback : càd qui est executée quand lorsqu'il y a une
    // interaction de l'utilisateur avec l'élément en question
    settings = QuickSettings.create(5, 5, "Controls");
    settings.addRange("camera x rotation", -TWO_PI, TWO_PI, 0, 0.1, camXChange);
    settings.addRange("camera y rotation", -PI, PI, -PI/2, 0.1, camYChange);
    settings.addRange("camera z position", -1500, 1500, -500, 1, camZChange);
    settings.addButton("camera reset", resetCam);
    settings.addButton("regenerate tree", regenerate);
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
    yrot =-PI/2
    zpos =-500
}
function regenerate(){

    nodes = [];
    stems = [];
    maxRad = 30
    stems.push(new Stem(0,0,0,maxRad,0.0025))
    xrot =0
    yrot =-PI/2
    zpos =-500
    niteration = 0


}

function draw() {

    background(0);
    // un effet visuel de modification de l'éclairage en fonction de la position de la souris
    // http://p5js.org/examples/3d-multiple-lights.html
    var locY = (mouseX / height - 0.5) * (-1);
    var locX = (1- (mouseY / width-0.5) ) * 1;
    //ambientLight(25);
    directionalLight(5, 75, 5, 0.55, 0.35, 0.35);
    pointLight(15, 65, 15, locX, locY, 0);
    pointLight(15, 65, 5, -locX, -locY, 0);

    translate(0,400,0)

    push()
    // positionnement de notre dessin en fonction de variables dédiés à la caméra
    translate(0,0,zpos);
    rotateY(xrot);
    rotateX(yrot);

     // on dessine l'ensemble des objets stockés
    for (var i = 0 ; i < stems.length ; i++){
        stems[i].update();
    }

    // on dessine l'ensemble des objets stockés
    for (var i = 0 ; i < nodes.length ; i++){
        nodes[i].draw();
    }
    pop()
}


function Stem (x,y,z,rad, noiseIncr) {

    this.rad = rad
    this.startRad = rad

    this.noiseF = random(5000)// un facteur de bruit pour le déplacement à l'aide d'un bruit de Perlin
    this.noiseIncr = noiseIncr

    //variables pour stocker les coordonnées sphériques !
    this.theta = random(-PI/2,PI/2)
    this.phi = random(-PI/2,PI/2)
    this.r = 1

    this.x = x
    this.y = y
    this.z = z

    this.update=function(){
        // on limite le nombre d'éléments crées et la vitesse à laquelle ils se créent
        if( nodes.length < 50000){
            this.r = this.rad // on s'éloigne du centre à vitesse constante
            // avec une orientation dépendant d'un bruit de Perlin
            this.noiseF += this.noiseIncr
            this.theta += map(noise(this.noiseF,10,20),0,1,-0.15,0.15)
            this.phi += map(noise(66,this.noiseF,42),0,1,-0.25,0.25)

            // on diminue le rayon tout en le conservant dans un intevalle acceptable.
            this.rad -= this.rad*0.1618*0.1618
            this.rad = constrain(this.rad, 1,100);

            // on convertit nos coordonnées sphériques en coordonnées cartésiennes
            // https://en.wikipedia.org/wiki/Spherical_coordinate_system#Cartesian_coordinates
            this.x+= this.r * sin(this.theta) * cos(this.phi)
            this.y+= this.r * sin(this.theta) * sin(this.phi)
            this.z+= this.r * cos(this.theta)

            // on créer un nouvel objet aux positions calculées, avec le nouveau diamètre
            nodes.push(new Node(this.x,this.y,this.z,this.rad))


            if(this.rad < this.startRad*2/3 && niteration < maxIteration){
                if (niteration < 35 ){
                    stems.push(new Stem(this.x,this.y,this.z, this.rad - this.rad*0.1618, 0.065))
                    stems.push(new Stem(this.x,this.y,this.z, this.rad - this.rad*0.1618, 0.065))
                    stems.push(new Stem(this.x,this.y,this.z, this.rad - this.rad*0.1618, 0.065))
                    stems.push(new Stem(this.x,this.y,this.z, this.rad - this.rad*0.1618, 0.065))
                }
                else if(niteration > 35 && niteration <100 ){
                    stems.push(new Stem(this.x,this.y,this.z, this.rad - this.rad*0.1618, 0.39))
                    stems.push(new Stem(this.x,this.y,this.z, this.rad - this.rad*0.1618, 0.39))
                    stems.push(new Stem(this.x,this.y,this.z, this.rad - this.rad*0.1618, 0.39))
                }
                else {
                    stems.push(new Stem(this.x,this.y,this.z, this.rad - this.rad*0.1618, 0.7192))
                    stems.push(new Stem(this.x,this.y,this.z, this.rad - this.rad*0.1618, 0.7192))
                }

                niteration +=1

                var i = stems.indexOf(this);
                stems.splice(i,1)

                console.log(stems.length, niteration)
            }
        }
    }
}

// Cette classe ne fait que stocker des valeurs
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
