

// Keep track of our socket connection
var socket = io.connect('http://localhost:8080');

// variable pour stocker les élements DOM, sliders ...
var s_hue,l_hue, s_sat, l_sat, s_bri, l_bri, s_opacity, l_opacity, s_brush_size, l_brush_size, s_branch_number, l_branch_number

function setup() {
  createCanvas(windowWidth, windowHeight); 

  
  
  background(0);  
  colorMode(HSB,360,100,100,100) // appliquer le mode HSB
  // Créer des éléments html5 - ces élements peuvent être customisés par css (voir le fichier ci-joint)
  s_hue = createSlider(0, 360, 50);
  s_hue.position(5, windowHeight - 30)
  s_hue.size(110,AUTO)
  l_hue = createP('hue ')
  l_hue.style("color","rgb(255,255,255)")
  l_hue.position(5, windowHeight - 75)

  s_sat = createSlider(0, 100, 85);
  s_sat.position(125, windowHeight - 30)
  s_sat.size(110,AUTO)
  l_sat = createP('saturation ')
  l_sat.style("color","rgb(255,255,255)")
  l_sat.position(125, windowHeight - 75)

  s_bri = createSlider(0, 100, 95);
  s_bri.position(245, windowHeight - 30)
  s_bri.size(110,AUTO)
  l_bri = createP('brightness ')
  l_bri.style("color","rgb(255,255,255)")
  l_bri.position(245, windowHeight - 75)
  
  s_opacity = createSlider(2, 100, 100);
  s_opacity.position(365, windowHeight - 30)
  s_opacity.size(110,AUTO)
  l_opacity = createP('opacity ')
  l_opacity.style("color","rgb(255,255,255)")
  l_opacity.position(365, windowHeight - 75)

  s_brush_size = createSlider(5, 60, 40);
  s_brush_size.position(485, windowHeight - 30)
  s_brush_size.size(110,AUTO)
  l_brush = createP('size :')
  l_brush.style("color","rgb(255,255,255)")
  l_brush.position(485, windowHeight - 75)

  s_branch_number = createInput(12);
  s_branch_number.position(675, windowHeight - 30)
  l_branch_number = createP('branch quantity  (1 - 100) :')
  l_branch_number.style("color","rgb(255,255,255)")
  l_branch_number.position(675, windowHeight - 75)   
}

// cette fonction va constuire un objet qui stocke des données utiles pour notre dessin
// elle va retourner (cf la dernière ligne avec le mot clé "return") un objet formatté au 
// format json. On pourra donc appeler notre fonction avec les valeurs de notre souris
// et celles stockées dans nos objets DOM.
function getData(xpos, ypos ,hue,sat,bri,op,brush_size,branch_num){
   var data = {
    x: xpos,
    y: ypos, 
    h: hue,
    s: sat,
    b: bri,
    o: op,
    siz : brush_size,
    branch: branch_num
  };
  return data;
}
// c'est ce que l'on va faire ici : si la souris est déplacée en étant cliquée est n'est pas 
// dans un endroit précis de la fenêtre (où sont dessinés les sliders etc.) alors on va créer
// une variable data qui stocke nos valeurs, on va l'utiliser pour dessiner des formes dans notre
// canvas et envoyer ces données à notre socket.
function mouseDragged() {
 if( !(mouseY>windowHeight-80 && mouseX< 860 )){
    // créer l'objet data avec les paramètres
    var data = getData(mouseX,mouseY,s_hue.value(),s_sat.value(),s_bri.value(),s_opacity.value(),s_brush_size.value(), s_branch_number.value())
    //console.log(data);
    draw_params(data)
    socket.emit('params',data);
  }
}

// fonction permettant de définir ce qu'il se passe quand on reçoit des données via le socket
// on créer une fonction comme deuxième paramètres qui va recevoir des données "data"
socket.on('params',function(data){
      draw_params(data); // on utilise les données reçues pour dessiner
})
// cette fonction regroupe les instructions de dessin
// la variable data est un "container" qui contient toutes les informations qui transitent via websocket
function draw_params(data){
  noStroke()
  fill(data.h,data.s,data.b,data.o)  
  var radius = pow(pow(windowWidth/2-data.x,2) + pow(windowHeight/2-data.y,2) , 0.5) // pythagore 
  var angle = atan2(windowHeight/2-data.y, windowWidth/2-data.x) // atan2(y,x)
  for (var i = 0 ; i <= TWO_PI ; i = i +PI/(data.branch/2)){ 
    var x =windowWidth/2 + radius * cos(angle +i)
    var y =windowHeight/2 + radius * sin(angle+i)
    ellipse(x,y,data.siz,data.siz)
  }
}

 function draw() {
    // dessiner les paramètres sélectionnés
    push()
    fill(0,100)
    rect(0, windowHeight-80 ,860,80)
    stroke(255)
    fill(s_hue.value(),s_sat.value(),s_bri.value(),s_opacity.value()+25)
    ellipse(635 , windowHeight-30 ,s_brush_size.value()+5, s_brush_size.value()+5)
    pop()  
}
