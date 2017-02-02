var targetRad, targetHue; // coordonées de la cible à atteindre
var rad, hueVal; // position du cercle
var incr = 0 // incrément
var selRad, selHue // deux objets select pour choisir quel easing on utilise en abscisse et en ordonnée
var speedRad, speedHue // deux objets select pour choisir la vitesse du easing choisi
var durRad = 100
var durHue = 100

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100);
    colorMode(HSB, 360, 100, 100)
    selRad = createSelect();
    selRad.position(windowWidth / 3, windowHeight - 25);
    selRad.option('ease In Quadratic');
    selRad.option('ease Out Quadratic');
    selRad.option('ease InOut Quadratic');
    selRad.option('ease In Cubic');
    selRad.option('ease Out Cubic');
    selRad.option('ease InOut Cubic');
    selRad.option('ease In Quartic');
    selRad.option('ease Out Quartic');
    selRad.option('ease InOut Quartic');
    selRad.option('ease In Quintic');
    selRad.option('ease Out Quintic');
    selRad.option('ease InOut Quintic');
    selRad.option('ease In Sinusoidal');
    selRad.option('ease Out Sinusoidal');
    selRad.option('ease InOut Sinusoidal');
    selRad.option('ease In Exponential');
    selRad.option('ease Out Exponential');
    selRad.option('ease InOut Exponential');
    selRad.option('ease In Circular');
    selRad.option('ease Out Circular');
    selRad.option('ease InOut Circular');
    selRad.changed(mySelectEvent);
    speedRad = createSelect();
    speedRad.position(windowWidth / 3 + 170, windowHeight - 25);
    speedRad.option('fast');
    speedRad.option('normal');
    speedRad.option('slow');
    speedRad.changed(mySelectEvent);
    selHue = createSelect();
    selHue.position(windowWidth * 2 / 3, windowHeight - 25);
    selHue.option('ease In Quadratic');
    selHue.option('ease Out Quadratic');
    selHue.option('ease InOut Quadratic');
    selHue.option('ease In Cubic');
    selHue.option('ease Out Cubic');
    selHue.option('ease InOut Cubic');
    selHue.option('ease In Quartic');
    selHue.option('ease Out Quartic');
    selHue.option('ease InOut Quartic');
    selHue.option('ease In Quintic');
    selHue.option('ease Out Quintic');
    selHue.option('ease InOut Quintic');
    selHue.option('ease In Sinusoidal');
    selHue.option('ease Out Sinusoidal');
    selHue.option('ease InOut Sinusoidal');
    selHue.option('ease In Exponential');
    selHue.option('ease Out Exponential');
    selHue.option('ease InOut Exponential');
    selHue.option('ease In Circular');
    selHue.option('ease Out Circular');
    selHue.option('ease InOut Circular');
    selHue.changed(mySelectEvent);
    speedHue = createSelect();
    speedHue.position(windowWidth * 2 / 3 + 170, windowHeight - 25);
    speedHue.option('fast');
    speedHue.option('normal');
    speedHue.option('slow');
    speedHue.changed(mySelectEvent);
    rad = 100
    targetRad = 600
    hueVal = 180
    targetHue = 0
    textSize(14)
    textAlign(RIGHT, TOP)
}

function draw() {
    background(0)
    push()
    fill(255)
    text("radius interpolation  :  ", windowWidth / 3, windowHeight - 25);
    text("hue interpolation  :  ", windowWidth * 2 / 3, windowHeight - 25);
    pop()
    incr += 0.15;
    if (speedRad.elt.value == "fast") {
        durRad = 100
    }
    if (speedRad.elt.value == "normal") {
        durRad = 200
    }
    if (speedRad.elt.value == "slow") {
        durRad = 400
    }
    if (selRad.elt.value == "ease In Quadratic") {
        rad = easeInQuad(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease Out Quadratic") {
        rad = easeOutQuad(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease InOut Quadratic") {
        rad = easeInOutQuad(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease In Cubic") {
        rad = easeInCubic(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease Out Cubic") {
        rad = easeOutCubic(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease InOut Cubic") {
        rad = easeInOutCubic(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease In Quartic") {
        rad = easeInQuart(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease Out Quartic") {
        rad = easeOutQuart(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease InOut Quartic") {
        rad = easeInOutQuart(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease In Quintic") {
        rad = easeInQuint(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease Out Quintic") {
        rad = easeOutQuint(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease InOut Quintic") {
        rad = easeInOutQuint(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease In Sinusoidal") {
        rad = easeInSine(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease Out Sinusoidal") {
        rad = easeOutSine(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease InOut Sinusoidal") {
        rad = easeInOutSine(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease In Exponential") {
        rad = easeInExpo(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease Out Exponential") {
        rad = easeOutExpo(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease InOut Exponential") {
        rad = easeInOutExpo(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease In Circular") {
        rad = easeInCirc(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease Out Circular") {
        rad = easeOutCirc(incr, rad, (targetRad - rad), durRad)
    }
    else if (selRad.elt.value == "ease InOut Circular") {
        rad = easeInOutCirc(incr, rad, (targetRad - rad), durRad)
    }
    if (speedHue.elt.value == "fast") {
        durHue = 100
    }
    if (speedHue.elt.value == "normal") {
        durHue = 200
    }
    if (speedHue.elt.value == "slow") {
        durHue = 400
    }
    if (selHue.elt.value == "ease In Quadratic") {
        hueVal = easeInQuad(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease Out Quadratic") {
        hueVal = easeOutQuad(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease InOut Quadratic") {
        hueVal = easeInOutQuad(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease In Cubic") {
        hueVal = easeInCubic(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease Out Cubic") {
        hueVal = easeOutCubic(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease InOut Cubic") {
        hueVal = easeInOutCubic(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease In Quartic") {
        hueVal = easeInQuart(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease Out Quartic") {
        hueVal = easeOutQuart(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease InOut Quartic") {
        hueVal = easeInOutQuart(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease In Quintic") {
        hueVal = easeInQuint(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease Out Quintic") {
        hueVal = easeOutQuint(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease InOut Quintic") {
        hueVal = easeInOutQuint(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease In Sinusoidal") {
        hueVal = easeInSine(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease Out Sinusoidal") {
        hueVal = easeOutSine(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease InOut Sinusoidal") {
        hueVal = easeInOutSine(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease In Exponential") {
        hueVal = easeInExpo(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease Out Exponential") {
        hueVal = easeOutExpo(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease InOut Exponential") {
        hueVal = easeInOutExpo(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease In Circular") {
        hueVal = easeInCirc(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease Out Circular") {
        hueVal = easeOutCirc(incr, hueVal, (targetHue - hueVal), durHue)
    }
    else if (selHue.elt.value == "ease InOut Circular") {
        hueVal = easeInOutCirc(incr, hueVal, (targetHue - hueVal), durHue)
    }
    fill(abs(hueVal), 100, 100)
    ellipse(windowWidth / 2, windowHeight / 2, rad, rad);
}

function mousePressed() {
    if (mouseY < windowHeight - 25) {
        if (targetRad == 100) {
            targetHue = 1
            targetRad = 600
        }
        else {
            targetHue = 180
            targetRad = 100
        }
        incr = 0
    }
}

function mySelectEvent() {
    console.log("radius interpolation : ", selRad.elt.value, "/  duration : ", speedRad.elt.value);
    console.log("hueVal interpolation : ", selHue.elt.value, "/  duration : ", speedHue.elt.value);
}
// Penner's tween functions : http://robertpenner.com/easing/penner_chapter7_tweening.pdf
// quadratic
function easeInQuad(t, b, c, d) {
    return c * (t / d) * t + b;
}

function easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
}

function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}
// cubic
function easeInCubic(t, b, c, d) {
    return c * Math.pow(t / d, 3) + b;
}

function easeOutCubic(t, b, c, d) {
    return c * (Math.pow(t / d - 1, 3) + 1) + b;
}

function easeInOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(t, 3) + b;
    return c / 2 * (Math.pow(t - 2, 3) + 2) + b;
}
// quartic
function easeInQuart(t, b, c, d) {
    return c * Math.pow(t / d, 4) + b;
}

function easeOutQuart(t, b, c, d) {
    return -c * (Math.pow(t / d - 1, 4) - 1) + b;
}

function easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(t, 4) + b;
    return -c / 2 * (Math.pow(t - 2, 4) - 2) + b;
}
// quintic
function easeInQuint(t, b, c, d) {
    return c * Math.pow(t / d, 5) + b;
}

function easeOutQuint(t, b, c, d) {
    return c * (Math.pow(t / d - 1, 5) + 1) + b;
}

function easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(t, 5) + b;
    return c / 2 * (Math.pow(t - 2, 5) + 2) + b;
}
// sinusoid
function easeInSine(t, b, c, d) {
    return c * (1 - Math.cos(t / d * (Math.PI / 2))) + b;
}

function easeOutSine(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
}

function easeInOutSine(t, b, c, d) {
    return c / 2 * (1 - Math.cos(Math.PI * t / d)) + b;
}
// exponential
function easeInExpo(t, b, c, d) {
    return c * Math.pow(2, 10 * (t / d - 1)) + b;
}

function easeOutExpo(t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) + b;
}

function easeInOutExpo(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}
// circular
function easeInCirc(t, b, c, d) {
    return c * (1 - Math.sqrt(1 - (t /= d) * t)) + b;
}

function easeOutCirc(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}

function easeInOutCirc(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * (1 - Math.sqrt(1 - t * t)) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
};