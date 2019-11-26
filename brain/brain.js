class Brain {
    constructor(inputs, layer1, layer2, outputs) {
        this.inputs = inputs;
        this.layer1 = this.createLayer(inputs,layer1);
        this.layer2 = this.createLayer(layer1, layer2);
        this.outputs = this.createLayer(layer2, outputs);
    }

    createLayer (inputs, nodes) {
        let layer = [];
        for(let i = 0; i < nodes; i++) {
            layer.push(new Neuron(inputs));
        }
        return layer;
    }
    
    initRandomWeights() {
        this.layer1 = this.prepareRandomWeightsForLayer(this.layer1);
        this.layer2 = this.prepareRandomWeightsForLayer(this.layer2);
        this.outputs = this.prepareRandomWeightsForLayer(this.outputs);
    }

    prepareRandomWeightsForLayer(layer) {
        for(let i = 0; i < layer.length; i++) {
            const weights = layer[i].weights.length;
            for(let j = 0; j < weights; j++) {
                layer[i].weights[j] = (Math.floor(Math.random()*20)/10-1);
            }
        }
        return layer;
    }

    deliverInputs(inputs) {
        this.layer1.forEach(n => n.prepareOutputs(inputs));
        const inputs2 = this.layer1.map(n => n.output);

        this.layer1.forEach(n => n.prepareOutputs(inputs2));
        const inputs3 = this.layer1.map(n => n.output);

        this.outputs.forEach(n => n.prepareOutputs(inputs3));
        return this.outputs.map(n => n.output);
    }

    getAllWeights() {
        const weights = [];
        let ws = this.getWeights(this.layer1);
        weights.push(ws);
        ws = this.getWeights(this.layer2);
        weights.push(ws);
        ws = this.getWeights(this.outputs);
        weights.push(ws);

        return weights.flat();
    }

    getWeights(layer) {
        let w = [];
        for(let i = 0; i < layer.length; i++) {
            const weights = layer[i].weights.length;
            for(let j = 0; j < weights; j++) {
                w.push(layer[i].weights[j]);
            }
        }
        return w;
    }
}