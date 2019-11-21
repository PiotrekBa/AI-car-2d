let car;
let boundries = [];
let checkPoints = {};

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
    boundries.push(new Boundry(100, 150, 500, 150));
    boundries.push(new Boundry(100, 50, 600, 50));
    boundries.push(new Boundry(500, 150, 500, 500));
    boundries.push(new Boundry(600, 50, 600, 500));

    checkPoints["1"] = new CheckPoint(150, 50, 150, 150);
    checkPoints["2"] = new CheckPoint(200, 50, 200, 150);
    checkPoints["3"] = new CheckPoint(250, 50, 250, 150);
    checkPoints["4"] = new CheckPoint(300, 50, 300, 150);
    checkPoints["5"] = new CheckPoint(350, 50, 350, 150);
    checkPoints["6"] = new CheckPoint(400, 50, 400, 150);
    checkPoints["7"] = new CheckPoint(450, 50, 450, 150);
    checkPoints["8"] = new CheckPoint(500, 50, 500, 150);
    checkPoints["9"] = new CheckPoint(600, 50, 500, 150);
    checkPoints["10"] = new CheckPoint(600, 150, 500, 150);
    checkPoints["11"] = new CheckPoint(600, 200, 500, 200);
    checkPoints["12"] = new CheckPoint(600, 250, 500, 250);
    checkPoints["13"] = new CheckPoint(600, 300, 500, 300);
    checkPoints["14"] = new CheckPoint(600, 350, 500, 350);
    checkPoints["15"] = new CheckPoint(600, 400, 500, 400);
    checkPoints["16"] = new CheckPoint(600, 450, 500, 450);
}

function draw() {
    background(200);

    let pedalGas = 0;
    let pedalBreak = 0;

    if (keyIsDown(UP_ARROW)) {
        pedalGas = 1;
    } else if (keyIsDown(DOWN_ARROW)) {
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

    // checkPoints.forEach((k,v) => v.show());
    boundries.forEach(b => b.show());
}
