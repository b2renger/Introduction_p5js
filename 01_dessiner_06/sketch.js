

  var s_branch_number = 42

  function setup() {
    createCanvas(windowWidth, windowHeight); 
    background(0,0,0);  
    
  } 

  function draw() {
    
    if(mouseIsPressed){
      noStroke()
      fill(255,50)  
      // calculer les coordonées polaire en fonction des positions centrées de la souris  
      var radius = pow(pow(windowWidth/2-mouseX,2) + pow(windowHeight/2-mouseY,2) , 0.5) // pythagore 
      var angle = atan2(windowHeight/2-mouseY, windowWidth/2-mouseX) // atan2(y,x)
    

        for (var i = 0 ; i <= TWO_PI ; i = i +PI/(s_branch_number/2)){ // on réalise une boucle for pour couvrir un cercle complet
            var x =windowWidth/2 + radius * cos(angle +i) // on ajoute i à l'angle à chaque iteration de la boucle
            var y =windowHeight/2 + radius * sin(angle+i)
            ellipse(x,y,5,5)
          }
      }
    
  }