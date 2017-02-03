var gui
var initSound = "acoustic_grand_piano"
var lead

function preload() {
    ctx = getAudioContext();
    lead = Soundfont.instrument(ctx, initSound );
}

function setup() {
    createCanvas(windowWidth, windowHeight,WEBGL);


    gui = QuickSettings.create(255, 5, "GUI");
    gui.addDropDown("instrument" , instrumentTable, setSound);

}

function setSound(){
    initSound = gui.getValuesAsJSON(false)["instrument"]
    ctx = getAudioContext();
    lead = Soundfont.instrument(ctx, initSound);
}


function draw() {

    if (keyIsPressed && key == 'a'){
        lead.then(function (inst) {
            inst.play(60, 0, {
                 loop: false
            });
        });
    }

}

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

