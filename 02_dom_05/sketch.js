var s1,s2,s3,s4 // des variables pour créer les instances de nos programmes.

function setup(){
  s1 = new p5(sketch) // on dit que s1 est un nouveau programme de type p5js(ou une instance) et qu'il execute le programme appellé "sketch"
  s2 = new p5(sketch2)
  s3 = new p5(sketch3)
  s4 = new p5(sketch4)
  controls(); // on initialise les boutons pour controler les programmes
}

// on crée une nouvelle variable sketch, celle qui est appelée dans le setup
// ce sera un programme p5js. Il est nécessaire de passer une "instance" de p5
// pour pouvoir accès aux fonction de p5. C'est le "p" utilisé un peu partout.
// On doit "l'appeler" avant chaque fonction intégrée dans p5 (par ex : p.fill(255))
var sketch = function(p) { 
  var capture;
  p.setup = function() { // on créer le setup de notre programme avec "p." devant le mot clé setup
    var c = p.createCanvas(p.windowWidth/2, p.windowHeight/2); // on crée un canvas
    c.position(0,0); // on le place dans la page
    // initialisation de la capture
    capture = p.createCapture(p.VIDEO);
    capture.size(p.width, p.height);
    capture.hide()
  }
  p.draw = function() {
    p.background(255);
    p.scale(-1,1)
    p.image(capture, -p.width , 0, p.width, p.height);
  }
}

var sketch2 = function(p) {
  var capture;
  p.setup = function() {
    var c = p.createCanvas(p.windowWidth/2, p.windowHeight/2);
    c.position(p.windowWidth/2,0)
    capture = p.createCapture(p.VIDEO);
    capture.size(p.width, p.height);
    capture.hide()
  }
  p.draw = function() {
    p.background(255);
    p.scale(-1,1)
    p.image(capture, -p.width , 0, p.width, p.height);
    p.filter('POSTERIZE',4+p.mouseX/p.width);
  }
}

var sketch3 = function(p) {
  var capture;
  p.setup = function() {
    var c = p.createCanvas(p.windowWidth/2, p.windowHeight/2);
    c.position(0,p.windowHeight/2)
    capture = p.createCapture(p.VIDEO);
    capture.size(p.width, p.height);
    capture.hide()
  }
  p.draw = function() {
    p.background(255);
    p.scale(-1,1)
    p.image(capture, -p.width , 0, p.width, p.height);
    p.filter('INVERT');
  }
}

var sketch4 = function(p) {
  var capture;
  p.setup = function() {
    var c =  p.createCanvas(p.windowWidth/2, p.windowHeight/2);
    c.position(p.windowWidth/2 , p.windowHeight/2)
    capture = p.createCapture(p.VIDEO);
    capture.size(p.windowWidth, p.height);
    capture.hide();
  }
  p.draw = function() {
    p.background(255);
    p.scale(-1,1)
    p.image(capture, -p.width, 0, p.width, p.height);
    p.filter('THRESHOLD',p.mouseX/p.windowWidth);
  }
}

var b_stop1,b_start1,b_stop2,b_start2, b_start3, b_stop3, b_start4, b_stop4

// Création des boutons pour mettre en pause et relancer les programmes
function controls(){
  // controles pour le premier sketch
  b_stop1 = createButton('pause'); // on crée un bouton
  b_stop1.position(0, 0); // on le positionne
  // la fonction mousePressed du bouton est activé lorsqu'on clique sur le bouton
  b_stop1.mousePressed(function sketch_off (){ // on passe en argument de la fonction mousePressed une fonction javascript
    s1.noLoop() // cette fonction a une seulle instruction appeler noLoop sur la variable s1 qui est notre premier sketch.
  }); 
  b_start1 = createButton('resume'); // on crée un second bouton
  b_start1.position(50, 0);
  b_start1.mousePressed(function sketch_on (){
    s1.loop()
  });
  // controles pour le deuxième sketch
  b_stop2 = createButton('pause');
  b_stop2.position(windowWidth/2, 0);
  b_stop2.mousePressed(function sketch_off (){
    s2.noLoop()
  });
  b_start2 = createButton('resume');
  b_start2.position(windowWidth/2+50, 0);
  b_start2.mousePressed(function sketch_on (){
    s2.loop()
  });
  // controles pour le troisième sketch
  b_stop3 = createButton('pause');
  b_stop3.position(0, windowHeight/2);
  b_stop3.mousePressed(function sketch_off (){
    s3.noLoop()
  });
  b_start3 = createButton('resume');
  b_start3.position(50, windowHeight/2);
  b_start3.mousePressed(function sketch_on (){
    s3.loop()
  });
  // controles pour le quatrième sketch
  b_stop4 = createButton('pause');
  b_stop4.position(windowWidth/2, windowHeight/2);
  b_stop4.mousePressed(function sketch_off (){
    s4.noLoop()
  });
  b_start4 = createButton('resume');
  b_start4.position(windowWidth/2 + 50, windowHeight/2);
  b_start4.mousePressed(function sketch_on (){
    s4.loop()
  });

}


