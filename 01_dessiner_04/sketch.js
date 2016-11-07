var draw_lines = function(x,y,size,rot){

    strokeWeight(0.15)
  // nouveau repère r1
  push() 
  rectMode(CENTER)
  translate(x,y)
  rotate(rot*0.15)
  stroke(75)
  line(0,size,0,-size)
  line(-size,0,size,0)

  // nouveau repère r2 qui bénificie encore des transformation de r1
  push() 
  rotate(rot)
  translate(-size,-size) // notre rectangle va tourner autour du centre de r1 à une distance calculable par pythagore : d = pow(50*50+50*50,0.5)
  rotate(PI/2)
  stroke(50)
  line(0,size,0,-size)
  line(-size,0,size,0)
  pop() // on supprime les transformation de r2

  // et on crée un nouveau repère r3 qui est donc dans l'état de r1
  push() 
  stroke(0)
  rotate(rot)
  translate(size*3,size*3) // notre rectangle va tourner autour du centre de r1 à une distance calculable par pythagore : d = pow(100*100+100*100,0.5)
  rotate(rot*7  ) // et il va tourner sur lui même
   // dessiner le repère
  line(0,size,0,-size)
  line(-size,0,size,0)

  push() // on pousse un nouveau repère r4 qui bénéficie des transformation conjointe de r1 et r3
  translate(size*2,size*2) // notre rectangle va tourner autour du centre de r3 à une distance calculable par pythagore : d = pow(35*35+35*35,0.5)
  rotate(rot*2 ) // et il va tourner sur lui même
   // dessiner le repère
  line(0,size,0,-size)
  line(-size,0,size,0)
  pop() // on supprime les transformation de r4

  pop() // on supprime les transformation de r3

  pop() //on supprime les transformation de r1

  // nous sommes de nouveau dans le repère d'origine
}


function setup() {
  createCanvas(windowWidth, windowHeight)
  background(255)
  
} 

function draw() {


  var size = (abs(pmouseX-mouseX) + abs(pmouseY - mouseY)) + 25
  stroke(0)
  fill(0,180)
  draw_lines(mouseX, mouseY, size , frameCount/50)

}

