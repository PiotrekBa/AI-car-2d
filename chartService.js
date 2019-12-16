class ChartService {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.scoreText = 'no data';
        this.score = 0;
        this.brainChartWidth = 400;
        this.brainChartHeight = 250;
        this.chartBrainElements = [];
        this.progressVals = [];
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

    addNewTimeValueIfTrackFinished(time) {
        if (this.score === 100) {
            this.progressVals.push(time);
        }
    }

    draw() {
        this.drawTopLine();
        this.drawCheckPointBar();
        this.drawBrain();
        this.drawProgressChart();
    }

    drawTopLine() {
        push();
        translate(0, this.y - 20);
        line(0, 0, width, 0);
        pop();
    }

    drawCheckPointBar() {
        push();
        translate(this.x, this.y);
        textSize(16);
        text('Progress bar', 5, 0);
        noStroke();
        fill(0, 255, 0);
        rect(0, 10, this.score, 18);
        noFill();
        strokeWeight(4);
        stroke(51);
        rect(0, 10, 100, 20);
        fill(50);
        strokeWeight(1);
        textFont('Helvetica');
        textSize(16);
        text(this.scoreText, 0, 50);
        pop();
    }

    drawBrain() {
        const w = this.brainChartWidth;
        const h = this.brainChartHeight;
        push();
        translate(this.x + 120, this.y);
        textSize(16);
        text('Best player neural network visualisation', 60, 0);
        strokeWeight(1);
        stroke(51);
        translate(0, 5);
        rect(0, 0, w, h);
        if (this.chartBrainElements.length === 0) {
            textSize(16);
            text('Data shows after first generation', 80, 130);
        } else {
            this.chartBrainElements.forEach(e => e.draw());
        }
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
        push();
        translate(this.x + 530, this.y);
        textSize(16);
        text('Progress chart for finish players', 80, 0);
        strokeWeight(1);
        stroke(51)
        translate(0, 5);
        rect(0, 0, 400, 250);
        const len = this.progressVals.length;
        let lastProgress = 0;
        if (len === 0) {
            textSize(16);
            text('Data shows after finish track', 100, 130);
        } else {
            const columnWidth = 400 / len;
            let chartStart = 0;
            const maxValue = this.progressVals[0];
            let prevValue;
            for (let i = 0; i < len; i++) {
                const columnHeight = norm(this.progressVals[i], 0, maxValue) * 150;

                if (prevValue && prevValue > this.progressVals[i]) {
                    fill(11, 102, 35);
                    lastProgress = 0;
                } else {
                    fill(249, 215, 28);
                    lastProgress += 1;
                }
                noStroke();
                rect(chartStart, 250 - columnHeight, columnWidth, columnHeight);
                chartStart += columnWidth;
                prevValue = this.progressVals[i];
            }
        }
        if(len > 0) {
            const firstTime = this.progressVals[0];
            const lastTime = this.progressVals[len-1];
            let progress = (firstTime / lastTime -1)* 100;
            progress = roundWeight(progress, 2);
            textSize(16);
            fill(11, 102, 35);
            text('Progress ' + progress + '%', 410, 20);
            fill(0);
            text('Last progr. :' + lastProgress + ' gen.', 410, 40);
        }
        pop();
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