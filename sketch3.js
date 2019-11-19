function setup() {
    createCanvas(800, 800);
}

const conf = {
    dt: 0.17,
    posX: 0,
    posY: 0,
    mass: 1000,
    long: 20,
    engineForce: 1300,
    breakingForce: -800,
    turnDelta: 0.2
}

let dt = 0.17;

let engineForce = 1200;
const cDrag = -0.4257;
const cFriction = -12.8;
const cBreaking = -1000;
const mass = 1200;

const L = 20;

const delta = 0.2;

let turn = 0;

let tractionForce = new p5.Vector(0, 0);
let dragForce = new p5.Vector(0, 0);
let frictionForce = new p5.Vector(0, 0);
let breakingForce = new p5.Vector(0, 0);

let longForce = new p5.Vector(0, 0);

let velocity = new p5.Vector(0, 0);
let acc = new p5.Vector(0, 0);
let position = new p5.Vector(0, 400);
const heading = new p5.Vector(1, 0);

let omega;

let car = new Car(conf);

let pedal = 0;
let breakPedal = 0;

function draw() {
    background(200);
    textSize(20);
    stroke(0);
    strokeWeight(1);
    
    if (keyIsDown(UP_ARROW)) {
        pedal = 1;
    } else {
        pedal = 0;
    }

    if (keyIsDown(DOWN_ARROW)) {
        breakPedal = 1;
    } else {
        breakPedal = 0;
    }

    if (keyIsDown(LEFT_ARROW)) {
        turn = -1;
    } else if (keyIsDown(RIGHT_ARROW)) {
        turn = 1;
    } else {
        turn = 0;
    }



    // let velCopy
    // //traction force
    // tractionForce = p5.Vector.mult(heading, engineForce)
    //     .mult(pedal);
    // fill(50);
    // text('traction : ' + roundVectorMag(tractionForce), 0, 20);

    // //drag force
    // velCopy = velocity.copy();
    // velCopy.mult(velCopy.mag());
    // dragForce = p5.Vector.mult(velCopy, cDrag);
    // text('drag : -' + roundVectorMag(dragForce), 200, 20);

    // //friction force
    // velCopy = velocity.copy();
    // frictionForce = p5.Vector.mult(velCopy, cFriction);
    // text('friction : -' + roundVectorMag(frictionForce), 400, 20);

    // //breaking force
    // breakingForce = p5.Vector.mult(heading, cBreaking).mult(breakPedal);

    // //longtitudinal force
    // let sumVector = p5.Vector.add(tractionForce, dragForce);
    // sumVector.add(frictionForce);
    // sumVector.add(breakingForce);
    // longForce = sumVector;
    // text('long :' + roundVectorMag(longForce), 600, 20);

    // //acceleration
    // acc = p5.Vector.div(longForce, mass);
    // text('acc :' + roundVectorMag(acc), 0, 50);

    // //velocity
    // velCopy = velocity.copy();
    // let accCopy = acc.copy();
    // accCopy.mult(dt);
    // velocity = p5.Vector.add(velCopy, accCopy);
    // text('vel :' + roundVectorMag(velocity), 200, 50);



    // //angular velocity
    // if (turn != 0) {
    //     let curveRadius = L / sin(delta) * turn;
    //     if(velocity.mag() != 0) {
    //         omega = velocity.mag() / (curveRadius) * dt;
    //     }
    // } else {
    //     omega = 0;
    // }


    // //position
    // velCopy = velocity.copy();
    // velCopy.mult(dt);
    // let posCopy = position.copy();
    // position = p5.Vector.add(posCopy, velCopy);

    // if (position.x > 800) {
    //     position.x = 0;
    // }


    // translate(position.x, position.y);

    // heading.rotate(omega);
    // velocity.rotate(omega);

    // let dir = heading.heading();
    // rotate(dir);
    // rect(0, 0, 20, 10);
    // line(0, 5, heading.x + 50, heading.y + 5)
}


const roundVectorMag = function (vector) {
    return Math.floor(vector.mag());
}

const drawDetectionLines = function() {
    translate(20, 5);
    stroke('red');
    rotate(radians(90));
    line(0, 0, 200, 0);
    rotate(radians(-45));
    line(0, 0, 200, 0);
    rotate(radians(-45));
    line(0, 0, 200, 0);
    rotate(radians(-45));
    line(0, 0, 200, 0);
    rotate(radians(-45));
    line(0, 0, 200, 0);
}
