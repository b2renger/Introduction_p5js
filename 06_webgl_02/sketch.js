var nodes = []; // un tableau pour stocker les position en 3D
var nodeSize = 50 // défintion de la taille d'un élément (essayez de la modifier)
var settings // une variable pour la librairie quicksettings
var cam // une variable pour notre caméra
// on créer un tableau qui stocke les chemins vers des images qui seront
// utilisées comme textures.
var textures = [
    "../assets/brick1.jpg"
    , "../assets/brick2.jpg"
    , "../assets/brick3.jpg"
    , "../assets/brick4.jpg"
    , "../assets/brick5.jpg"
, ];

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL); // on utilise le mode webgl : on peut donc faire de la 3D
    background(0);
    // initialisation de la position de notre camera
    cam = new EasyCam()
    // création des élément de gui pour ré-initialiser la caméra et la simulation
    settings = QuickSettings.create(5, 5, "Controls");
    settings.addButton("camera reset", function () {
        cam.resetCam()
    });
    settings.addButton("regenerate dla system", regenerate);
    nodes.push(new Node(0, 0, 0, nodeSize))
}

function regenerate() {
    nodes = [];
     nodes.push(new Node(0, 0, 0, nodeSize))
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
    // on dessine toutes les noeuds dont on dispose
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].draw();
    }
    //Ici commence l'algorithme de DLA
    // on définit des bornes min et max pour notre tirage au sort : l'objectif est de tirer des coordonnées
    // qui ont des chances d'être à proximité d'éléments déjà dessinés pour pouvoir faire grandir notre structure
    var nmax = (sqrt(nodes.length + 1) + 1) * 0.5 // on fait en sorte que la croissance de ce nombre ralentisse quand il y a beaucoup de noeuds
    var nmin = nmax * 0.1618 // nombre d'or/10
    // on définit une nouvelle position dans l'espace 3D qui respecte notre grille
    // avec des cubes qui font une taille définie par la variable nodeSize
    var newX = /*nodes[i].xpos*/ +int(random(nmin, nmax)) * nodeSize
    var newY = /*nodes[i].ypos*/ +int(random(nmin, nmax)) * nodeSize
    var newZ = /*nodes[i].zpos*/ +int(random(nmin, nmax)) * nodeSize
    // changer le signe alétoirement pour éviter de se développer que dans un seul cadran
    if (random(1) < 0.5) newX *= -1
    if (random(1) < 0.5) newY *= -1
    if (random(1) < 0.5) newZ *= -1
    // Ici on procède en deux temps pour éviter les accès concurrents sur le tableau nodes
    // d'abord on le parcourt et on cherche un élément déjà dessiné dont la distance avec les coodonnées
    // générées alaétoirement précédement est inférieur à la taille d'un élément : autrement dit ils ont
    // au moins une face en comment
    var found = false
    // on parcourt à l'envers pour laisser le moins de chances aux premiers éléments de casser la boucle
    // et laisser plus de chance au dévelloppement des branches vers l'extérieur
    for (var i = nodes.length - 1; i >= 0; i--) {
        var d = dist(newX, newY, newZ, nodes[i].xpos, nodes[i].ypos, nodes[i].zpos)
        if (d == nodeSize) {
            //nodes.push(new Node(newX, newY, newZ,50))
            // la ligne ci-dessus ne fonctionne pas probablement à cause d'accès concurents
            // on donc utilise un booléen pour dire qu'on a trouvé un élément déjà dessiné
            // à côté de nos coordonnées aléatoires.
            found = true
            break // on sort de la boucle immédiatement
        }
    }
    // si on a trouvé un élément, on vérifie d'abord qu'il n'est pas déjà dans notre liste
    // puis on l'ajoute au tableau d'éléments déjà dessinés.
    if (found) {
        // on vérifie
        var already = false
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].xpos == newX && nodes[i].ypos == newY && nodes[i].zpos == newZ) already = true
        }
        // si il n'existe pas alors on l'ajoute et on imprime des choses dans la console
        if (!already) {
            nodes.push(new Node(newX, newY, newZ, nodeSize))
            // ces logs m'ont servit à mesurer la croissance en fonction du temps et l'évolution
            // des paramètres qui définissent la zone dans laquelle on tire les coordonnées au sort.
            console.log(hour(), minute(), second(), " - number of nodes : ", nodes.length)
            console.log("square root", nmax)
            console.log("square root in", nmin)
        }
    }
}
// Cette classe ne fait que stocker des valeurs
// et dessiner un cube texturé à l'endroit et à la taille définie par ces valeurs.
function Node(x, y, z, rad) {
    this.xpos = x;
    this.ypos = y;
    this.zpos = z;
    this.rad = rad;
    // on définit une texture qui est tiré aléatoirement pour chaque instance dans notre tableau de texture.
    this.texture = loadImage(textures[int(random(5))])

    this.draw = function () {
        push()
        texture(this.texture);// on applique notre texture
        translate(this.xpos, this.ypos, this.zpos)
        box(this.rad)
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
