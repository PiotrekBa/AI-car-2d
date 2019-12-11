let boundries = [];
let checkPoints = new Map();
let counter;
let deathPlayers = [];
let alivePlayers = [];

let chartService;

let sim = true;
let isprint = false;

let generation = 1;

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
    createCanvas(900, 900);

    chartService = new ChartService(30, 650);
    for (let i = 0; i < 100; i++) {
        let car = new Car(conf);
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
    text(generation, 500, 30);

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

    if(alivePlayers.length === 0 && !isprint) {
        deathPlayers.sort((a,b) => {
            if(b.getScore() === a.getScore()) {
                return a.timer - b.timer;
            }
            return b.getScore() - a.getScore();
        });
        const bestScore = deathPlayers[0].getScore();
        const brain = deathPlayers[0].brain;
        const time = deathPlayers[0].timer;
        isprint = true;
        nextGeneration();
        counter = 0;
        generation++;
        chartService.calculateChartBrainElements(brain);
        chartService.calculateScore(bestScore, checkPoints.size);
        chartService.addNewTimeValueIfTrackFinished(time);
    }

    chartService.draw();
    checkPoints.forEach(v => v.show());
    boundries.forEach(b => b.show());
}

function nextGeneration() {
    let b = deathPlayers.splice(0,1);
    let w = b[0].brain.getAllWeights();
    
    let c = new Car(conf);
    c.color = 'rgba(255,0,0, 0.25)'
    let br = getNewBrain();
    br.setWeights(w);
    
    
    alivePlayers.push(new Player(c, br));

    for(let i = 0; i < 29; i++) {
        let newWeights = mutate(b[0], 2);
        let car = new Car(conf);
        let brain = getNewBrain();
        brain.setWeights(newWeights);
        alivePlayers.push(new Player(car, brain));
    }

    for(let i = 0; i < 20; i++) {
        let newWeights = mutate(b[0], 1);
        let car = new Car(conf);
        let brain = getNewBrain();
        brain.setWeights(newWeights);
        alivePlayers.push(new Player(car, brain));
    }

    for(let i = 0; i < 20; i++) {
        let newWeights = mutate(b[0], 0.5);
        let car = new Car(conf);
        let brain = getNewBrain();
        brain.setWeights(newWeights);
        alivePlayers.push(new Player(car, brain));
    }


    b = deathPlayers.splice(0,4);

    for(let i = 0; i < 20; i++) {
        let newWeights = mutate(b[i%4]);
        let car = new Car(conf);
        let brain = getNewBrain();
        brain.setWeights(newWeights);
        alivePlayers.push(new Player(car, brain));
    }

    for(let i = 0; i < 10; i++) {
        let car = new Car(conf);
        let brain = getNewBrain();
        brain.initRandomWeights();
        alivePlayers.push(new Player(car, brain));
    }
    deathPlayers = [];
    isprint = false;
}

function mutate(player, change) {
    let weights = player.brain.getAllWeights();
    for(let i = 0; i < weights.length; i++) {
        const a = Math.random();
        if(a < 0.2) {
            weights[i] -= change;
        } else if (a < 0.4) {
            weights[i] += change;
        } else if(a < 0.5) {
            weights[i] = getRandomWeight();
        }
    }
    return weights;
}

function roundWeight(n,k) {
    var factor = Math.pow(10, k+1);
    n = Math.round(Math.round(n*factor)/10);
    return n/(factor/10);
}

function getRandomWeight() {
    return this.roundWeight(Math.random() * 2 - 1, 2);
}

function getNewBrain() {
    return new Brain(5,6,4,2);
}
