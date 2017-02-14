var settings // une variable pour la bibliothèque quicksettings
// les variables pour l'animation correspondant à l'exemple 04_animation_02
var posX = 0
var posY = 0
var targetX = 0
var targetY = 0
// nos variables pour l'audio
var carrier; // une variable pour un oscillateur dit "porteuse" celui que l'on va entendre
var carrierBaseFreq = 220; // une variable pour la fréquence de base de la porteuse
var modulator; // une variable pour un oscillateur pour notre signal de modulation
// un tableau stockant les différents types d'oscillateurs disponnibles dans p5.sound
var types = [
    'sine', 'triangle', 'sawtooth', 'square'
    ]


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100);
    // initialiser la porteuse
    carrier = new p5.Oscillator('sine');
    carrier.amp(0); // set amplitude
    carrier.freq(carrierBaseFreq); // set frequency
    carrier.start();
    // initialiser l'oscillateur pour moduler notre porteuse
    modulator = new p5.Oscillator('sine');
    modulator.freq(12)
    modulator.amp(100)
    modulator.start();
    // la sortie de notre modulator va controller la fréquence de notre porteuse
    modulator.disconnect();
    carrier.freq(modulator);
    // mise en place des éléments guit
    settings = QuickSettings.create(windowWidth - 200, 0, "Contols");
    // type d'oscillateur
    settings.addDropDown("carrier oscillator type", types, function (val) {
        carrier.setType(val.value);
    });
    settings.addDropDown("modulator oscillator type", types, function (val) {
        modulator.setType(val.value);
    });
    // paramètres de modulation
    settings.addRange("modulator depth", -150, 150, 100, 1, function (val) {
        modulator.amp(val);
    })
    settings.addRange("modulator freq", 0, 100, 12, 1, function (val) {
       modulator.freq(val);
    })
}

function draw() {
    // animation
    targetX = mouseX
    targetY = mouseY
    posX += (targetX - posX) * 0.05
    posY += (targetY - posY) * 0.05
    ellipse(posX, posY, 20, 20);
    // ajustement des paramètres audio : le volume en fonction de la distance
    var d = dist(mouseX, mouseY, posX, posY);
    carrier.amp(map(d, 0, windowWidth, 0.15, 0),0.25,0)
    // le positionnement stéréo en fonction de la position dans la fenêtre
    carrier.pan(map(posX,0,width,-1,1))
}
