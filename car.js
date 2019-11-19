/* configuration car 
{
    dt: 0.17,
    posX: 0,
    posY: 0,
    mass: 1000,
    long: 20,
    engineForce: 1300,
    breakingForce: -800,
    turnDelta: 0.2
}
*/

class Car {
    constructor(conf) {
        this.position = createVector(conf.posX, conf.posY);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.head = createVector(1, 0);
        this.mass = conf.mass;
        this.long = conf.long;
        this.engine = new Engine(conf.engineForce);
        this.breaking = conf.breakingForce;
        this.turnDelta = conf.turnDelta;

        this.dt = conf.dt;
        this.pedalGas = 0;
        this.pedalBreak = 0;
    }

    calcTractionForce() {
        const engineForce = this.engine.getForce();
        return p5.Vector
            .mult(this.head, engineForce)
            .mult(this.pedalGas);
    }

    calcBreakingForce() {
        return p5.Vector.mult(head, breakingForce).mult(pedalBreak);
    }

    calcAllForces() {
        const traction = this.calcTractionForce();
        const breaking = this.calcTractionForce();
        return ForceService.getWorldForces(velocity, traction, breaking);
    }

    calcAcceleration() {
        this.acceleration = this.calcAllForces().div(this.mass);
    }

    calcVelocity() {
        const acc = P5.Vector.mult(this.acceleration, this.dt);
        this.velocity.add(acc);
    }

    calcPosition() {
        const velocity = p5.Vector.mult(this.velocity, this.dt);
        this.position.add(velocity);
    }

    turnLeft() {
        this.turn(-1); 
    }

    turnRight() {
        this.turn(1);
    }

    noTurn() {
        this.turn(0);
    }

    turn(dir) {
        const angle = this.calcAngle(dir);
        rotateCar(angle);
    }

    calcAngle(dir) {
        if (dir != 0) {
            let curveRadius = this.long / sin(this.turnDelta) * dir;
            return this.velocity.mag() / (curveRadius) * this.dt;
        }
        return 0;
    }

    rotateCar (angle) {
        translate(this.position.x, this.position.y);
        this.head.rotate(angle);
        this.velocity.rotate(angle);
    }

    show() {
        let dir = this.head.heading();
        rotate(dir);
        rect(0, 0, 20, 10);
        line(0, 5, heading.x + 50, heading.y + 5)
    }
}