

function setup() {
  createCanvas(800, 800);
}

//1 meter = 10 pixels
let scale = 1;



//dane obiektu
let position = new p5.Vector(0,0);
let acc = new p5.Vector(0,0);
let velocity = new p5.Vector(0,0);
let engineForce = 0;
let breakingForce = 0;
let mass = 1000;
let isPedalDown = false;

let wheelBase = 2;
let rearWheelDist = 1;
let frontWheelDist = 1;
let centerMassHeight = 0.5;

let rearWheelWeight = rearWheelDist/wheelBase*mass;
let frontWheelWeight = frontWheelDist/wheelBase*mass; 

//dane fizyki
let forceTraction = new p5.Vector(0,0);
let forceDrag = new p5.Vector(0,0);
// C drag = 0.4257
let forceResistance = new p5.Vector(0,0);
// C rr = 12.8
let forceBreaking = new p5.Vector(0,0);
let forceDrive = new p5.Vector(0,0);

let forceRearWheels;
let forceLong = new p5.Vector(0,0);
let u = new p5.Vector(1,0);
let dt = 0.0167;

//engine
let engine = new Engine(dt);

function draw() {
  background(50);
  if(keyIsDown(UP_ARROW)) {
    isPedalDown = true;
  } else {
    isPedalDown = false;    
  }
  if (keyIsDown(DOWN_ARROW)) {
      breakingForce = 20000/scale;
  } else {
    breakingForce = 0;
  }

  //engine calculation
  engine.changeRPMDependentPedal(isPedalDown);

  //calculate weight transfer
  calculateWeightTransfer();


  //calculate forces
  calcForceTraction();
  calcForceDrag();
  calcForceResistance();
  calcForceBraking();

  calcDriveForce();

  calcForceLong();


  //calculate object properties
  calcAcc();
  calcVelocity();
  calcPosition();

  

  
  
  textSize(32);
  let speed = Math.floor(velocity.mag() * 3.6);
  text(speed, 10 , 30);
  fill(255);
  rect(position.x, 200,4*scale,2*scale);
  if(position.x > 840) {
    position.x =0
  }
  // console.log(forceLong.mag(), forceLong.mag()/mass, velocity.mag());
  console.log(rearWheelWeight, acc.mag());
  drawDragVector(position, acc);
  drawVelVector(position, velocity);
}

const calculateWeightTransfer = function() {
  rearWheelWeight = (rearWheelDist/wheelBase)*mass*10 + (centerMassHeight/wheelBase)*mass*acc.mag();
  frontWheelWeight = (frontWheelDist/wheelBase)*mass*10 - (centerMassHeight/wheelBase)*mass*acc.mag();
}

const calcForceTraction = function () {
  forceTraction = p5.Vector.mult(u, engineForce);
}

const calcForceDrag = function() {
  const C_DRAG = 0.4257;
  let speed = velocity.mag();
  forceDrag = p5.Vector.mult(velocity,-C_DRAG).mult(speed);
}

const calcForceResistance = function () {
  const C_RR = 12.8;
  forceResistance = p5.Vector.mult(velocity, -C_RR);
}

const calcForceBraking = function () {
  forceBreaking = p5.Vector.mult(u, -breakingForce);
}

const calcDriveForce = function () {
  let wheelRadius = 0.34;
  let gearRatio = 2.66;
  let transmissionEff = 1;
  let differentialRatio = 3.42;
  let torque = engine.calclulateTorqueByRPM();
  let multiplier = torque * gearRatio * differentialRatio* transmissionEff / wheelRadius;
  forceDrive = p5.Vector.mult(u, multiplier);
}

const calcForceLong = function () {
  forceLong = p5.Vector
    .add(forceResistance, forceDrag)
    .add(forceBreaking)
    .add(isPedalDown ? forceDrive : new p5.Vector(0,0))
    .mult(scale);
}

const calcAcc = function() {
  acc = p5.Vector.div(forceLong, mass);
}

const calcVelocity = function() {
  let accDt = p5.Vector.mult(acc, dt);
  velocity.add(accDt);
}

const calcPosition = function() {
  let velDt = p5.Vector.mult(velocity, dt);
  position.add(velDt);
}



const drawVelVector = function(p, v) {
  fill(255,0,0);
  rect(p.x,220,v.x,10);
}

const drawDragVector = function(p,d) {
  fill(0,0,200);
  rect(p.x,225,d.x,10);
}