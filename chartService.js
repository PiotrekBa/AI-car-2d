class ChartService {

    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.scoreText = 'no data';
        this.score = 0;
    }

    calculateScore(actualCP, allCPs) {
        this.score = Math.floor(actualCP / allCPs * 100);
        this.scoreText = actualCP + '/' + allCPs + '    ' + this.score + '%';
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
        fill(50);
        strokeWeight(1);
        textFont('Helvetica');
        textSize(16);
        text(this.scoreText, 0, 40);
        pop();
    }
}