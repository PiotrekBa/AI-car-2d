class Ray {
    constructor(pos, dir) {
        this.pos = pos;
        this.dir = dir;
    }

    show() {
        push();
        stroke(0);
        ellipse(this.pos.x, this.pos.y, 4);
        ellipse(this.dir.x, this.dir.y, 4);
        // line(this.pos.x, this.pos.y, this.direction.x, this.direction.y);
        pop();
    }
}