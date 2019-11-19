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
        this.position = new p5.Vector(conf.posX, conf.posY);
        this.velocity = new p5.Vector(0, 0);
        this.acceleration = new p5.Vector(0, 0);
        this.head = new p5.Vector(1, 0);
        this.mass = conf.mass;
        this.long = conf.long;
        this.engine = new Engine(conf.engineForce);
        this.breaking = conf.breakingForce;
        this.turnDelta = conf.turnDelta;

        this.dt = conf.dt;
        this.pedalGas = 0;
        this.pedalBreak = 0;
    }

    runForward(pedalGas) {
        this.pedalGas = pedalGas;
    }

    break(pedalBreak) {
        this.pedalBreak = pedalBreak;
    }

    calcTractionForce() {
        const engineForce = this.engine.getForce();
        return p5.Vector
            .mult(this.head, engineForce)
            .mult(this.pedalGas);
    }

    calcBreakingForce() {
        return p5.Vector.mult(this.head, this.breaking).mult(this.pedalBreak);
    }

    calcAllForces() {
        const traction = this.calcTractionForce();
        const breaking = this.calcBreakingForce();
        return ForceService.getWorldForces(this.velocity, traction, breaking);
    }

    calcAcceleration() {
        this.acceleration = this.calcAllForces().div(this.mass);
    }

    calcVelocity() {
        const acc = p5.Vector.mult(this.acceleration, this.dt);
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
        this.rotateCar(angle);
    }

    calcAngle(dir) {
        if (dir != 0) {
            let curveRadius = this.long / Math.sin(this.turnDelta) * dir;
            return this.velocity.mag() / (curveRadius) * this.dt;
        }
        return 0;
    }

    rotateCar (angle) {
        this.head.rotate(angle);
        this.velocity.rotate(angle);
    }

    update() {
        this.calcAcceleration();
        this.calcVelocity();
        this.calcPosition();
    }

    show() {
        translate(this.position.x, this.position.y);
        let dir = this.head.heading();
        rotate(dir);
        rect(0, 0, 20, 10);
        line(0, 5, dir.x + 50, dir.y + 5)
    }
}