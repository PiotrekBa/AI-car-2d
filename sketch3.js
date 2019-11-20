let car;

const conf = {
    dt: 0.2,
    posX: 100,
    posY: 100,
    mass: 1000,
    long: 20,
    engineForce: 1000,
    breakingForce: -800,
    turnDelta: 0.3
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
    car.showDetectionLine();

}
