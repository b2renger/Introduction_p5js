
var capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth/3, windowHeight/3);
  capture.hide();
}

function draw() {
  background(255);
  
  image(capture, 0, windowHeight/2, windowWidth*1/2, windowHeight/2);
  filter('THRESHOLD',mouseX/windowWidth);
 
  image(capture, windowWidth*1/2, 0, windowWidth*1/2, windowHeight/2);
  filter('INVERT');
  
  image(capture, windowWidth*1/2, windowHeight*1/2, windowWidth*1/2, windowHeight/2);
  filter('POSTERIZE', 2+mouseX*3/windowWidth);
  
  image(capture, 0, 0, windowWidth*1/2, windowHeight/2);
}