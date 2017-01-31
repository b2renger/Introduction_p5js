var balles =[] // créer un tableau de balles

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100);
    colorMode(HSB,360,100,100)
    // on utilise une boucle for pour créer 100 instances de la classe Balle
    // qui vont être stockées dans notre tableau appelé "balles/
    for (var i = 0 ; i < 100 ; i++){
        balles.push(new Balle(color(random(360),100,100))) // on ajoute chaque instance au tableau en "passant" une couleur aléatoire.
    }
}

function draw() {
    background(100);
    // on parcourt notre tableau
    for (var i = 0 ; i < balles.length ; i++){ // la condition d'arrêt est la longueur du tableau "balles.length"
        // l'instance stockée à l'index "i" on appelle les différentes fonctions implémentées.
        balles[i].draw();
        balles[i].update();
        balles[i].check();
    }
}

// on définit un classe qui s'appelle "Balle"
function Balle(c) {
    this.xpos  = windowWidth/2
    this.ypos  = windowHeight/2
    this.xspeed = random(2,10)*cos(random(TWO_PI))
    this.yspeed = random(2,10)*sin(random(TWO_PI))
    this.c = c

    this.draw = function(){
        fill(this.c);
        ellipse(this.xpos, this.ypos, 20, 20); // on utilise les variables précédées de "this."
    }

    this.update = function(){
        this.xpos = this.xpos + this.xspeed
        this.ypos = this.ypos + this.yspeed
    }

    this.check = function(){
        if (this.xpos < 0 || this.xpos > windowWidth) this.xspeed = this.xspeed * (-1)
        if (this.ypos < 0 || this.ypos > windowHeight) this.yspeed = this.yspeed * (-1)
    }
}
