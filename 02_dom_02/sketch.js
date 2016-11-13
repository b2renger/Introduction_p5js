

  function setup() {
    createCanvas(windowWidth, windowHeight); 
    background(0,0,0);  
    colorMode(HSB,360,100,100,100) 
    
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

    s_brush_size = createSlider(1, 40, 15);
    s_brush_size.position(485, windowHeight - 30)
    l_brush = createP('size :')
    l_brush.position(485  , windowHeight - 75)

    s_branch_number = createInput(12);
    s_branch_number.position(655, windowHeight - 30)
    l_branch_number = createP('branch quantity  (1 - 100) :')
    l_branch_number.position(655, windowHeight - 75)
  } 

  function draw() {
    
    if(mouseIsPressed && !(mouseY>windowHeight-80 && mouseX< 860 )){
      noStroke()
      fill(s_hue.value(),s_sat.value(),s_bri.value(),s_opacity.value())  
      // calculer les coordonées polaire en fonction des positions centrées de la souris  
      var radius = pow(pow(windowWidth/2-mouseX,2) + pow(windowHeight/2-mouseY,2) , 0.5) // pythagore 
      var angle = atan2(windowHeight/2-mouseY, windowWidth/2-mouseX) // atan2(y,x)
  
        for (var i = 0 ; i <= TWO_PI ; i = i +PI/(s_branch_number.value()/2)){ // on réalise une boucle for pour couvrir un cercle complet
            var x =windowWidth/2 + radius * cos(angle +i) // on ajoute i à l'angle à chaque iteration de la boucle
            var y =windowHeight/2 + radius * sin(angle+i)
            ellipse(x,y,s_brush_size.value(),s_brush_size.value())
          }
      }

    // dessiner les paramètres sélectionnés
    push()
    fill(0,100)
    rect(0, windowHeight-80 ,860,80)
    stroke(255)
    fill(s_hue.value(),s_sat.value(),s_bri.value(),s_opacity.value()+25)
    ellipse(620 , windowHeight-30 ,s_brush_size.value()+5, s_brush_size.value()+5)
    pop()
    
  }