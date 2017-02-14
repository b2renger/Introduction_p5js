/* déplacer la souris en cliquant pour générer du son, appuyer sur les touches du haut et du bas pour augmenter la taille des grains*/

var source_file; // fichier audio
var src_length; // on va stocker la durer du fichier audio en question
var pg; // un objet graphique qui permet de dessiner des choses offscreen
var voices = []; // un tableau pour stocker nos voix
var num_voices = 25; // le nombre de voix souhaité
var poly_counter = 0; // l'index de la voix à jouer à la prochaine interaction
var grainDur = 1; // length of the grain
// on précharge le fichier audio et on créer des vois de polyphonie
function preload() {
    source_file = loadSound('../assets/Soni_Ventorum_Wind_Quintet_-_08_-_Danzi_Wind_Quintet_Op_67_No_3_In_E-Flat_Major_4_Allegretto.mp3');
    for (var i = 0; i < num_voices; i++) {
        var voice = new GranularVoice(grainDur);
        voices.push(voice);
    }
}

function setup() {
    // on limite le framerate dans le but d'avoir une quantité réduite de messages provenant de la souris
    // si l'utilisateur laisse appuyé ne serait-ce qu'une seconde au framerate habituel cela enverrait 60 messages
    // ce qui occuperait immédiatement toutes nos voix de polyphonie
    frameRate(10)
    createCanvas(windowWidth, windowHeight);
    src_length = source_file.duration();
    var peaks = source_file.getPeaks(); // obtenir un tableau représentant l'énergie du son
    // dessiner la forme d'onde dans un objet séparé l'objet pg, cela nous permmettra une fois le dessin généré
    // de l'afficher comme une image : image(pg,0,0)
    pg = createGraphics(width, height);
    pg.background(180);
    pg.translate(0, height / 2);
    pg.noFill();
    pg.stroke(0);
    for (var i = 0; i < peaks.length; i++) {
        var x = map(i, 0, peaks.length, 0, width);
        var y = map(peaks[i], 0, 1, 0, height);
        pg.line(x, 0, x, y);
        pg.line(x, 0, x, -y);
    }
}

function draw() {
    background(180);
    if (mouseIsPressed) {
        var start_play = map(mouseX, 0, width, 0, src_length); // on calcule la position de début de lecture en fonction de la position de la souris
        var pitch = map(mouseY, 0, height, 0.5, 1.5); // on calcul la déformation en fréquence en fonction de la position en ordonnées de la souris.
        poly_counter += 1; // on incrémente l'index de la voix à jouer
        poly_counter = poly_counter % num_voices; // on s'assure de rester sur une valeur inférieure au nombre max de voix souhaité
        voices[poly_counter].playGrain(start_play, pitch); // on joue la portion de son à la vitesse choisie
    }
    image(pg, 0, 0); // afficher notre forme d'onde
    // retour visuel sur la position de lecture.
    fill(255, 255, 180, 150);
    noStroke();
    rect(mouseX, 0, map(grainDur, 0, src_length, 0, width), height);
    fill(0);
    text('Grain Duration : ' + grainDur, 5, 25);
}

// on augmente ou diminue la taille du grain à jouer.
function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        grainDur -= 0.15;
    }
    else if (keyCode === UP_ARROW) {
        grainDur += 0.5;
    }
    grainDur = constrain(grainDur, 0.1, 25);
    var newatt = grainDur * 1 / 5;
    var newrel = grainDur * 1 / 5;
    for (var i = 0; i < voices.length; i++) {
        voices[i].setGrainDuration(grainDur);
    }
}
/*
une classe permettant de jouer un fichier audio de manière granulaire
*/
function GranularVoice(grLength) {
    // on charge le fichier audio à chaque fois dans un buffer séparé
    this.sound = loadSound('../assets/Soni_Ventorum_Wind_Quintet_-_08_-_Danzi_Wind_Quintet_Op_67_No_3_In_E-Flat_Major_4_Allegretto.mp3');
    this.sound.playMode('restart');
    this.attack = 0.05;
    this.release = 0.15;
    this.grainDur = grLength - (this.attack + this.release);
    this.env = new p5.Env();

    this.playGrain = function (start, r) {
        this.sound.rate(r)
        this.sound.jump(start, this.grainDur)
        this.env.set(this.attack, 0.5, this.grainDur, 0, this.releaseTime, 0.0);
        this.env.setInput(this.sound)
        this.env.play()
    }

    this.setGrainDuration = function (newgraindur) {
        if (newgraindur > (this.attack + this.release)) {
            this.grainDur = newgraindur;
        }
        else {
            throw 'new grain duration out of range';
        }
    }
}
