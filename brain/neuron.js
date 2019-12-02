class Neuron {
    constructor(inputs) {
        this.weights = this.createInputs(inputs);
        this.bias = 0;
        this.output = 0;
    }

    createInputs(inputs) {
        let weights = []
        for (let i = 0; i < inputs; i++) {
            weights.push(0);
        }
        return weights;
    }

    prepareOutputs(inputs) {
        const x = this.calcOutput(inputs);
        this.output = 1 / (1 + Math.exp(-x));
    }

    calcOutput(inputs) {
        let sum = 0;
        for (let i = 0; i < this.weights.length; i++) {
            sum += this.weights[i] * inputs[i];
        }
        return sum + this.bias;
    }

    setWeights(weights, bias) {
        this.weights = weights;
        this.bias = bias;
    }
}