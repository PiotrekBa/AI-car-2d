class ChartService {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.scoreText = 'no data';
        this.score = 0;
        this.brainChartWidth = 400;
        this.brainChartHeight = 250;
        this.chartBrainElements = [];
    }

    calculateScore(actualCP, allCPs) {
        this.score = Math.floor(actualCP / allCPs * 100);
        this.scoreText = actualCP + '/' + allCPs + '    ' + this.score + '%';
    }

    calculateChartBrainElements(brain) {
        if (brain) {
            this.chartBrainElements = [];
            const widthDivider = this.brainChartWidth / 4;
            const h = this.brainChartHeight;

            const centersI = this.getCirclesLayerCenter(brain.inputs, widthDivider / 2, h, false);
            const centersL1 = this.getCirclesLayerCenter(brain.layer1, widthDivider * 1.5, h, true);
            const centersL2 = this.getCirclesLayerCenter(brain.layer2, widthDivider * 2.5, h, true);
            const centersO = this.getCirclesLayerCenter(brain.outputs, widthDivider * 3.5, h, true);

            const weighLinesI = this.prepareWeightLine(centersI, centersL1, brain.layer1);
            const weighLinesL1 = this.prepareWeightLine(centersL1, centersL2, brain.layer2);
            const weighLinesL2 = this.prepareWeightLine(centersL2, centersO, brain.outputs);

            const elements = [];
            elements.push(weighLinesI);
            elements.push(weighLinesL1);
            elements.push(weighLinesL2);

            elements.push(centersI);
            elements.push(centersL1);
            elements.push(centersL2);
            elements.push(centersO);

            this.chartBrainElements = elements.flat();
        }
    }

    draw() {
        this.drawCheckPointBar();
        this.drawBrain();
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
        const w = this.brainChartWidth;
        const h = this.brainChartHeight;
        push();
        translate(this.x + 120, this.y);
        strokeWeight(1);
        stroke(51)
        rect(0, 0, w, h);
        this.chartBrainElements.forEach(e => e.draw());
        pop();
    }

    getCirclesLayerCenter(nodes, wd, h, areNeurons) {
        let nodesCount;
        if (areNeurons) {
            nodesCount = nodes.length;
        } else {
            nodesCount = nodes;
        }
        let hd = h / nodesCount;
        let centers = [];
        for (let i = 0; i < nodesCount; i++) {
            let bias = areNeurons ? nodes[i].bias : null;
            const circle = new NeuronCircle(wd, hd * i + hd / 2, bias, 15);
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
        for (let i = 0; i < neurons.length; i++) {
            let weights = neurons[i].weights;
            for (let j = 0; j < weights.length; j++) {
                let point1 = centers2[i];
                let point2 = centers1[j];
                const weighLine = new WeightLine(point1.x, point1.y, point2.x, point2.y, weights[j]);
                weighLine.calcWeightAndColor();
                weightsLines.push(weighLine);
            }
        }
        return weightsLines;
    }

    drawProgressChart() {

    }
}

class BrainChartElement {
    constructor(weight) {
        this.weight = weight;
        this.color;
    }

    calcWeightAndColor() {
        if (this.weight) {
            if (this.weight < 0) {
                this.color = color(0, 0, 200);
                this.weight = Math.abs(this.weight);
            } else {
                this.color = color(200, 0, 0);
            }
        } else {
            this.color = color(0, 0, 0);
            this.weight = 2;
        }
    }
}

class WeightLine extends BrainChartElement {
    constructor(x1, y1, x2, y2, weight) {
        super(weight);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    draw() {
        push();
        stroke(this.color);
        strokeWeight(this.weight);
        line(this.x1, this.y1, this.x2, this.y2);
        pop();
    }
}

class NeuronCircle extends BrainChartElement {
    constructor(x, y, weight, radius) {
        super(weight);
        this.x = x;
        this.y = y;
        this.color;
        this.radius = radius;
    }

    draw() {
        push();
        stroke(this.color);
        fill(230);
        strokeWeight(this.weight);
        ellipse(this.x, this.y, this.radius);
        pop();
    }
}