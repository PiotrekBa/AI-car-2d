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

        this.rectAB;
        this.rectBC;
        this.rectCD;
        this.rectDA;

        this.axis;

        this.collision = false;

        this.checkedPoints = new Set();
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
        if (Math.floor(a) == Math.floor(b) && !this.collision) {
            this.position.add(velocity);
        } else {
            this.stop();
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

    rotateCar() {
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
        rect(-10, -5, 20, 10);
        pop();
    }

    calcDetection() {
        this.lRay = this.calcRaysVector(10, -5, 0, -200);
        this.rRay = this.calcRaysVector(10, 5, 0, 200);
        this.cRay = this.calcRaysVector(10, 0, 200, 0);
    }

    calcAxis() {
        this.axis = this.calcRaysVector(-10, 0, 20, 0);
        this.axis.showLine();
    }

    checkCheckPoints(checkPoints) {
        const axis = this.axis;
        for (let k of Object.keys(checkPoints)) {
            const v = checkPoints[k];
            if (!this.checkedPoints.has(k)) {
                if (CollisionService.isLinesIntersection(axis.pos.x, axis.pos.y,
                    axis.dir.x, axis.dir.y, v.x1, v.y1, v.x2, v.y2)) {
                    this.checkedPoints.add(k);
                }
            }
        }
    }

    calcRecPoints() {
        const pointA = this.prepareRotateVectorWithPosition(-10, -5);
        const pointB = this.prepareRotateVectorWithPosition(-10, 5);
        const pointC = this.prepareRotateVectorWithPosition(10, -5);
        const pointD = this.prepareRotateVectorWithPosition(10, 5);

        this.rectAB = new CarSegment(pointA, pointB);
        this.rectBC = new CarSegment(pointB, pointC);
        this.rectCD = new CarSegment(pointC, pointD);
        this.rectDA = new CarSegment(pointD, pointA);
    }

    calcCollision(boundries) {
        for (let b of boundries) {
            if (this.rectAB.checkLineCollision(b)) {
                this.collision = true;
                break;
            }
            if (this.rectBC.checkLineCollision(b)) {
                this.collision = true;
                break;
            }
            if (this.rectCD.checkLineCollision(b)) {
                this.collision = true;
                break;
            }
            if (this.rectDA.checkLineCollision(b)) {
                this.collision = true;
                break;
            }
        }
    }

    showDetection() {
        this.lRay.show();
        this.rRay.show();
        this.cRay.show();
    }

    prepareRotateVectorWithPosition(x, y) {
        const angle = this.head.heading();
        let vector = new p5.Vector(x, y);
        vector.rotate(angle)
        vector.add(this.position);
        return vector;
    }

    calcRaysVector(offsetX, offsetY, dirX, dirY) {
        const angle = this.head.heading();
        let startVector = new p5.Vector(offsetX, offsetY);
        startVector.rotate(angle);
        startVector.add(this.position);
        let endVector = new p5.Vector(dirX, dirY);
        endVector.rotate(angle);
        endVector.add(startVector);
        return new Ray(startVector, endVector);
    }

    detectBoundries(boundries) {
        for (let b of boundries) {
            this.lRay.lookAt(b);
            this.rRay.lookAt(b);
            this.cRay.lookAt(b);
        }
    }

    getDistances() {
        return this.lRay.getDistance();
    }

    stop() {
        this.velocity.setMag(0);
    }
}

class CarSegment {
    constructor(pointA, pointB) {
        this.pointA = pointA;
        this.pointB = pointB;
    }

    checkLineCollision(boundry) {
        return CollisionService.isLinesIntersection(this.pointA.x, this.pointA.y,
            this.pointB.x, this.pointB.y, boundry.x1, boundry.y1, boundry.x2, boundry.y2);
    }
}