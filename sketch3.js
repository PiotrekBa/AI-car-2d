let boundries = [];
let checkPoints = {};
let counter;
let deathPlayers = [];
let alivePlayers = [];

let sim = false;

const conf = {
    dt: 0.2,
    posX: 100,
    posY: 100,
    mass: 1000,
    long: 20,
    engineForce: 1000,
    breakingForce: -800,
    turnDelta: 0.5
}

function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < 10000; i++) {
        let car = new Car(conf);
        let brain = new Brain(3, 3, 3, 2);
        brain.initRandomWeights();
        alivePlayers.push(new Player(car, brain));
    }

    counter = 0;

    boundries.push(new Boundry(100, 150, 250, 150));
    boundries.push(new Boundry(100, 50, 250, 50));
    boundries.push(new Boundry(250, 50, 400, 100));
    boundries.push(new Boundry(250, 150, 400, 200));
    boundries.push(new Boundry(400, 200, 550, 200));
    boundries.push(new Boundry(400, 100, 550, 100));
    boundries.push(new Boundry(650, 50, 550, 100));
    boundries.push(new Boundry(550, 200, 650, 150));
    boundries.push(new Boundry(650, 50, 750, 50));
    boundries.push(new Boundry(650, 150, 650, 250));
    boundries.push(new Boundry(750, 50, 750, 300));
    boundries.push(new Boundry(750, 300, 650, 400));
    boundries.push(new Boundry(600, 300, 350, 300));
    boundries.push(new Boundry(650, 250, 600, 300));
    boundries.push(new Boundry(650, 400, 500, 400));
    boundries.push(new Boundry(350, 300, 350, 500));
    boundries.push(new Boundry(350, 500, 650, 500));
    boundries.push(new Boundry(650, 500, 650, 400));

    checkPoints["1"] = new CheckPoint(250, 50, 250, 150);
    checkPoints["2"] = new CheckPoint(400, 100, 400, 200);
    checkPoints["3"] = new CheckPoint(550, 100, 550, 200);
    checkPoints["4"] = new CheckPoint(650, 50, 650, 150);
    checkPoints["5"] = new CheckPoint(650, 150, 750, 150);
    checkPoints["6"] = new CheckPoint(650, 250, 750, 300);
    checkPoints["7"] = new CheckPoint(600, 300, 650, 400);
    checkPoints["8"] = new CheckPoint(500, 400, 500, 300);
    checkPoints["9"] = new CheckPoint(500, 400, 350, 400);
    checkPoints["10"] = new CheckPoint(500, 400, 500, 500);
    checkPoints["11"] = new CheckPoint(600, 400, 600, 500);

}

function draw() {
    background(200);

    // let pedalGas = 0;
    // let pedalBreak = 0;

    // if (keyIsDown(UP_ARROW)) {
    //     pedalGas = 1;
    // } else if (keyIsDown(DOWN_ARROW)) {
    //     pedalBreak = 1;
    // }

    // car.runForward(pedalGas);
    // car.break(pedalBreak);

    // if (keyIsDown(LEFT_ARROW)) {
    //     car.turnLeft();
    // } else if (keyIsDown(RIGHT_ARROW)) {
    //     car.turnRight();
    // }
    if (counter <= 100) {
        counter++;
    }
    textSize(32)
    // text(alivePlayers.length, 30, 30);
    text("x = " + mouseX + " ; y = " + mouseY, 30, 30);

    if (sim) {
        for (let i = 0; i < alivePlayers.length; i++) {
            if (!alivePlayers[i].car.collision) {
                alivePlayers[i].update(boundries, checkPoints);
                if (counter >= 100 && alivePlayers[i].car.acceleration.mag() == 0) {
                    alivePlayers[i].car.collision = true;
                }
            } else {
                let player = alivePlayers.splice(i, 1)[0];
                deathPlayers.push(player);
                // players[i].car.show();
            }
        }
    }

    Object.keys(checkPoints).forEach(k => checkPoints[k].show());
    boundries.forEach(b => b.show());
}
