class Ray {
    constructor(x,y) {
        this.pos = createVector(x, y);
        this.direction = createVector(1, 0);
    }

    show() {
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.direction.x * 100, this.direction.y* 100);
        pop();
    }
}