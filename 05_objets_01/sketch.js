var bal // on crée une variable nommée 'bal' qui va stocker notre objet

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  colorMode(HSB,360,100,100)
  var col = color(random(360),100,100)
  bal = new Balle(col) // on définit la variable 'bal' comme un objet de type "Balle"
}

function draw() {
    // on appelle les fonctions de l'objet 'bal' qui est une instance de la classe "Balle"
    bal.draw();
    bal.update();
    bal.check();
}

// on définit un classe qui s'appelle "Balle"
function Balle(c) {
    // on définit et on initialise des variables pour stocker la position et
    // la vitesse de notre disque précédées de "this."
    this.xpos  = windowWidth/2
    this.ypos  = windowHeight/2
    this.xspeed = random(2,10)*cos(random(TWO_PI))
    this.yspeed = random(2,10)*sin(random(TWO_PI))
    this.c = c //

    // on définit une fonction pour dessiner notre disque
    this.draw = function(){
        fill(this.c)
        ellipse(this.xpos, this.ypos, 20, 20); // on utilise les variables précédées de "this."
    }

    // on définit une fonction pour calculer la prochaine position de notre disque
    this.update = function(){
        this.xpos = this.xpos + this.xspeed
        this.ypos = this.ypos + this.yspeed
    }

    // on définit une fonction pour vérifier les collisions
    this.check = function(){
        if (this.xpos < 0 || this.xpos > windowWidth) this.xspeed = this.xspeed * (-1)
        if (this.ypos < 0 || this.ypos > windowHeight) this.yspeed = this.yspeed * (-1)
    }
}
