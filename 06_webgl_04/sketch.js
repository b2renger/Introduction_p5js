var nodes = []; // un tableau pour stocker les position en 3D
var stems = [];
var cam // une variable pour notre caméra
var maxRad = 25
var maxIteration = 150
var niteration = 0
var seed
var settings // une variable pour la librairie quicksettings

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // on utilise le mode webgl : on peut donc faire de la 3D
    background(0);
    stems.push(new Stem(0, 0, 0, maxRad, 0.000, 0.0, 0.0))
        // initialisation de la position de notre camera
    cam = new EasyCam()
        // création des élément de gui pour manipuler la caméra
        // chaque élément dispose d'une fonction callback : càd qui est executée quand lorsqu'il y a une
        // interaction de l'utilisateur avec l'élément en question
    settings = QuickSettings.create(5, 5, "Controls");
    settings.addButton("camera reset", function () {
        cam.resetCam()
    });
    settings.addButton("regenerate tree", regenerate);
}

function regenerate() {
    nodes = [];
    stems = [];
    maxRad = 25
    stems.push(new Stem(0, 0, 0, maxRad, 0.00, 0.0, 0.0))
    niteration = 0
    sphereDetail(5)
}

function draw() {
    background(0);

    var locY = (mouseX / width - 0.5) * (5);
    var locX = (mouseY / height - 0.5) * (-5);
    ambientLight(55, 85, 3);
    directionalLight(100, 100, 100, 0.55, 0.25, 0.25);
    pointLight(90, 80, 10, locY, locX, 0);
    pointLight(25, 50, 25, -locY, -locX, 0);
    //ambientLight(55, 45, 3);

    cam.update()
    // on pousse un nouveau repère pour garder les transformation de la caméra mais pouvoir quand même
    // dessiner la base de l'arbre plus bas, mais de garder le fait de se déplace en abscisses pour faire
    // tourner l'abre sur lui même !
    push()
    translate(0, 800, 0) // on se décalle
    push()// on pousse un nouveau repère dans lequel on force l'orientation
    rotateY(0);
    rotateX(-PI / 2);
    // initialisation de la position de notre camera
    // on dessine l'ensemble des objets stockés
    for (var i = 0; i < stems.length; i++) {
        stems[i].update();
    }
    // on dessine l'ensemble des objets stockés
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].draw();
    }
    pop()
    pop()
}
// Cette classe définit une branche, au départ il n'y en a qu'une, puis elle se sépare en 4, puis en 3, puis en 2
// à chaque fois que la branche se sépare : cela signifie qu'on ajoute un certain nombres d'objet de type Stem au tableau
// "stems", mais aussi qu'on enlève la branche en question.
// Chaque branche se déplace en 3D avec un noise comme nos tentacules précédement et dispose des instances de l'objet Node
// au bon endroit
function Stem(x, y, z, rad, noiseIncr, theta, phi) {
    // coordonnées cartésiennes du node à créer
    this.x = x
    this.y = y
    this.z = z
    this.rad = rad // rayon du node à créer
    // on garde en mémoire le rayon de départ, pour pouvoir comparer le rayon actuel au rayon de départ et déclencher les embranchements
    this.startRad = rad
    this.noiseF = random(1000) // un facteur de bruit pour le déplacement à l'aide d'un bruit de Perlin
    this.noiseIncr = noiseIncr // on fera en sorte que les branches basses tournent peu et les branches hautes un peu plus
     //variables pour stocker les coordonnées sphériques !
    this.theta = theta;
    this.phi = phi;
    this.r = 1
    this.update = function () {
        // on limite le nombre d'éléments crées et la vitesse à laquelle ils se créent
        if (nodes.length < 9000) {
            this.rad -= this.rad * 0.01 // on diminue le rayon par le nombre d'or divisé par 10 au carré
            this.rad = constrain(this.rad, maxRad / 30, maxRad);
            console.log(this.rad)
            this.r = this.rad // on s'éloigne du centre à vitesse
            this.r = constrain(this.r, 10, maxRad);
            // avec une orientation dépendant d'un bruit de Perlin
            this.noiseF += this.noiseIncr
            this.theta += map(noise(this.noiseF, 10, 20), 0, 1, -0.15, 0.15)
            this.phi += map(noise(66, this.noiseF, 42), 0, 1, -0.25, 0.25)
            // on convertit nos coordonnées sphériques en coordonnées cartésiennes
            // https://en.wikipedia.org/wiki/Spherical_coordinate_system#Cartesian_coordinates
            this.x += this.r * sin(this.theta) * cos(this.phi)
            this.y += this.r * sin(this.theta) * sin(this.phi)
            this.z += this.r * cos(this.theta)
            nodes.push(new Node(this.x, this.y, this.z, this.rad))
            // on va créer des embranchement en comparant le rayon au rayon initial avec pour limite un nombre d'embranchement
            // maximum (définit tout en haut)
            if (this.rad > maxRad / 25 && this.rad < this.startRad * 0.719 && niteration < maxIteration) {
                var i = stems.indexOf(this);
                stems.splice(i, 1)
                // en fonction de l'iteration on crée différents types d'embranchements
                if (niteration < 20) {
                    stems.push(new Stem(this.x, this.y, this.z, this.rad, 0.065, random(-PI / 4, PI / 4), random(-PI / 4, PI / 4)))
                    stems.push(new Stem(this.x, this.y, this.z, this.rad, 0.065, random(-PI / 4, PI / 4), random(-PI / 4, PI / 4)))
                    stems.push(new Stem(this.x, this.y, this.z, this.rad, 0.065, random(-PI / 4, PI / 4), random(-PI / 4, PI / 4)))
                    stems.push(new Stem(this.x, this.y, this.z, this.rad, 0.065, random(-PI / 4, PI / 4), random(-PI / 4, PI / 4)))
                }
                else if (niteration > 20 && niteration < 45) {
                    stems.push(new Stem(this.x, this.y, this.z, this.rad, 0.119, random(-PI / 3, PI / 3), random(-PI / 3, PI / 3)))
                    stems.push(new Stem(this.x, this.y, this.z, this.rad, 0.119, random(-PI / 3, PI / 3), random(-PI / 3, PI / 3)))
                    stems.push(new Stem(this.x, this.y, this.z, this.rad, 0.119, random(-PI / 3, PI / 3), random(-PI / 3, PI / 3)))
                }
                else {
                    stems.push(new Stem(this.x, this.y, this.z, this.rad, 0.492, random(-PI / 3, PI / 3), random(-PI / 3, PI / 3)))
                    stems.push(new Stem(this.x, this.y, this.z, this.rad, 0.492, random(-PI / 3, PI / 3), random(-PI / 3, PI / 3)))
                }
                niteration += 1
            }
            //console.log(nodes.length, stems.length, niteration)
        }
    }
}
// Cette classe ne fait que stocker des valeurs
// et dessiner une sphère à l'endroit et à la taille définie par ces valeurs.
function Node(x, y, z, rad) {
    this.xpos = x;
    this.ypos = y;
    this.zpos = z;
    this.rad = rad;
    this.draw = function () {
        push()

        specularMaterial(180)
        translate(this.xpos, this.ypos, this.zpos)
        sphere(this.rad,8,4)
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
    this.xrot = 0
    this.zpos = 0
    this.yrot = 0
    this.xrotTarget = 0
    this.yrotTarget = 0
    this.zposTarget = -1600
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
        this.xrot = 0
        this.zpos = 0
        this.yrot = 0
        this.xrotTarget = 0
        this.yrotTarget = 0
        this.zposTarget = -1600
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
