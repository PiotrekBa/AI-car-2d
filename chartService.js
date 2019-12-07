class ChartService {

    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.score = 0;
    }

    calculateScore(actualCP, allCPs) {
        this.score = Math.floor(actualCP / allCPs * 100);
    }

    draw() {
        this.drawCheckPointBar();
    }

    drawCheckPointBar() {
        push();
        translate(this.x, this.y);
        noStroke();
        fill(0,255,0);
        rect(0,0,this.score, 18);
        noFill();
        strokeWeight(4);
        stroke(51);
        rect(0,0,100, 20);
        pop();
    }
}