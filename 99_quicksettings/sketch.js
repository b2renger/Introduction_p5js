var settings // une variable pour stocker le panneau de controle
var flicker = false // une valeur à modifier
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0)
        // On initialise notre variable, on passe en argument la position du widget dans le canvas
        // et le nom du groupe d'éléments gui que l'on veut créer.
    settings = QuickSettings.create(5, 5, "GUI");
    // On ajoute un élément à ce widget qui est une boîte à cocher, on passe en argument, le nom
    // de l'élément, sa valeur initiale, et le nom de la fonction de rappel, qu'il faut définir
    settings.addBoolean("Check Me", flicker, eltChecked);
}
// définition de la fonction de rappel
function eltChecked(val) { // val correspond à la valeur de l'élément
    flicker = val; // on change notre variable "flicker" pour la remplacer par la valeur de notre gui
    console.log(val)
}

function draw() {
    // on utilise notre variable
    if (!flicker) {
        background(0)
    }
    else {
        background(random(255))
    }
}
