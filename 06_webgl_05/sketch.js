

var flock

var simulationParameters
var cameraControls

var cam_x_rot, cam_y_rot,cam_z_pos
var flock_sep, flock_ali, flock_coh

function setup() {
    createCanvas(windowWidth, windowHeight,WEBGL);

    resetCam()
    resetFlock()

    cameraControls = QuickSettings.create(5, 5, "Camera Controls");
    cameraControls.addRange("camera x rotation", -TWO_PI, TWO_PI, 0, 0.1, camXChange);
    cameraControls.addRange("camera y rotation", -PI, PI, -PI/2, 0.1, camYChange);
    cameraControls.addRange("camera z position", -1500, 1500, -500, 1, camZChange);
    cameraControls.addButton("camera reset", resetCam);

    simulationParameters = QuickSettings.create(255, 5, "Simulation Parameters");
    simulationParameters.addRange("separation" ,0,10, 1.5, 0.1, sepChange);
    simulationParameters.addRange("alignement" ,0,10, 1.0, 0.1, aliChange);
    simulationParameters.addRange("cohesion" ,0,10, 1.0,0.1, cohChange);
    simulationParameters.addButton("add boid", function (){flock.addBoid(new Boid(random(windowWidth),random(windowHeight)))});
    simulationParameters.addButton("remove boid", function (){flock.removeBoid();});
    simulationParameters.addButton("reset flock", resetFlock );

}

function resetCam(){
    cam_x_rot =0
    cam_y_rot =0
    cam_z_pos =0
}

function resetFlock(){
    flock_sep = 1.5
    flock_ali = 1.0
    flock_coh = 1.0
    flock = new Flock();
    for (var i = 0; i < 150; i++) {
        var b = new Boid(1,1,-400);
        flock.addBoid(b);
    }
}

function sepChange(val){
    flock_sep = val
}

function aliChange(val){
    flock_ali = val
}

function cohChange(val){
    flock_coh = val
}

function camXChange(val){
    cam_x_rot = val
}

function camYChange(val){
    cam_y_rot = val
}

function camZChange(val){
    cam_z_pos = val
}

function draw() {
    background(0);

    //ambientLight(255, 255, 255);


    //directionalLight(180, 180, 255, -1, -1, -1);
    //directionalLight(180, 180, 255, -1, -1,  1);
    directionalLight(180, 180, 255, -1, 1 , -1);
    //directionalLight(180, 180, 255, -1, 1 , 1 );
    directionalLight(180, 180, 255,  1, 1 , 1 );
    //directionalLight(180, 180, 255,  1, 1 , -1);
    //directionalLight(180, 180, 255,  1, -1, -1);
    //directionalLight(180, 180, 255,  1, -1,  1);


    translate(0,0,cam_z_pos);

    rotateY(cam_x_rot);
    rotateX(cam_y_rot);


    push();
    translate(-width/2,-height/2,0);
    box(5,5,5);
    translate(0,0,-800);
    box(5,5,5);
    translate(width,0,0);
    box(5,5,5);
    translate(0,0,800);
    box(5,5,5);
    pop();

    push();
    translate(-width/2,0,0);
    box(5,5,5);
    translate(0,0,-800);
    box(5,5,5);
    translate(width,0,0);
    box(5,5,5);
    translate(0,0,800);
    box(5,5,5);
    pop();

    push();
    translate(-width/2,height/2,0);
    box(5,5,5);
    translate(0,0,-800);
    box(5,5,5);
    translate(width,0,0);
    box(5,5,5);
    translate(0,0,800);
    box(5,5,5);
    pop();

    push();
    //specularMaterial(250)
    flock.run();
    pop();
}



