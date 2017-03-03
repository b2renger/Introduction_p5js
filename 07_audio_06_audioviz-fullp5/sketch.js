// inspiré par https://codepen.io/MAKIO135/pen/JoPOep/

var source_file; // fichier audio
var fft // variable pour l'analyse audio

var canvas // notre canvas
var ctx // un context de dessin

var buffer,img;

// on précharge le fichier audio
function preload() {
    source_file = loadSound('../assets/Soni_Ventorum_Wind_Quintet_-_08_-_Danzi_Wind_Quintet_Op_67_No_3_In_E-Flat_Major_4_Allegretto.mp3');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    //ctx = canvas.elt.getContext('2d'); // on récupère le contexte de dessin de notre canvas

    img = createGraphics(windowWidth,windowHeight);
    buffer = createGraphics(windowWidth/2,windowHeight/2);
    buffer.background(0);
    img.background(0);
    // yoffset = -10
    // on joue l'audio
    source_file.play();
    source_file.loop();
    // on analyse l'audio : smoothing , taille du buffer
    fft = new p5.FFT(0.95, 256);


}

function draw() {
    noStroke()
    image(img,0,0,windowWidth,windowHeight)

    // on ne fait ces opérations que toutes les 2 images
    if (frameCount % 2 == 0) {
         // on va gérer l'offset avec la souris, cela correspond à la vitesse d'accumulation et l'espacement entre les différentes strates
        var yoffset = map(mouseY,0,windowHeight,-5,-15)
        // on dessine notre image en fond de notre buffer (c'est le premier dessin qu'on effectue les suivants seront donc par dessus)
        buffer.noStroke()
        buffer.image(img,0,yoffset,buffer.width,buffer.height);

        buffer.filter(BLUR,0.48); // le blur est un peu gourmand à haute résolution
        // on le remplace par le "blur du pauvre" : un rectangle noir très transparent

        buffer.fill(0, map(yoffset,-5,-15,5,10))
        buffer.rect(0, 0, buffer.width, buffer.height)
        // on analyse notre audio pour obtenir une forme d'onde
        var wave = fft.waveform();
        // on va commencer à dessiner
         buffer.smooth();
         buffer.fill(0)
        // une première passe sur la waveforme pour dessiner la 'brume', ce sont des lignes horizontales
        // blanches fines et transparentes
         buffer.strokeWeight(0.15)
         buffer.stroke(255,50);
        for (var i = 0; i < wave.length; i++) {
            var y = map(abs(wave[i]), 1, 0, buffer.height/2, windowHeight/2);
            buffer.line(0, y + random(-150,150),buffer.width+100,y + random(-150,150));
        }
        // la seconde passe va dessiner une forme complexe remplie en noir avec un contour blanc : les montages
         buffer.strokeWeight(0.5)
         buffer.stroke(255);
         buffer.curveTightness(0.5)
         buffer.beginShape(); // on commence à dessiner notre forme
         buffer.curveVertex(0, buffer.height) // on ajoute un premier point dans le coin en bas à gauche
        // puis on ajoute tous les points de notre forme d'onde
        for (var i = 0; i < wave.length; i++) {
            var x = map(i, 0, wave.length, 0, buffer.width);
            var y = map(abs(wave[i]), 1, 0, 0, buffer.height);
             buffer.curveVertex(x, y);
        }
         buffer.curveVertex(buffer.width, buffer.height) // on ajoute un dernier point en bas à droite
         buffer.endShape(CLOSE); // on ferme notre forme
        // on peut maintenant sauvegarder notre dessin réalisé dans le buffer dans l'image que l'on va afficher en plein écran
        img = buffer
    }
}

function windowResize(){

 img.width = windowWidth;
 img.height = windowHeight;
}
