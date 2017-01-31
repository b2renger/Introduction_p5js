var nodes = []; // un tableau pour stocker les position en 3D
var nodeSize = 50

var settings  // une variable pour la librairie quicksettings
var xrot,yrot,zpos // trois variables pour définir l'orientation de la caméra

var textures = [
    "../assets/brick1.jpg",
    "../assets/brick2.jpg",
    "../assets/brick3.jpg",
    "../assets/brick4.jpg",
    "../assets/brick5.jpg",
];



function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // on utilise le mode webgl : on peut donc faire de la 3D
    background(0);

    text = loadImage("../assets/brick2.jpg");
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
    settings.addButton("regenerate dla system", regenerate);

    nodes.push(new Node(0,0,0,nodeSize))
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
    resetCam();
}

function draw() {

    background(0);
    // un effet visuel de modification de l'éclairage en fonction de la position de la souris
    // http://p5js.org/examples/3d-multiple-lights.html
    var locY = (mouseX / height - 0.5) * (-2);
    var locX = (mouseY / width - 0.5) * 2;
    ambientLight(25);
    directionalLight(200, 200, 200, 0.55, 0.25, 0.25);
    pointLight(200, 150, 100, locX, locY, 0);
    pointLight(150, 100, 200, -locX, -locY, 0);

    translate(0,0,zpos);
    rotateY(xrot);
    rotateX(yrot);


    for (var i = 0 ; i < nodes.length ; i++){
       nodes[i].draw();
    }

    var nmax = (sqrt(nodes.length + 1)+1)*0.5
    var nmin = nmax *0.1618

    var newX = /*nodes[i].xpos*/+ int(random(nmin,nmax))*nodeSize
    var newY = /*nodes[i].ypos*/+ int(random(nmin,nmax))*nodeSize
    var newZ = /*nodes[i].zpos*/+ int(random(nmin,nmax))*nodeSize

    // changer le signe alétoirement
    if(random(1)<0.5) newX *= -1
    if(random(1)<0.5) newY *= -1
    if(random(1)<0.5) newZ *= -1


    // pour éviter les accès concurrents sur le tableau nodes
    var found = false
    // on parcourt à l'envers pour laisser le moins de chances aux premiers de casser la boucle
    // et laisser plus de chance au dévelloppement des branches
    for (var i = nodes.length-1 ; i >= 0 ; i--){
        var d = dist(newX,newY,newZ, nodes[i].xpos, nodes[i].ypos, nodes[i].zpos)
        if(d == nodeSize){
            //nodes.push(new Node(newX, newY, newZ,50))
            // la ligne ci-dessus ne fonctionne pas probablement à cause d'accès concurents
            found = true
            break // on sort de la boucle immédiatement
        }
    }

    if(found){
        var already = false
        for (var i = 0 ; i < nodes.length ; i++){
            if(nodes[i].xpos == newX && nodes[i].ypos == newY && nodes[i].zpos == newZ) already = true
        }
        if(!already) {
            nodes.push(new Node(newX, newY, newZ,nodeSize))

            console.log(hour(), minute(), second()," - number of nodes : ", nodes.length)
            console.log("square root", nmax)
            console.log("square root in", nmin)
        }
    }
}

// ainsi que la taille d'une sphere. Cette classe ne fait que stocker des valeurs
// et dessiner une sphère à l'endroit et à la taille définie par ces valeurs.
function Node(x,y,z,rad) {
    this.xpos = x;
    this.ypos = y;
    this.zpos = z;
    this.rad = rad;
    this.texture = loadImage(textures[int(random(5))])

    this.draw = function(){
        push()
        texture(this.texture);
        translate(this.xpos,this.ypos, this.zpos)
        box(this.rad)
        pop()
    }
}

