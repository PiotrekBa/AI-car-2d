class ForceService {

    static getWorldForces(velocity, tractionForce, breakingForce) {
        let dragForce = this.getDragForce(velocity);
        let frictionForce = this.getFrictionForce(velocity);
        return p5.Vector
            .add(dragForce, frictionForce)
            .add(tractionForce)
            .add(dragForce)
            .add(breakingForce);
    }

    static getDragForce(velocity) {
        const cDrag = -0.4257;
        // velocity.mult(velocity.mag());
        // return velocity.mult(cDrag);
        return p5.Vector
            .mult(velocity, velocity.mag())
            .mult(cDrag);
    }

    static getFrictionForce(velocity) {
        const cFriction = -12.8;
        return velocity.copy().mult(cFriction);
    }
}