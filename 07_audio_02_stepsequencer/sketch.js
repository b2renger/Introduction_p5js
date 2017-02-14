var sounds = [] // un tableau pour stocker nos sons
// 3 tableaux pour stocker des lignes de boites à cocher
var bdboxes = [] // rythme pour le son de 'bassdrum'
var snboxes = [] // rythme pour le son de 'snaredrum'
var hhboxes = [] // rythme pour le son de 'high hat'
// sequenceur
var myPart // un metronome
var beat = 0 // la position du sequenceur
var bpm = 90 // la vitesse de défilement
// effets
var filter, filterFreq, filterWidth // un filtre et ses paramètres
var reverb, reverbTime, reverbDecay // une reverb et ses paramètres
var settings // une variable pour créer un menu quicksettings manipulant les paramètres
// des analyseurs audio pour pouvoir représenter les sons joués
var fft1, fft2, fft3, fft4

// on charge les sons à l'aide de la fonction preload
function preload() {
    sounds[0] = loadSound('../assets/76504__meowtek__bd-c64-m.wav');
    sounds[1] = loadSound('../assets/76506__meowtek__snare3-env1.wav');
    sounds[2] = loadSound('../assets/76638__meowtek__hat-c64-3.wav');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0)
    // création des boites à cocher : un rythme est définir par 16 boites (4 mesures de 4 temps)
    for (var i = 0; i < 16; i++) {
        bdboxes[i] = createCheckbox("", false)
        bdboxes[i].position(100 + i * 25, 125)
        bdboxes[i].changed(function () {})
        snboxes[i] = createCheckbox("", false)
        snboxes[i].position(100 + i * 25, 150)
        snboxes[i].changed(function () {})
        hhboxes[i] = createCheckbox("", false)
        hhboxes[i].position(100 + i * 25, 175)
        hhboxes[i].changed(function () {})
    }
    //Sequenceur
    myPart = new p5.Part(); // on créer un objet Part qui va nous permettre de modifier la vitesse de lecture
    // on créer une phrase qui appelle la fonction 'step' à chaque temps. C'est dans cette fonction que l'on va jouer les sons
    var pulse = new p5.Phrase('pulse', step, [1, 1, 1, 1]);
    myPart.addPhrase(pulse); // on ajoute notre phrase à l'objet part
    myPart.setBPM(bpm);
    myPart.start();
    myPart.loop();
    // On créer une chaîne d'effets : le son va passer dans un filtre puis dans une reverb
    // filtre :
    // initialisation des valeurs
    filterFreq = 10000
    filterWidth = 3
    filter = new p5.LowPass(); // création d'un filtre de type lowpass
    // on déconnecte nos sources de la sortie principale
    sounds[0].disconnect();
    sounds[1].disconnect();
    sounds[2].disconnect();
    // on les reconnecte à notre filtre (qui est automatiquement connecté à la sortie audio)
    filter.process(sounds[0]);
    filter.process(sounds[1]);
    filter.process(sounds[2]);
    // reverb :
    // initialisation des valeurs
    reverbTime = 1
    reverbDecay = 100
    reverb = new p5.Reverb(); // création de la reverb
    filter.disconnect(); // on déconnecte le filtre de la sortie principale
    // on connecte le filtre à la reverb
    reverb.process(filter, reverbTime, reverbDecay); // 3 second reverbTime, decayRate of 2%
    // On créer un panneau quicksettings pour pouvoir ajuster le bpm, les paramètres du filtres et de la reverb
    // on utilisera des fonction de callback anonymes pour mettre à jour les valeurs
    settings = QuickSettings.create(windowWidth / 2, 5, "Contols");
    settings.addRange("BPM", 60, 180, bpm, 1, function (val) {
        bpm = val
        myPart.setBPM(bpm)
    });
    settings.addRange("Filter Frequency", 20, 10000, filterFreq, 1, function (val) {
        filterFreq = val
        filter.set(filterFreq, filterWidth)
    });
    settings.addRange("Filter Width", 1, 50, filterWidth, 1, function (val) {
        filterWidth = val
        filter.set(filterFreq, filterWidth)
    });
    settings.addRange("Reverb Time", 0, 10, reverbTime, 1, function (val) {
        reverbTime = val
        reverb.process(filter, reverbTime, reverbDecay, false)
    });
    settings.addRange("Reverb Decay", 0, 100, reverbDecay, 1, function (val) {
        reverbDecay = val
        reverb.process(filter, reverbTime, reverbDecay, false)
    });
    // On créer des objets pour l'analyse audio : on veut représenter la forme d'onde de chaque son
    // et la forme d'onde du mixage général après le filtre et la reverb
    fft1 = new p5.FFT();
    fft1.setInput(sounds[0]);
    fft2 = new p5.FFT();
    fft2.setInput(sounds[1]);
    fft3 = new p5.FFT();
    fft3.setInput(sounds[2]);
    fft4 = new p5.FFT();
    fft4.setInput(reverb);
}
// notre fonction step qui est la fonction de rappel passée à l'objet myPart (notre métronome)
// cette fonction compte le nombre de temps, elle augmente donc la valeur de la variable beat
// elle permet aussi de vérifier si au temps auquel on est (la valeur de 'beat') il est nécessaire de jouer un son
function step() {
    // on vérifie si la checkbox représentant le temps 'beat' est cochée dans le tableau de checkbox controllant les bassdrums
    if (bdboxes[beat].checked()) {
        sounds[0].play(0) // si c'est le cas on jour le premier son du tableau de son
    }
    // on recommence avec la deuxième ligne
    if (snboxes[beat].checked()) {
        sounds[1].play(0)
    }
    // et avec la troisième
    if (hhboxes[beat].checked()) {
        sounds[2].play(0)
    }
    // on augment la valeu de beat
    beat += 1
    beat = beat % 16 // on fait en sorte de boucler entre 0 et 16
}

function draw() {
    background(0)
    // on représente la position à laquelle on est par un rectangle blanc
    fill(255)
    rect(100 + beat * 25, 125, 25, 70);
    // on dessine les formes d'ondes grace à nos objets fft et une fonction dédiée
    if (sounds[0].isPlaying()) drawWave(color(255, 180, 180), fft1.waveform()) // rose == bass drum
    if (sounds[1].isPlaying()) drawWave(color(180, 255, 180), fft2.waveform()) // vert clair == snare drum
    if (sounds[2].isPlaying()) drawWave(color(180, 180, 255), fft3.waveform()) // bleu clair == high hat
    drawWave(color(255), fft4.waveform()) // blanc = mix général
}

// on dessine une forme d'onde en recevant en paramètre une couleur et un tableau de valeurs
function drawWave(col, wav) {
    noFill();
    stroke(col);
    strokeWeight(1);
    // on crée une forme dont on définit les arrêtes grâce aux valeurs de notre tableau 'wav'
    beginShape();
    for (var i = 0; i < wav.length; i++) {
        var x = map(i, 0, wav.length, 0, width / 2);
        var y = map(wav[i], -1, 1, height * 1 / 4, height * 3 / 4); // hauteur = amplitude du signal
        vertex(x, y);
    }
    endShape();
}
