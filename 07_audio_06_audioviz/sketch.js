// inspiré par https://codepen.io/MAKIO135/pen/JoPOep/
// en cours
//waveform vs spectre
var pg, buffer
var source_file;
var fft
var offset = 0

function preload() {
    source_file = loadSound('../assets/Soni_Ventorum_Wind_Quintet_-_08_-_Danzi_Wind_Quintet_Op_67_No_3_In_E-Flat_Major_4_Allegretto.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    source_file.play();
    source_file.loop();
    fft = new p5.FFT(0.8, 128);
    pg = createGraphics(width, height);
    pg.background(0);
    buffer = createGraphics(width, height * 8);
    buffer.colorMode(HSB,360,100,100)
    buffer.background(0)

}

function draw() {
    if (frameCount % 6 == 0) {
        var spectrum = fft.analyze();
        var wave = fft.waveform();

        var spectralCentroid = fft.getCentroid();
        var spectralEnergy = fft.getEnergy("mid")
        console.log(spectralEnergy)
        var centroidbri = map(log(spectralCentroid), log(20), log(20000), 0, 100  );
        var centroidhue = map(spectralEnergy, 0, 255, 120, 220  );


        buffer.smooth();
        buffer.stroke(centroidhue, 0, 100,0.75);
        buffer.fill(centroidhue, 100, centroidbri,0.25)
        buffer.beginShape();
        for (var i = 0; i < wave.length; i++) {
            var x = map(i, 0, wave.length, 0, width);
            var y = offset + map(wave[i], 1, -1, windowHeight/2, 0);
            buffer.curveVertex(x, y);
        }

        buffer.endShape();

        pg.noStroke()
        pg.image(buffer, 0, windowHeight * 3 / 4 - offset);
        offset += 9
   }
   image(pg, 0, 0)
}
