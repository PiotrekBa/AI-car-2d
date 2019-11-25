class Brain {
    constructor(inputs, layer1, outputs) {
        this.inputs = inputs;
        this.layer1 = this.createLayer(inputs,layer1);
        // this.layer2 = this.createLayer(layer1, layer2);
        this.outputs = this.createLayer(layer1, outputs);
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
        this.outputs = this.prepareRandomWeightsForLayer(this.outputs);
    }

    prepareRandomWeightsForLayer(layer) {
        for(let i = 0; i < layer.length; i++) {
            const weights = layer[i].weights.length;
            for(let j = 0; j < weights; j++) {
                layer[i].weights[j] = Math.floor(Math.random()*10);
            }
        }
        return layer;
    }

    deliverInputs(inputs) {
        
    }
}