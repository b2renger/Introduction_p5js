// inspiré par https://codepen.io/MAKIO135/pen/JoPOep/

var source_file; // fichier audio
var fft // variable pour l'analyse audio
var img // variable pour stocker une image qui sera l'image crée par notre programme et la dessiner avec un léger offset pour accumuler les dessins.
var canvas // notre canvas
var ctx // un context de dessin

// on précharge le fichier audio
function preload() {
    source_file = loadSound('../assets/Soni_Ventorum_Wind_Quintet_-_08_-_Danzi_Wind_Quintet_Op_67_No_3_In_E-Flat_Major_4_Allegretto.mp3');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    ctx = canvas.elt.getContext('2d'); // on récupère le contexte de dessin de notre canvas
    // on joue l'audio
    source_file.play();
    source_file.loop();
    // on analyse l'audio : smoothing , taille du buffer
    fft = new p5.FFT(0.95, 256);
    background(0);
    // on crée une image non pas avec la fonction createImage() prévue à cet effet dans p5js
    // mais avec du code javscript classique : https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
    img = new Image()
}

function draw() {

    // on ne fait ces opérations que toutes les 6 images
    if (frameCount % 6 == 0) {
         // on va gérer l'offset avec la souris, cela correspond à la vitesse d'accumulation et l'espacement entre les différentes strates
        var yoffset = map(mouseY,0,windowHeight,-10,-30)
        // on dessine notre image html à l'aide des méthodes classiques js et non celles de p5js
        ctx.drawImage(img, 0, yoffset);
        // filter(BLUR,0.85); // le blur est un peu gourmand à haute résolution
        // on le remplace par le "blur du pauvre" : un rectangle noir très transparent
        noStroke()
        fill(0, 7)
        rect(0, 0, windowWidth, windowHeight)
        // on analyse notre audio pour obtenir une forme d'onde
        var wave = fft.waveform();
        // on va commencer à dessiner
        smooth();
        fill(0)
        // une première passe sur la waveforme pour dessiner la 'brume', ce sont des lignes horizontales
        // blanches fines et transparentes
        strokeWeight(0.25)
        stroke(255,70);
        for (var i = 0; i < wave.length; i++) {
            var y = map(abs(wave[i]), 1, 0, windowHeight * 2 / 4, windowHeight);
            line(0, y + random(-150,150),width+100,y + random(-150,150));
        }
        // la seconde passe va dessiner une forme complexe remplie en noir avec un contour blanc : les montages
        strokeWeight(1)
        stroke(255);
        curveTightness(0)
        beginShape(); // on commence à dessiner notre forme
        curveVertex(0, windowHeight) // on ajoute un premier point dans le coin en bas à gauche
        // puis on ajoute tous les points de notre forme d'onde
        for (var i = 0; i < wave.length; i++) {
            var x = map(i, 0, wave.length, 0, width);
            var y = map(abs(wave[i]), 1, 0, 0, windowHeight);
            curveVertex(x, y);
        }
        curveVertex(windowWidth, windowHeight) // on ajoute un dernier point en bas à droite
        endShape(CLOSE); // on ferme notre forme
        // on peut maintenant sauvegarder notre dessin et le passer à notre objet image
        // on utilise la fonction 'saveFrames',  avec une fonction de callback anonyme et
        // en faisant en sorte de n'obtenir qu'une image - saveFrames est fait pour sauvegarder des séquences
        saveFrames("out", "png", 2 / 25, 25, function (data) {
            img.src = data[0].imageData
        });
    }
}
