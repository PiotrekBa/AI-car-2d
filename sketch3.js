let boundries = [];
let checkPoints = new Map();
let counter;
let deathPlayers = [];
let alivePlayers = [];

let chartService;
let settingService;
let mutationService;

let sim = false;

let generation = 1;

let killButton;

let startButton;
let restartButton;

let defSettingConf = {
    population: 100,
    dichTurn: true,
    hidden1: 6,
    hidden2: 4
}

let actualSetting = defSettingConf;

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
    restPlayers: 4,
    accuracyChange: 0.1,
    useAccuracy: true
}

function setup() {
    createCanvas(1100, 920);

    chartService = new ChartService(30, 660);
    settingService = new SettingService(800,0,0, 640);
    mutationService = new MutationService(mutateConf, carConf, actualSetting.population);

    settingService.getInputs();
    counter = 0;

    boundries.push(new Boundry(100, 150, 250, 150));
    boundries.push(new Boundry(100, 50, 250, 50));
    boundries.push(new Boundry(250, 50, 400, 150));
    boundries.push(new Boundry(250, 150, 400, 250));
    boundries.push(new Boundry(400, 250, 550, 250));
    boundries.push(new Boundry(400, 150, 550, 150));
    boundries.push(new Boundry(650, 50, 550, 150));
    boundries.push(new Boundry(550, 250, 650, 150));
    boundries.push(new Boundry(650, 50, 790, 50));
    boundries.push(new Boundry(650, 150, 650, 250));
    boundries.push(new Boundry(790, 50, 790, 300));
    boundries.push(new Boundry(790, 300, 650, 400));
    boundries.push(new Boundry(600, 300, 350, 300));
    boundries.push(new Boundry(350, 300, 200, 200));
    boundries.push(new Boundry(650, 250, 600, 300));
    boundries.push(new Boundry(650, 400, 350, 400));
    boundries.push(new Boundry(350, 400, 200, 300));
    boundries.push(new Boundry(200, 200, 100, 300));
    boundries.push(new Boundry(200, 300, 200, 400));
    boundries.push(new Boundry(100, 300, 100, 400));
    boundries.push(new Boundry(200, 550, 100, 400));
    boundries.push(new Boundry(300, 450, 200, 400));
    boundries.push(new Boundry(300, 500, 200, 550));
    boundries.push(new Boundry(300, 450, 650, 450));
    boundries.push(new Boundry(300, 500, 350, 550));
    boundries.push(new Boundry(350, 550, 650, 550));
    boundries.push(new Boundry(650, 450, 650, 550));

    checkPoints.set(0, new CheckPoint(150, 50, 150, 150));
    checkPoints.set(1, new CheckPoint(250, 50, 250, 150));
    checkPoints.set(2, new CheckPoint(400, 150, 400, 250));
    checkPoints.set(3, new CheckPoint(550, 150, 550, 250));
    checkPoints.set(4, new CheckPoint(600, 100, 600, 200));
    checkPoints.set(5, new CheckPoint(650, 50, 650, 150));
    checkPoints.set(6, new CheckPoint(650, 150, 790, 150));
    checkPoints.set(7, new CheckPoint(650, 200, 790, 200));
    checkPoints.set(8, new CheckPoint(650, 250, 790, 300));
    checkPoints.set(9, new CheckPoint(600, 300, 650, 400));
    checkPoints.set(10, new CheckPoint(500, 400, 500, 300));
    checkPoints.set(11, new CheckPoint(350, 400, 350, 300));
    checkPoints.set(12, new CheckPoint(260, 342, 260, 238));
    checkPoints.set(13, new CheckPoint(200, 200, 200, 300));
    checkPoints.set(14, new CheckPoint(100, 300, 200, 300));
    checkPoints.set(15, new CheckPoint(100, 400, 200, 400));
    checkPoints.set(16, new CheckPoint(300, 450, 300, 500));
    checkPoints.set(17, new CheckPoint(400, 450, 400, 550));
    checkPoints.set(18, new CheckPoint(500, 450, 500, 550));

    killButton = createButton('Kill');
    killButton.position(30, 550);
    killButton.mousePressed(killAllPlayers);

    startButton = createButton('Start');
    startButton.position(820, 550);
    startButton.size(70, 30);
    startButton.mousePressed(startSimulation);

    startButton = createButton('Reset');
    startButton.position(900, 550);
    startButton.size(70, 30);
    startButton.mousePressed(resetSimulation);

    let div = createDiv(getInstruction());
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
    // text("x = " + mouseX + " ; y = " + mouseY, 30, 30);
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
        let bestScore = 0;
        let brain = null;
        let time = 0;

        if(allPlayers.length > 0 ) {
            bestScore = allPlayers[0].getScore();
            brain = allPlayers[0].brain;
            time = allPlayers[0].timer;
            alivePlayers = mutationService.getNextGeneration(allPlayers, chartService.score === 100);
            deathPlayers = [];
            counter = 0;
            generation++;
        }
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
    const hidden1 = actualSetting.hidden1;
    const hidden2 = actualSetting.hidden2;
    return new Brain(5, hidden1, hidden2, 2);
}

function killAllPlayers() {
    deathPlayers.push(alivePlayers);
    deathPlayers = deathPlayers.flat();
    alivePlayers = [];
}

function startSimulation() {
    sim = true;
    actualSetting = settingService.getSettings();
    counter = 0;
    mutationService.playersAmount = actualSetting.population;
    getNewPlayers();
}

function resetSimulation() {
    sim = false;
    alivePlayers = [];
    deathPlayers = [];
    generation = 1;
    chartService.reset();
}

function getNewPlayers() {
    for (let i = 0; i < actualSetting.population; i++) {
        let car = new Car(carConf);
        let brain = getNewBrain();
        brain.initRandomWeights();
        alivePlayers.push(new Player(car, brain));
    }
}
