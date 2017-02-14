
var psynth; // un variable pour stocker un synthétiseur polyphonique
var settings // une variable pour la bibliothèque quicksettings
// quelques variables à manipuler par l'utilisateur
// des types d'oscillateurs
var types = [
    'sine', 'triangle', 'sawtooth', 'square'
    ]
// des types de tables harmoniques
var harmonicTable = [
    'odds', 'evens', 'half tones', 'experimental'
    ]
var harmonics = [1, 3, 5, 7, 9]; // un table harmonique par défaut
var oscT = 'sine' // un type d'oscillateur par défaut
// des variables pour définir des valeurs d'enveloppe par défaut
var noteAttack = 0.5
var noteDecay = 1
var noteSustain = 1
var noteRelease = 0.5

function setup() {
    createCanvas(windowWidth - 200, windowHeight);
    // on crée un synthé polyphonique à 15 voix dont le moteur de synthèse est définit par la classe AdditiveSynth ci-dessous
    psynth = new PolySynth(15, AdditiveSynth);
    psynth.setAdsr(noteAttack, noteDecay, noteSustain, noteRelease)
    /*
    on va maintenant créer beaucoup d'éléments gui gérés par quicksettings
    */
    settings = QuickSettings.create(windowWidth - 200, 0, "Contols");
    // type d'oscillateur
    settings.addDropDown("oscillator type", types, function (val) {
        oscT = val.value;
        psynth.setParams({
            harmonics: harmonics
            , osctype: oscT
        });
    });
    // sélection de la table d'harmonie
    settings.addDropDown("harmonics table", harmonicTable, function (val) {
        if (val.value == 'odds') harmonics = [1, 3, 5, 7, 9];
        else if (val.value == 'evens') harmonics = [2, 4, 6, 8, 10];
        else if (val.value == 'half tones') harmonics = [0.5, 1, 2.5, 3.5, 5];
        else if (val.value == 'experimental') harmonics = [0.5, 1, 3.5, 7.33, 9.25];
        psynth.setParams({
            harmonics: harmonics
            , osctype: oscT
        });
    });
    // sliders pour l'enveloppe
    settings.addRange("attack time", 0.05, 5, noteAttack, 0.1, function (val) {
        noteAttack = val
        psynth.setAdsr(noteAttack, noteDecay, noteSustain, noteRelease)
    })
    settings.addRange("decay time", 0.05, 5, noteDecay, 0.1, function (val) {
        noteDecay = val
        psynth.setAdsr(noteAttack, noteDecay, noteSustain, noteRelease)
    })
    settings.addRange("sustain percent (of attack level)", 0.05, 2, noteSustain, 0.1, function (val) {
        noteSustain = val
        psynth.setAdsr(noteAttack, noteDecay, noteSustain, noteRelease)
    })
    settings.addRange("release time", 0.05, 5, noteRelease, 0.1, function (val) {
        noteRelease = val
        psynth.setAdsr(noteAttack, noteDecay, noteSustain, noteRelease)
    })
    // sliders pour le délais
    settings.addRange("delaytime", 250, 9000, 2500, 1, function (val) {
        var newdel = val
        psynth.setParams({
            delaytime: newdel
        })
    })
    settings.addRange("feedback", 0, 1, 0.99, 0.01, function (val) {
        var newfeedback = val
        psynth.setParams({
            feedback: newfeedback
        })
    })
}

function draw() {
    background(0);
    fill(255);
    // on dessine chaque voix de notre synthétiseur polyphonique
    for (var i = 0; i < psynth.num_voices; i++) {
        psynth.voices[i].draw();
    }
}

// On définit l'interaction, lorsque l'on clique on joue une note
function mousePressed() {
    if (mouseX < width && mouseX > 0 && mouseY > 0 && mouseY < height) {
        psynth.voices[psynth.poly_counter].setDrawingParams(mouseX, mouseY); // passer les valeurs nécessaire à la partie graphique
        var note = int(map(mouseY, height, 0, 36, 72)); // en fonction de la hauteur on joue une note plus ou moins aigue
        psynth.play(note); // jouer la note
    }
}
/*
Implémentation spécifique d'une voix de synthétiseur audio visuel
Cette voix est ensuite utilisée dans un contexte polyphonique
*/
function AdditiveSynth() {
    // on référence notre classe à notre classe générique MonoSynth
    MonoSynth.call(this);
    // on stocke le type d'oscillateur, un table d'harmonies et une note à jouer
    this.osctype = oscT;
    this.harmonics = harmonics;
    this.note = 60;
    // Début du code audio
    // synthetiseur basé sur un tableau (ou  banque) d'oscillateurs
    this.oscbank = [];
    // qui sera connecté à un effet de type delai provenant de la bibliothèque Tuna.js
    this.ctx = getAudioContext()
    var tuna = new Tuna(this.ctx);
    this.delay = new tuna.Delay({
        feedback: 1, //0 to 1+
        delayTime: 2500, //1 to 10000 milliseconds
        wetLevel: 0.80, //0 to 1+
        dryLevel: 0.80, //0 to 1+
        cutoff: 2500, //cutoff frequency of the built in lowpass-filter. 20 to 22050
        bypass: 0
    });
    this.delay.disconnect()
        // on ajoute des oscillateurs à notre tableau ou banque d'oscillatuer
    for (var i = 0; i < this.harmonics.length; i++) {
        this.oscbank.push(new p5.Oscillator(midiToFreq(this.note), this.osctype));
    }
    // on traite ces oscillateurs pour les connecter aux bons objets
    for (var i = 0; i < this.harmonics.length; i++) {
        this.oscbank[i].disconnect(); // on déconnecte de la sortie principale
        this.oscbank[i].start(); // on démarre l'oscillateur
        this.oscbank[i].connect(this.synthOut) // on connecte chaque oscillateur au noeud de gain qui appartient à MonoSynth
        this.env.setInput(this.oscbank[i]) // on connecte chaque oscillateur pour que notre envelopppe (appartenant à MonoSynth) les controllent
    }
    this.synthOut.connect(this.delay); // on connecte la sortie de notre voix au délais
    this.delay.connect(p5.soundOut) // on connecte le délai à la sortie audio générale
    /*Il faut maintenant coder les fonctions spécifiques de MonoSynth en lien avec notre moteur audio*/
    // accorder les oscillateurs en fonction de la note qu'on veut jouer et de la table d'harmonique
    this.setNote = function (note) {
            this.note = note
            for (var i = 0; i < this.harmonics.length; i++) {
                this.oscbank[i].freq(midiToFreq(note + this.harmonics[i] * 12));
            }
        }
    // implémentation spécifique des paramètres que l'on souhaite exposer à l'utilisateur
    this.setParams = function (params) {
            // la sélection de la table d'harmonie
            if (params.harmonics != null) this.harmonics = params.harmonics;
            // la sélection du type d'oscillateur
            if (params.osctype != null) {
                this.osctype = params.osctype;
                for (var i = 0; i < this.harmonics.length; i++) {
                    this.oscbank[i].setType(params.osctype);
                }
            }
            // la modification du temps du délais
            if (params.delaytime != null) {
                this.delay.delayTime = params.delaytime
            }
            // la modification du feedback du délais
            if (params.feedback != null) {
                this.delay.feedback = params.feedback
            }
        }
    /* La partie audio étant finie on peut passer à la partie graphique du synthétiseur
    on va suivre l'amplitude en sortie du délais pour dessiner des cercles à l'endroit
    ou l'utilisateur clique qui dépendent du volume du son généré*/
    this.amplitude = new p5.Amplitude();
    this.amplitude.setInput(this.delay);
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    // récupérer les coordonnées des clicks
    this.setDrawingParams = function (x, y) {
        this.x = x;
        this.y = y;
        // ajuster la position stéréo du son en fonction de l'endroit où a cliqué l'utilisateur
        for (var i = 0; i < this.harmonics.length; i++) {
            this.oscbank[i].pan(map(this.x, 0, width, -1, 1), 0)
        }
    }
    // dessiner des formes
    this.draw = function () {
        // calculer le rayon en fonction de l'amplitude du son
        this.radius = this.amplitude.getLevel() * 15000;
        // définir une couleur en fonction de la hauteur de la note jouée
        colorMode(HSB, 360, 100, 100)
        fill(map(this.note, 36, 72, 90, 240), 100, 100, 0.25);
        noStroke();
        ellipse(this.x, this.y, this.radius, this.radius);
    }
}
AdditiveSynth.prototype = Object.create(MonoSynth.prototype); // lier notre classe à l'implementation de MonoSynth
AdditiveSynth.prototype.constructor = AdditiveSynth; // rendre possible l'appel du constructeur "new AdditiveSynth()"
/*
Les deux classes ci-dessous utilisent le polymorphisme en js : la classe AdditiveSynth étend la classe MonoSynth et donc il est possible d'avoir accès à toutes les variables et fonctions de la classe MonoSynth. L'avantage est que l'on peut automatiquement utiliser notre implementation d'une seule voix pour la dupliquer le nombre de fois que l'on souhaite dans un contexte polyphonique avec la classe PolySynth.
*/
/*
A super MonoSynth class to talk to the PolySynth class. It has only an enveloppe and a gain node, and specific functions to play and set the enveloppe
All the synthesis has to be written in a class that extends MonoSynth. For instance if you were to have created a AdditiveSynth class it would look like this :
    AdditiveSynth.prototype = Object.create(MonoSynth.prototype); // we attach our new synth to the MonoSynth implementation
    AdditiveSynth.prototype.constructor = AdditiveSynth; // we make it possible to call "new AdditiveSynth()"
*/
function MonoSynth() {
    this.osctype = 'sine';
    this.note = 60;
    // an enveloppe with its parameters
    this.env = new p5.Env(); // an enveloppe
    this.attack = noteAttack;
    this.decay = noteDecay;
    this.sustain = noteSustain;
    this.release = noteRelease;
    this.setAdsr(this.attack, this.decay, this.sustain, this.release)
        // a gain node output of all voices, every specific implementation should connect to it
    this.synthOut = new p5.Gain();
}
MonoSynth.prototype.setAdsr = function (a, d, s, r) {
    this.attack = a;
    this.decay = d;
    this.sustain = s;
    this.release = r;
    this.env.setADSR(this.attack, this.decay, this.sustain, this.release)
    this.env.setRange(0.05, 0)
}
MonoSynth.prototype.voicePlay = function () {
    this.env.play();
}
MonoSynth.prototype.setNote = function () {} // this one has to be written in the specific implementation of your monovoice
MonoSynth.prototype.setParams = function (params) {} // this one too !
    /*
    A class to deal with voices allocations, of notes, parameters etc.
    In a polyphonic context, it needs a number of voices and a MonoSynth implementation, it passes parameters and adsr values to all the voices
    */
function PolySynth(num, synthVoice) {
    this.voices = [];
    this.num_voices = num;
    this.poly_counter = 0;
    this.allocateVoices(synthVoice);
}
PolySynth.prototype.allocateVoices = function (synthVoice) {
    for (var i = 0; i < this.num_voices; i++) {
        this.voices.push(new synthVoice());
    }
}
PolySynth.prototype.play = function (note) {
    this.voices[this.poly_counter].setNote(note);
    this.voices[this.poly_counter].voicePlay();
    this.poly_counter += 1;
    this.poly_counter = this.poly_counter % this.num_voices;
}
PolySynth.prototype.setAdsr = function (a, d, s, r) {
    for (var i = 0; i < this.voices.length; i++) {
        this.voices[i].setAdsr(a, d, s, r);
    }
}
PolySynth.prototype.setParams = function (params) {
    for (var i = 0; i < this.voices.length; i++) {
        this.voices[i].setParams(params);
    }
}
