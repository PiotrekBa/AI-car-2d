let boundries = [];
let checkPoints = new Map();
let counter;
let deathPlayers = [];
let alivePlayers = [];
const playersAmount = 100;

let chartService;
let settingService;
let mutationService;

let sim = true;
let isprint = false;

let generation = 1;

let killButton;

const carConf = {
    dt: 0.2,
    posX: 100,
    posY: 100,
    mass: 1000,
    long: 20,
    engineForce: 1000,
    breakingForce: -800,
    turnDelta: 0.3
}

const mutateConf = {
    roughAmount: 19,
    midAmount: 20,
    precAmount: 30,
    restPlayersAmount: 20,
    randomAmount: 10,
    roughChange: 2,
    midChange: 1,
    precChange: 0.5,
    restPlayers: 4
}

function setup() {
    createCanvas(1100, 920);

    chartService = new ChartService(30, 660);
    settingService = new SettingService(800,0,0, 640);
    mutationService = new MutationService(mutateConf, carConf, playersAmount);

    for (let i = 0; i < playersAmount; i++) {
        let car = new Car(carConf);
        let brain = getNewBrain();
        brain.initRandomWeights();
        alivePlayers.push(new Player(car, brain));
    }

    counter = 0;

    boundries.push(new Boundry(100, 150, 250, 150));
    boundries.push(new Boundry(100, 50, 250, 50));
    boundries.push(new Boundry(250, 50, 400, 150));
    boundries.push(new Boundry(250, 150, 400, 250));
    boundries.push(new Boundry(400, 250, 550, 250));
    boundries.push(new Boundry(400, 150, 550, 150));
    boundries.push(new Boundry(650, 50, 550, 150));
    boundries.push(new Boundry(550, 250, 650, 150));
    boundries.push(new Boundry(650, 50, 750, 50));
    boundries.push(new Boundry(650, 150, 650, 250));
    boundries.push(new Boundry(750, 50, 750, 300));
    boundries.push(new Boundry(750, 300, 650, 400));
    boundries.push(new Boundry(600, 300, 350, 300));
    boundries.push(new Boundry(650, 250, 600, 300));
    boundries.push(new Boundry(650, 400, 450, 400));
    boundries.push(new Boundry(350, 300, 350, 600));

    boundries.push(new Boundry(450, 400, 450, 500));
    boundries.push(new Boundry(450, 500, 650, 500));

    boundries.push(new Boundry(350, 600, 650, 600));
    boundries.push(new Boundry(650, 500, 650, 600));

    checkPoints.set(0, new CheckPoint(150, 50, 150, 150));
    checkPoints.set(1, new CheckPoint(250, 50, 250, 150));
    checkPoints.set(2, new CheckPoint(400, 150, 400, 250));
    checkPoints.set(3, new CheckPoint(550, 150, 550, 250));
    checkPoints.set(4, new CheckPoint(650, 50, 650, 150));
    checkPoints.set(5, new CheckPoint(650, 150, 750, 150));
    checkPoints.set(6, new CheckPoint(650, 250, 750, 300));
    checkPoints.set(7, new CheckPoint(600, 300, 650, 400));
    checkPoints.set(8, new CheckPoint(500, 400, 500, 300));
    checkPoints.set(9, new CheckPoint(450, 400, 350, 400));
    checkPoints.set(10, new CheckPoint(450, 500, 350, 500));
    checkPoints.set(11, new CheckPoint(500, 600, 500, 500));
    checkPoints.set(12, new CheckPoint(600, 500, 600, 600));

    killButton = createButton('Kill');
    killButton.position(30, 550);
    killButton.mousePressed(killAllPlayers);
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
    text('Gen: ' + generation, 500, 30);

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
            }
        }
    }

    if (alivePlayers.length === 0) {
        deathPlayers.sort((a, b) => {
            if (b.getScore() === a.getScore()) {
                return a.timer - b.timer;
            }
            return b.getScore() - a.getScore();
        });
        let allPlayers = [...deathPlayers];
        const bestScore = allPlayers[0].getScore();
        const brain = allPlayers[0].brain;
        const time = allPlayers[0].timer;
        alivePlayers = mutationService.getNextGeneration(allPlayers);
        deathPlayers = [];
        counter = 0;
        generation++;
        chartService.calculateChartBrainElements(brain);
        chartService.calculateScore(bestScore, checkPoints.size);
        chartService.addNewTimeValueIfTrackFinished(time);
    }

    chartService.draw();
    settingService.draw();
    checkPoints.forEach(v => v.show());
    boundries.forEach(b => b.show());
}

function roundWeight(n, k) {
    var factor = Math.pow(10, k + 1);
    n = Math.round(Math.round(n * factor) / 10);
    return n / (factor / 10);
}

function getRandomWeight() {
    return this.roundWeight(Math.random() * 2 - 1, 2);
}

function getNewBrain() {
    return new Brain(5, 6, 4, 2);
}

function killAllPlayers() {
    deathPlayers.push(alivePlayers);
    deathPlayers = deathPlayers.flat();
    alivePlayers = [];
}
