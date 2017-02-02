var targetX, targetY; // coordonées de la cible à atteindre
var posX, posY; // position du cercle

var incr = 0 // incrément

var selX, selY // deux objets select pour choisir quel easing on utilise en abscisse et en ordonnée
var speedX, speedY // deux objets select pour choisir la vitesse du easing choisi
var durX = 100
var durY = 100


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);

  selX = createSelect();
  selX.position(windowWidth/3, windowHeight-25);
  selX.option('ease In Quadratic');
  selX.option('ease Out Quadratic');
  selX.option('ease InOut Quadratic');
  selX.option('ease In Cubic');
  selX.option('ease Out Cubic');
  selX.option('ease InOut Cubic');
  selX.option('ease In Quartic');
  selX.option('ease Out Quartic');
  selX.option('ease InOut Quartic');
  selX.option('ease In Quintic');
  selX.option('ease Out Quintic');
  selX.option('ease InOut Quintic');
  selX.option('ease In Sinusoidal');
  selX.option('ease Out Sinusoidal');
  selX.option('ease InOut Sinusoidal');
  selX.option('ease In Exponential');
  selX.option('ease Out Exponential');
  selX.option('ease InOut Exponential');
  selX.option('ease In Circular');
  selX.option('ease Out Circular');
  selX.option('ease InOut Circular');
  selX.changed(mySelectEvent);

  speedX = createSelect();
  speedX.position(windowWidth/3 + 170, windowHeight-25);
  speedX.option('fast');
  speedX.option('normal');
  speedX.option('slow');
  speedX.changed(mySelectEvent);

  selY = createSelect();
  selY.position(windowWidth*2/3, windowHeight-25);
  selY.option('ease In Quadratic');
  selY.option('ease Out Quadratic');
  selY.option('ease InOut Quadratic');
  selY.option('ease In Cubic');
  selY.option('ease Out Cubic');
  selY.option('ease InOut Cubic');
  selY.option('ease In Quartic');
  selY.option('ease Out Quartic');
  selY.option('ease InOut Quartic');
  selY.option('ease In Quintic');
  selY.option('ease Out Quintic');
  selY.option('ease InOut Quintic');
  selY.option('ease In Sinusoidal');
  selY.option('ease Out Sinusoidal');
  selY.option('ease InOut Sinusoidal');
  selY.option('ease In Exponential');
  selY.option('ease Out Exponential');
  selY.option('ease InOut Exponential');
  selY.option('ease In Circular');
  selY.option('ease Out Circular');
  selY.option('ease InOut Circular');
  selY.changed(mySelectEvent);

  speedY = createSelect();
  speedY.position(windowWidth*2/3+170, windowHeight-25);
  speedY.option('fast');
  speedY.option('normal');
  speedY.option('slow');
  speedY.changed(mySelectEvent);

  posX = windowWidth/2
  targetX = windowWidth /2
  posY = windowHeight/2
  targetY = windowHeight /2

  textSize(14)
  textAlign(RIGHT,TOP)
}

function draw() {

    push()
    fill(0)
    text("xpos interpolation  :  ", windowWidth / 3, windowHeight - 25);
    text("ypos interpolation  :  ", windowWidth * 2 / 3, windowHeight - 25);
    pop()

  incr += 0.15;

  if (speedX.elt.value == "fast"){
     durX =100
  }
   if (speedX.elt.value == "normal"){
     durX =200
  }
   if (speedX.elt.value == "slow"){
     durX =400
  }

  if(selX.elt.value == "ease In Quadratic"){
     posX = easeInQuad(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease Out Quadratic"){
     posX = easeOutQuad(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease InOut Quadratic"){
    posX = easeInOutQuad(incr, posX, (targetX-posX), durX)
  }
  else if(selX.elt.value == "ease In Cubic"){
     posX = easeInCubic(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease Out Cubic"){
     posX = easeOutCubic(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease InOut Cubic"){
    posX = easeInOutCubic(incr, posX, (targetX-posX), durX)
  }
  else if(selX.elt.value == "ease In Quartic"){
     posX = easeInQuart(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease Out Quartic"){
     posX = easeOutQuart(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease InOut Quartic"){
    posX = easeInOutQuart(incr, posX, (targetX-posX), durX)
  }
  else if(selX.elt.value == "ease In Quintic"){
     posX = easeInQuint(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease Out Quintic"){
     posX = easeOutQuint(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease InOut Quintic"){
    posX = easeInOutQuint(incr, posX, (targetX-posX), durX)
  }
  else if(selX.elt.value == "ease In Sinusoidal"){
     posX = easeInSine(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease Out Sinusoidal"){
     posX = easeOutSine(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease InOut Sinusoidal"){
    posX = easeInOutSine(incr, posX, (targetX-posX), durX)
  }
   else if(selX.elt.value == "ease In Exponential"){
     posX = easeInExpo(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease Out Exponential"){
     posX = easeOutExpo(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease InOut Exponential"){
    posX = easeInOutExpo(incr, posX, (targetX-posX), durX)
  }
  else if(selX.elt.value == "ease In Circular"){
     posX = easeInCirc(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease Out Circular"){
     posX = easeOutCirc(incr, posX, (targetX-posX), durX)
  }
  else if (selX.elt.value == "ease InOut Circular"){
    posX = easeInOutCirc(incr, posX, (targetX-posX), durX)
  }

  if (speedY.elt.value == "fast"){
     durY =100
  }
   if (speedY.elt.value == "normal"){
     durY =200
  }
   if (speedY.elt.value == "slow"){
     durY =400
  }

  if(selY.elt.value == "ease In Quadratic"){
     posY = easeInQuad(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease Out Quadratic"){
     posY = easeOutQuad(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease InOut Quadratic"){
     posY = easeInOutQuad(incr, posY, (targetY-posY), durY)
  }
  else if(selY.elt.value == "ease In Cubic"){
     posY = easeInCubic(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease Out Cubic"){
     posY = easeOutCubic(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease InOut Cubic"){
     posY = easeInOutCubic(incr, posY, (targetY-posY), durY)
  }
  else if(selY.elt.value == "ease In Quartic"){
     posY = easeInQuart(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease Out Quartic"){
     posY = easeOutQuart(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease InOut Quartic"){
     posY = easeInOutQuart(incr, posY, (targetY-posY), durY)
  }
  else if(selY.elt.value == "ease In Quintic"){
     posY = easeInQuint(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease Out Quintic"){
     posY = easeOutQuint(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease InOut Quintic"){
     posY = easeInOutQuint(incr, posY, (targetY-posY), durY)
  }
  else if(selY.elt.value == "ease In Sinusoidal"){
     posY = easeInSine(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease Out Sinusoidal"){
     posY = easeOutSine(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease InOut Sinusoidal"){
     posY = easeInOutSine(incr, posY, (targetY-posY), durY)
  }
  else if(selY.elt.value == "ease In Exponential"){
     posY = easeInExpo(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease Out Exponential"){
     posY = easeOutExpo(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease InOut Exponential"){
     posY = easeInOutExpo(incr, posY, (targetY-posY), durY)
  }
  else if(selY.elt.value == "ease In Circular"){
     posY = easeInCirc(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease Out Circular"){
     posY = easeOutCirc(incr, posY, (targetY-posY), durY)
  }
  else if (selY.elt.value == "ease InOut Circular"){
     posY = easeInOutCirc(incr, posY, (targetY-posY), durY)
  }





  ellipse(posX, posY, 20, 20);
}

function mousePressed(){
 if( mouseY < windowHeight-25){
  targetX = mouseX
  targetY = mouseY
  incr = 0
 }
}

function mySelectEvent(){
  console.log("x : " ,selX.elt.value , "/  duration : " , speedX.elt.value);
  console.log("y : " ,selY.elt.value,  "/  duration : " , speedY.elt.value);
}

// Penner's tween functions : http://robertpenner.com/easing/penner_chapter7_tweening.pdf
// quadratic
function easeInQuad(t,b,c,d){
  return c*(t/d)*t + b;
}
function easeOutQuad(t, b, c, d) {
  return -c * (t/=d)*(t-2) + b;
}
function easeInOutQuad(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t + b;
  return -c/2 * ((--t)*(t-2) - 1) + b;
}

// cubic
function easeInCubic (t, b, c, d) {
  return c * Math.pow (t/d, 3) + b;
}
function easeOutCubic (t, b, c, d) {
  return c * (Math.pow (t/d-1, 3) + 1) + b;
}
function easeInOutCubic (t, b, c, d) {
  if ((t/=d/2) < 1)
  return c/2 * Math.pow (t, 3) + b;
  return c/2 * (Math.pow (t-2, 3) + 2) + b;
}

// quartic
function easeInQuart(t, b, c, d) {
  return c * Math.pow (t/d, 4) + b;
}
function easeOutQuart(t, b, c, d) {
  return -c * (Math.pow (t/d-1, 4) - 1) + b;
}
function easeInOutQuart (t, b, c, d) {
  if ((t/=d/2) < 1)
  return c/2 * Math.pow (t, 4) + b;
  return -c/2 * (Math.pow (t-2, 4) - 2) + b;
}

// quintic
function easeInQuint(t, b, c, d) {
  return c * Math.pow (t/d, 5) + b;
}
function easeOutQuint  (t, b, c, d) {
  return c * (Math.pow (t/d-1, 5) + 1) + b;
}
function easeInOutQuint (t, b, c, d) {
  if ((t/=d/2) < 1)
  return c/2 * Math.pow (t, 5) + b;
  return c/2 * (Math.pow (t-2, 5) + 2) + b;
}

// sinusoid
function easeInSine (t, b, c, d) {
  return c * (1 - Math.cos(t/d * (Math.PI/2))) + b;
}
function easeOutSine (t, b, c, d) {
  return c * Math.sin(t/d * (Math.PI/2)) + b;
}
function easeInOutSine (t, b, c, d) {
  return c/2 * (1 - Math.cos(Math.PI*t/d)) + b;
}

// exponential
function easeInExpo (t, b, c, d) {
  return c * Math.pow(2, 10 * (t/d - 1)) + b;
}
function easeOutExpo (t, b, c, d) {
  return c * (-Math.pow(2, -10 * t/d) + 1) + b;
}
function easeInOutExpo (t, b, c, d) {
  if ((t/=d/2) < 1)
  return c/2 * Math.pow(2, 10 * (t - 1)) + b;
  return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
}

// circular
function easeInCirc (t, b, c, d) {
  return c * (1 - Math.sqrt(1 - (t/=d)*t)) + b;
}
function easeOutCirc (t, b, c, d) {
  return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
}
function easeInOutCirc (t, b, c, d) {
  if ((t/=d/2) < 1)
  return c/2 * (1 - Math.sqrt(1 - t*t)) + b;
  return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
};
