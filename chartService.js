class ChartService {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.scoreText = 'no data';
        this.score = 0;
        this.brain;
    }

    calculateScore(actualCP, allCPs) {
        this.score = Math.floor(actualCP / allCPs * 100);
        this.scoreText = actualCP + '/' + allCPs + '    ' + this.score + '%';
    }

    draw() {
        this.drawCheckPointBar();
        if(this.brain){
            this.drawBrain();
        }
        this.drawProgressChart();
    }

    drawCheckPointBar() {
        push();
        translate(this.x, this.y);
        noStroke();
        fill(0, 255, 0);
        rect(0, 0, this.score, 18);
        noFill();
        strokeWeight(4);
        stroke(51);
        rect(0, 0, 100, 20);
        fill(50);
        strokeWeight(1);
        textFont('Helvetica');
        textSize(16);
        text(this.scoreText, 0, 40);
        pop();
    }

    drawBrain() {
        const w = 400;
        const h = 250;
        push();
        translate(this.x + 120, this.y);
        strokeWeight(1);
        stroke(51)
        rect(0, 0, w, h);
        let wd = w / 4;

        let centersI = this.getCirclesLayerCenter(this.brain.inputs, wd / 2, h, false);
        let centersL1 = this.getCirclesLayerCenter(this.brain.layer1, wd * 1.5, h, true);
        let centersL2 = this.getCirclesLayerCenter(this.brain.layer2, wd * 2.5, h, true);
        let centersO = this.getCirclesLayerCenter(this.brain.outputs, wd * 3.5, h, true);


        let wl = this.prepareWeightLine(centersI, centersL1, this.brain.layer1);

        let wl1 = this.prepareWeightLine(centersL1, centersL2, this.brain.layer2);

        let wl2 = this.prepareWeightLine(centersL2, centersO, this.brain.outputs);

        wl = wl.concat(wl1);
        wl = wl.concat(wl2);
        for(let i = 0; i < wl.length; i++) {
            wl[i].draw();
        }

        this.drawCircle(centersI, 15);
        this.drawCircle(centersL1, 15);
        this.drawCircle(centersL2, 15);
        this.drawCircle(centersO, 15);

        pop();
    }

    getCirclesLayerCenter(nodes, wd, h, areNeurons) {
        let nodesCount;
        if(areNeurons) {
            nodesCount = nodes.length;
        } else {
            nodesCount = nodes;
        }
        let hd = h / nodesCount;
        let centers = [];
        for (let i = 0; i < nodesCount; i++) {
            let bias = areNeurons ? nodes[i].bias : null;
            const circle = new NeuronCircle(wd, hd * i + hd / 2, bias); 
            circle.calcWeightAndColor();
            centers.push(circle);
        }
        return centers;
    }

    drawCircle(centers, radius) {
        for (let i = 0; i < centers.length; i++) {
            centers[i].draw(radius);
        }
    }

    prepareWeightLine(centers1, centers2, neurons) {
        let weightsLines = [];
        for(let i = 0; i < neurons.length; i++) {
            let weights = neurons[i].weights;
            for(let j = 0; j < weights.length; j++) {
                let point1 = centers2[i];
                let point2 = centers1[j];
                weightsLines.push(
                    new WeightLine(point1.x, point1.y, point2.x, point2.y, weights[j]));
            }
        }
        return weightsLines;
    }

    drawProgressChart() {

    }
}

class WeightLine {
    constructor(x1, y1, x2, y2, weight) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.weight = weight;
    }

    draw() {
        push();
        if(this.weight < 0) {
            stroke(0,0,200);
        } else {
            stroke(200,0,0);
        }
        strokeWeight(Math.abs(this.weight));
        line(this.x1, this.y1, this.x2, this.y2);
        pop();
    }
}

class NeuronCircle {
    constructor(x, y, weight) {
        this.x = x;
        this.y = y;
        this.weight = weight;
        this.color;
    }

    draw(radius) {
        push();
        stroke(this.color);
        fill(230);
        strokeWeight(this.weight);
        ellipse(this.x, this.y, radius);
        pop();
    }

    calcWeightAndColor() {
        if(this.weight) {
            if (this.weight < 0) {
                this.color = color(0,0,200);
                this.weight = Math.abs(this.weight);
            } else {
                this.color = color(200,0,0);
            }
        } else {
            this.color = color(0,0,0);
            this.weight = 2;
        }
    }
}