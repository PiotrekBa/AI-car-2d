let car;

const conf = {
    dt: 0.17,
    posX: 100,
    posY: 100,
    mass: 1000,
    long: 20,
    engineForce: 1000,
    breakingForce: -800,
    turnDelta: 0.4
}

function setup() {
    createCanvas(800, 800);
    car = new Car(conf);
}

function draw() {
    background(200);

    let pedalGas = 0;
    let pedalBreak = 0;

    if (keyIsDown(UP_ARROW)) {
        pedalGas = 1;
    } else if(keyIsDown(DOWN_ARROW)) {
        pedalBreak = 1;
    }

    car.runForward(pedalGas);
    car.break(pedalBreak);

    if (keyIsDown(LEFT_ARROW)) {
        car.turnLeft();
    } else if (keyIsDown(RIGHT_ARROW)) {
        car.turnRight();
    }

    car.update();
    car.show();
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
