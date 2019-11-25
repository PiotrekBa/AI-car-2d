class Neuron {
    constructor(inputs) {
        this.weights = this.createInputs(inputs);
    }

    createInputs(inputs) {
        let weights = []
        for(let i = 0; i < inputs; i++) {
            weights.push(0);
        }
        return weights;
    }

    calcOutput(inputs) {
        let sum = 0;
        for(let i = 0; i < this.weights.length; i++) {
            sum += this.weights[i] * inputs[i];
        }
        return sum;
    }
}