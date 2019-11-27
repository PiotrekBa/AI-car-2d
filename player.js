class Player {
    constructor(car, brain) {
        this.car = car;
        this.brain = brain;
    }

    update(boundries, checkPoints) {
        this.carUpdate(boundries, checkPoints);
        this.useBrain();
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

        const inputs = [];
        inputs.push(dist1 / 200);
        inputs.push(dist2 / 200);
        inputs.push(dist3 / 200);

        const outputs = this.brain.deliverInputs(inputs);

        if (outputs[0] > 0.5) {
            this.car.pedalGas = 1;
        } else {
            this.car.pedalGas = 0;
        }

        if (outputs[1] > 0.6) {
            this.car.turnLeft();
        } else {
            this.car.turnRight();
        }
    }
}