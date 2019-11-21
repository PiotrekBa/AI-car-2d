let car;
let boundries = [];

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
    boundries.push(new Boundry(100,150,500,150));
    boundries.push(new Boundry(100,50,600,50));
    boundries.push(new Boundry(500,150,500,500));
    boundries.push(new Boundry(600,50,600,500));
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
    car.calcDetection();
    car.detectBoundries(boundries);
    car.calcRecPoints();
    car.getDistances();
    car.calcCollision(boundries);
    car.showDetection();

    boundries.forEach(b => b.show());
}
