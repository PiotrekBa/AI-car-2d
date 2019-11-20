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
        const tu = this.getLinesIntersection(boundry);
        if (CollisionService.checkIntersection(tu)) {
            this.color = color(255, 0, 0);
            const px = this.pos.x + tu.t * (this.dir.x - this.pos.x);
            const py = this.pos.y + tu.t * (this.dir.y - this.pos.y);
            this.dir = new p5.Vector(px, py);
        }
    }

    getLinesIntersection(boundry) {
        return CollisionService
            .linelineIntersection(this.pos.x, this.pos.y, this.dir.x,this.dir.y, boundry.x1, boundry.y1, boundry.x2, boundry.y2);
    }

    getDistance() {
        const dist = p5.Vector.sub(this.dir, this.pos).mag();
        return Math.floor(dist);
    }
}