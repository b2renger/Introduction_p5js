var balles =[]

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100);
    colorMode(HSB,360,100,100)
    for (var i = 0 ; i < 100 ; i++){
        balles.push(new Balle(color(random(360),100,100)))
    }
}

function draw() {
    background(100);
    // on parcourt notre tableau une première fois
    for (var i = 0 ; i < balles.length ; i++){
        // l'instance stockée à l'index "i" on appelle les différentes fonctions implémentées.
        balles[i].draw();
        balles[i].update();
        balles[i].check();
        // on parcourt notre tableau une seconde fois
        for (var j = i+1 ; j < balles.length ; j++){
            var threshold = map(mouseX,0,windowWidth,50,250)
            if (dist(balles[i].xpos, balles[i].ypos, balles[j].xpos, balles[j].ypos) < threshold){
                line(balles[i].xpos, balles[i].ypos, balles[j].xpos, balles[j].ypos)
            }
        }

    }
}

// on définit un classe qui s'appelle "Balle"
function Balle(c) {
    this.xpos  = random(windowWidth)
    this.ypos  = random(windowHeight)
    this.xspeed = random(1,5)*cos(random(TWO_PI))
    this.yspeed = random(1,5)*sin(random(TWO_PI))
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
