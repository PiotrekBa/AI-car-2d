class Player {
    constructor(car, brain) {
        this.car = car;
        this.brain = brain;
        this.timer = 0;
    }

    update(boundries, checkPoints) {
        this.carUpdate(boundries, checkPoints);
        this.useBrain();
        this.updateTimer();
    }

    carUpdate(boundries, checkPoints) {
        this.car.update();
        this.car.show();
        this.car.calcDetection();
        this.car.detectBoundries(boundries);
        this.car.calcRecPoints();
        this.car.calcCollision(boundries);
        this.car.showDetection();
        this.car.calcAxis();
        this.car.checkCheckPoints(checkPoints);
    }

    useBrain() {
        const dist1 = this.car.lRay.getDistance();
        const dist2 = this.car.cRay.getDistance();
        const dist3 = this.car.rRay.getDistance();
        const dist4 = this.car.lcRay.getDistance();
        const dist5 = this.car.rcRay.getDistance();

        const inputs = [];
        inputs.push(dist1 / 200);
        inputs.push(dist2 / 200);
        inputs.push(dist3 / 200);
        inputs.push(dist4 / 200);
        inputs.push(dist5 / 200);

        const outputs = this.brain.deliverInputs(inputs);

        if (outputs[0] > 0.2) {
            this.car.pedalGas = outputs[0];
        } else {
            this.car.pedalGas = 0;
        }

        if (outputs[1] > 0.6) {
            const x = norm(outputs[1]-0.55, 0, 0.45)
            this.car.turnLeft(1);
        } else if (outputs[1] < 0.4){
            const x = norm(outputs[1], 0, 0.45)
            this.car.turnRight(1);
        }
    }

    updateTimer() {
        if(!this.car.collision) {
            this.timer += this.car.dt;
        }
    }

    getScore() {
        return this.car.checkedPoints.size;
    }
}