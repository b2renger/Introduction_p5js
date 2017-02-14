var gui // une variable pour quicksettings
var initSound = "acoustic_grand_piano" // une valeur pour l'initialisation du premier argument
var lead // une variable pour stocker notre synthétiseur de soundfont
// deux objets d'analyse audio pour représenter le son.
var amplitude
var fft
// un tableau permettant de mapper des touches du clavier à des notes midi
var keys = {
    S: 60
    , E: 61
    , D: 62
    , R: 63
    , F: 64
    , G: 65
    , Y: 66
    , H: 67
    , U: 68
    , J: 69
    , I: 70
    , K: 71
    , L: 72
}
// on précharge un son
function preload() {
    ctx = getAudioContext(); // on récupère le contexte audio pour le passer à notre instrument
    lead = Soundfont.instrument(ctx, initSound); // on intialise notre synthétiseur avec le contexte et le nom du son à charger
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0)
    // on initialise les objets d'analyse
    amplitude = new p5.Amplitude();
    fft = new p5.FFT();
    // on les connecte à notre instrument
    lead.then(function (inst) {
        inst.connect(amplitude)
        inst.connect(fft);
    });
    // on créer un panneau de gui avec une sélection d'instruments
    gui = QuickSettings.create(255, 5, "GUI");
    gui.addDropDown("instrument", instrumentTable, setSound); // instrumentTable est définie tout en bas.
    colorMode(HSB, 360, 100, 100)
}

// function de callback pour charger les nouveaux sons après choix de l'utilisateur
function setSound() {
    initSound = gui.getValuesAsJSON(false)["instrument"] // récuperer la valeur de l'objet gui
    // recréer l'instrument lead
    ctx = getAudioContext();
    lead = Soundfont.instrument(ctx, initSound);
    // reconnecter les objets d'analyse audio
    lead.then(function (inst) {
        inst.connect(amplitude)
        inst.connect(fft);
    });
}

function draw() {
    noStroke();
    fill(0, 0, 0, 0.15)
    rect(0, 0, windowWidth, windowHeight)
    fill(0, 0, 100, 0.25)
    // on dessine un cercle dont le rayon dépend du volume.
    ellipse(windowWidth / 2, windowHeight / 2, amplitude.getLevel() * 5000, amplitude.getLevel() * 5000)
    // on dessine le spectre ie l'énergie par bande de fréquence
    var spectrum = fft.analyze();
    for (i = 0; i < spectrum.length; i++) {
        fill(map(i, 0, spectrum.length, 0, 180), 100, map(spectrum[i], 0, 255, 0, 100))
        rect(map(i, 0, spectrum.length, 0, windowWidth), height, windowWidth / spectrum.length, map(spectrum[i], 0, 255, 0, -height));
    }
}
// les notes sons jouées ici
function keyPressed() {
    // si la touche préssée est dans notre tableau
    if (keys[key]) {
        note = keys[key] // on récupère la valeur midi
        play(note) // on appelle une fonction spécifique
    }
}
// on joue la note
function play(midinote) {
    lead.then(function (inst) {
        inst.play(midinote + 24, 0, {
            loop: false
        });
    });
}
// ensemble des instruments disponnibles dans la bibliothèque soundfont
var instrumentTable = [
    "accordion"
    , "acoustic_bass"
    , "acoustic_grand_piano"
    , "acoustic_guitar_nylon"
    , "acoustic_guitar_steel"
    , "agogo"
    , "alto_sax"
    , "applause"
    , //"bagpipe", // doesn't work
    "banjo"
    , "baritone_sax"
    , "bassoon"
    , "bird_tweet"
    , "blown_bottle"
    , "brass_section"
    , "breath_noise"
    , "bright_acoustic_piano"
    , "celesta"
    , "cello"
    , "choir_aahs"
    , "church_organ"
    , "clarinet"
    , //"clavinet", // doesn't work
    "contrabass"
    , "distortion_guitar"
    , "drawbar_organ"
    , "dulcimer"
    , "electric_bass_finger"
    , "electric_bass_pick"
   	, "electric_grand_piano"
    , "electric_guitar_clean"
    , "electric_guitar_jazz"
    , "electric_guitar_muted"
    , "electric_piano_1"
    , "electric_piano_2"
    , "english_horn"
    , "fiddle"
    , "flute"
    , "french_horn"
    , "fretless_bass"
    , "fx_1_rain"
    , "fx_2_soundtrack"
    , "fx_3_crystal"
    , "fx_4_atmosphere"
    , "fx_5_brightness"
    , "fx_6_goblins"
    , "fx_7_echoes"
    , "fx_8_scifi"
    , "glockenspiel"
    , "guitar_fret_noise"
    , "guitar_harmonics"
    , "gunshot"
    , "harmonica"
    , "harpsichord"
    , "helicopter"
    , "honkytonk_piano"
    , "kalimba"
    , "koto"
    , "lead_1_square"
    , "lead_2_sawtooth"
    , "lead_3_calliope"
    , "lead_4_chiff"
    , "lead_5_charang"
    , "lead_6_voice"
    , "lead_7_fifths"
    , //"lead_8_bass__lead", // doesn't work
    "marimba"
    , "melodic_tom"
    , "music_box"
    , "muted_trumpet"
    , "oboe"
    , "ocarina"
    , "orchestra_hit"
    , "orchestral_harp"
    , "overdriven_guitar"
    , "pad_1_new_age"
    , "pad_2_warm"
    , "pad_3_polysynth"
    , "pad_4_choir"
    , "pad_5_bowed"
    , "pad_6_metallic"
    , "pad_7_halo"
    , "pad_8_sweep"
    , "pan_flute"
    , "percussive_organ"
    , "piccolo"
    , "pizzicato_strings"
    , "recorder"
    , "reed_organ"
    , //"reverse_cymbal",
    "rock_organ"
    , //"seashore",
    "shakuhachi"
    , "shamisen"
    , "shanai"
    , "sitar"
    , "slap_bass_1"
    , "slap_bass_2"
    , "soprano_sax"
    , "steel_drums"
    , "string_ensemble_1"
    , "string_ensemble_2"
    , "synth_bass_1"
    , "synth_bass_2"
    , //"synth_brass_1", // doesn't work
    //"synth_brass_2", // doesn't work
    //"synth_choir", // doesn't work
    //"synth_drum",
    //"synth_strings_1", // doesn't work
    //"synth_strings_2", // doesn't work
    //"taiko_drum",
    "tango_accordion"
    , "telephone_ring"
    , "tenor_sax"
    , "timpani"
    , "tinkle_bell"
    , "tremolo_strings"
    , "trombone"
    , "trumpet"
    , "tuba"
    , "tubular_bells"
    , "vibraphone"
    , "viola"
    , "violin"
    , "voice_oohs"
    , "whistle"
    , "woodblock"
    , "xylophone"
];
