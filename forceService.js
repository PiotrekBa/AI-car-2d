class ForceService {

    static getWorldForces(velocity, tractionForce, breakingForce) {
        let dragForce = getDragForce(velocity);
        let frictionForce = getFrictionForce(velocity);
        return p5.Vector
            .add(dragForce, frictionForce)
            .add(tractionForce)
            .add(dragForce)
            .add(breakingForce);
    }

    static getLongForce(dragForce, frictionForce) {
        p5.Vector.add(dragForce, frictionForce);
    }

    static getDragForce(velocity) {
        const cDrag = -0.4257;
        let velocity = velocity.copy();
        velocity.mult(velocity.mag());
        velocity.mult(cDrag);
    }

    static getFrictionForce(velocity) {
        const cFriction = -12.8;
        return velocity.copy().mult(cFriction);
    }
}