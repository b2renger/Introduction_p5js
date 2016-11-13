
function setup() {
  createCanvas(windowWidth, windowHeight); 
  background(0);  
  colorMode(HSB,360,100,100,100) // appliquer le mode HSB

  // Créer des éléments html5 - ces élements peuvent être customisés par css (voir le fichier ci-joint)
  s_hue = createSlider(0, 360, 50);
  s_hue.position(5, windowHeight - 30)
  l_hue = createP('hue :')
  l_hue.position(5, windowHeight - 75)

  s_sat = createSlider(0, 100, 85);
  s_sat.position(125, windowHeight - 30)
  l_sat = createP('saturation :')
  l_sat.position(125, windowHeight - 75)

  s_bri = createSlider(0, 100, 95);
  s_bri.position(245, windowHeight - 30)
  l_bri = createP('brightness :')
  l_bri.position(245, windowHeight - 75)
  
  s_opacity = createSlider(2, 100, 100);
  s_opacity.position(365, windowHeight - 30)
  l_opacity = createP('opacity :')
  l_opacity.position(365, windowHeight - 75)

  s_brush_size = createSlider(5, 60, 40);
  s_brush_size.position(485, windowHeight - 30)
  l_brush = createP('size :')
  l_brush.position(485, windowHeight - 75)

 }

function draw() {

  var size = (abs(pmouseX-mouseX)+abs(pmouseY-mouseY)) + s_brush_size.value() 
  if (mouseIsPressed) { // si la souris est clickée on dessine avec la fonction de dessin définie ci-dessous
    sp(mouseX,mouseY,size)
  }
  // dessiner les paramètres sélectionnés
  push()
  fill(0,100)
  rect(0, windowHeight-80 ,710,80)
  stroke(255)
  fill(s_hue.value(),s_sat.value(),s_bri.value(),s_opacity.value()+25)
  ellipse(640 , windowHeight-30 ,s_brush_size.value()+5, s_brush_size.value()+5)
  pop()
    
}


// fonction permettant de dessiner un ensemble de taches de couleurs dans un rayon défini
// ce rayon dépendera de la vitesse de la souris
function sp(x,y,size){
  push()
  noStroke()
  fill(s_hue.value(),s_sat.value(),s_bri.value(),s_opacity.value()) // on applique la teinte et on garde une transparence importante
  translate(x,y)
  for (var i = 0 ; i < size*2 ; i = i+1){
    // coordonées polaire = rayon + angle
    var radius = random(size) 
    var angle = random(TWO_PI)
    // formule de passage de coordonées polaires en coordonnées catésienne
    var xpos = radius*cos(angle)
    var ypos = radius*sin(angle)
    // on dessine une ellipse dont la taille dépend de son éloignement
    ellipse(xpos, ypos, map(radius,0,size,size/6,0), map(radius,0,size,size/6,0))
  }
  pop()
}
