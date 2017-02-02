var settings // une variable pour la librairie quicksettings
var cam // une variable pour stocker une instance de la classe EasyCam ci-dessous
var ambient, directional, spot // des variables bouléennes pour activer les différents types d'éclairages

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // on utilise le mode webgl : on peut donc faire de la 3D
    background(0);
    // initialisation de la position de notre camera
    cam = new EasyCam()

    ambient = true;
    directional = false;
    spot = true;

    // création des élément de gui pour manipuler la caméra
    // chaque élément dispose d'une fonction callback : càd qui est executée quand lorsqu'il y a une
    // interaction de l'utilisateur avec l'élément en question
    settings = QuickSettings.create(5, 5, "Controls");
    settings.addButton("camera reset",  function(){cam.resetCam()});
    settings.addBoolean("ambient Light", false, function(){ambient = !ambient; createCanvas(windowWidth, windowHeight, WEBGL);})
    settings.addBoolean("directional Light", false, function(){directional = !directional; createCanvas(windowWidth, windowHeight, WEBGL);})
    settings.addBoolean("point Light", true, function(){spot = !spot;createCanvas(windowWidth, windowHeight, WEBGL);})
}

function draw() {
    background(0);
    cam.update() // on actualise les transformation de la classe EasyCam

    // Gérer les types d'éclairage
    if(ambient) {ambientLight(75,120,10);} // une lumière verte/jaune
     // calculer des varibles entre -10 et 10 pour en fonction de la souris pour contrôler
    // l'éclairage directionel
    var locY = (mouseX / width - 0.5) * (5);
    var locX = (mouseY / height - 0.5) * (-5);
    if(directional) directionalLight(250, 100, 100, locY, locX, 0.25);// une lumière rouge qui se dirige en fonction de la souris
    if(spot){
        pointLight(200, 200, 255, -500*cos(frameCount/100), 0,-500*sin(frameCount/100+PI)); // une lumière bleu qui tourne autour du centre
        push()
        translate(500*cos(frameCount/100), 0, -500*sin(frameCount/100+PI))
        sphere(5)
        pop()
    }



    // deux cubes
    push()
    rotateY(frameCount / 100);
    rotateX(frameCount / 102 + PI / 4);
    box(50)
    pop()

    push()
    translate(0, 0, 250)
    rotateY(frameCount / 161);
    rotateX(frameCount / 63);
    box(50)
    pop()

    // deux sphères, avec une réflextion spéculaire
    push()
    translate(250, 0, 0)
    rotateY(frameCount / 98);
    rotateX(frameCount / 103);
    specularMaterial(200)
    sphere(50)
    pop()

    push()
    translate(0, 250, 0)
    rotateY(frameCount / 57);
    rotateX(frameCount / 75);
    specularMaterial(200)
    sphere(50)
    pop()
}


// appeler les fonction de EazyCam pour en fonction des actions de l'utilisateur
function mouseDragged(){
    cam.drag(mouseX,mouseY,pmouseX,pmouseY)
}
function mouseWheel(val){
    // val.deltaY récupère la variation de déplacement à deux doigts
    // sur le touch pad de haut en bas
    cam.move(val.deltaY)
}

// une classe pour manipuler la caméra 3D avec la souris.
// maintenir cliqué et déplacer la souris pour regarder autour
// molette de la souris pour se rapprocher ou s'éloigner.
function EasyCam(){
    // 3 variables d'états + 3 cibles pour interpolation
    this.xrot= PI/4
    this.yrot= -PI/3
    this.zpos=  200
    this.xrotTarget = PI/4
    this.yrotTarget = PI/3
    this.zposTarget =0

    this.update = function(){
        // interpolation des varaibales d'état
        this.xrot += (this.xrotTarget-this.xrot)*0.05
        this.yrot += (this.yrotTarget-this.yrot)*0.05
        this.zpos += (this.zposTarget-this.zpos)*0.1
        // orientation des dessin qui suiveront l'appel de cette fonction
        translate(0, 0, this.zpos);
        rotateX(this.xrot)
        rotateY(this.yrot)
    }

    this.resetCam = function() {
        this.xrot = PI / 4
        this.yrot = -PI / 3
        this.zpos = 0
        this.xrotTarget = PI/4
        this.yrotTarget = -PI/3
        this.zposTarget =0
    }

    this.drag = function(x,y,px,py){
        // changer la valeur de la cible en fonction du déplacement de la souris
        // en abscisses et en ordonées
        this.xrotTarget += (y-py)/100 ;
        this.yrotTarget += (x-px)/100;
    }

    this.move = function(val){
        //changer la valeur de la position cible le long de l'axe z
        this.zposTarget += val
    }
}

