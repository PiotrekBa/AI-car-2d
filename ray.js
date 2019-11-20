class Ray {
    constructor(pos, dir) {
        this.pos = pos;
        this.dir = dir;
        this.color = color(0, 0, 0);
    }

    show() {
        push();
        stroke(0);
        fill(this.color);
        ellipse(this.dir.x, this.dir.y, 6);
        pop();
    }

    lookAt(boundry) {
        const x1 = this.pos.x;
        const y1 = this.pos.y;
        const x2 = this.dir.x;
        const y2 = this.dir.y;

        const x3 = boundry.x1;
        const y3 = boundry.y1;
        const x4 = boundry.x2;
        const y4 = boundry.y2;

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        const tCounter = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);

        const uCounter = (x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3);

        if (denominator == 0) {
            return;
        }

        const t = tCounter / denominator;
        const u = -uCounter / denominator;

        let collisionPoint;
        if (t <= 1 && u >= 0 && u <= 1) {
            this.color = color(0, 200, 0);
            const px = x1 + t * (x2 - x1);
            const py = y1 + t * (y2 - y1);
            ellipse(px, py, 4);
            collisionPoint = new p5.Vector(px,py);
        }

        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            this.color = color(255, 0, 0);
            const px = x1 + t * (x2 - x1);
            const py = y1 + t * (y2 - y1);
            this.dir = new p5.Vector(px, py);
        }

        return collisionPoint;
    }

    getDistance() {
        const dist = p5.Vector.sub(this.dir, this.pos).mag();
        return Math.floor(dist);
    }
}