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

        this.angle = 0;
        this.dt = conf.dt;
        this.pedalGas = 0;
        this.pedalBreak = 0;

        this.lRay;
        this.rRay;
        this.cRay;
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
        const a = this.velocity.heading();
        const b = this.head.heading();
        if(Math.floor(a) == Math.floor(b)) {
            this.position.add(velocity);
        } else {
            this.velocity.setMag(0);
        }
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
        this.angle = this.calcAngle(dir);
        this.rotateCar();
    }

    calcAngle(dir) {
        if (dir != 0) {
            let curveRadius = this.long / Math.sin(this.turnDelta) * dir;
            return this.velocity.mag() / (curveRadius) * this.dt;
        }
        return 0;
    }

    rotateCar () {
        const angle = this.angle;
        this.head.rotate(angle);
        this.velocity.rotate(angle);
    }

    update() {
        this.calcAcceleration();
        this.calcVelocity();
        this.calcPosition();
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        let dir = this.head.heading();
        rotate(dir);
        rect(-10 , -5 , 20, 10);
        pop();
    }

    calcDetection () {
        this.lRay = this.calcRaysVector(10, -5, 0, -100);
        this.rRay = this.calcRaysVector(10, 5, 0, 100);
        this.cRay = this.calcRaysVector(10, 0, 100, 0);
    }

    showDetection () {
        this.lRay.show();
        this.rRay.show();
        this.cRay.show();
        }

    calcRaysVector(offsetX, offsetY, dirX, dirY) {
        const angle = this.head.heading(); 
        push();
        translate(this.position.x, this.position.y);
        let startVector = new p5.Vector(offsetX, offsetY);
        startVector.rotate(angle);
        startVector.add(this.position);
        let endVector = new p5.Vector(dirX, dirY);
        endVector.rotate(angle);
        endVector.add(startVector);
        pop();
        return new Ray(startVector, endVector);
    }

    detectBoundries(boundries) {
        for(let b of boundries) {
            this.lRay.lookAt(b);
            this.rRay.lookAt(b);
            this.cRay.lookAt(b);
        }
    }

    getDistances() {
        return this.lRay.getDistance();
    }
}