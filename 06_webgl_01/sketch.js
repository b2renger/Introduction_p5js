

var settings  // une variable pour la librairie quicksettings
var xrot,yrot,zpos // trois variables pour définir l'orientation de la caméra



function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // on utilise le mode webgl : on peut donc faire de la 3D
    background(0);

    // initialisation de la position de notre camera
    xrot =PI/4
    yrot =-PI/3
    zpos =200
    // création des élément de gui pour manipuler la caméra
    // chaque élément dispose d'une fonction callback : càd qui est executée quand lorsqu'il y a une
    // interaction de l'utilisateur avec l'élément en question
    settings = QuickSettings.create(5, 5, "Controls");
    settings.addRange("camera x rotation", -TWO_PI, TWO_PI, PI/4, 0.1, camXChange);
    settings.addRange("camera y rotation", -PI, PI, -PI/3, 0.1, camYChange);
    settings.addRange("camera z position", -1500, 1500, 200, 1, camZChange);
    settings.addButton("camera reset", resetCam);
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
    xrot =PI/4
    yrot =-PI/3
    zpos =200
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



    push()
    rotateY(frameCount/100);
    rotateX(frameCount/102+PI/4);
    box(50)
    pop()

    push()
    translate(250,0,0)
    rotateY(frameCount/98);
    rotateX(frameCount/103);
    box(50)
    pop()

    push()
    translate(0,250,0)
    rotateY(frameCount/57);
    rotateX(frameCount/75);
    box(50)
    pop()

    push()
    translate(0,0,250)
    rotateY(frameCount/161);
    rotateX(frameCount/63);
    box(50)
    pop()
}

