class MutationService {
    constructor(conf, carConf, newBrainFc) {
        this.conf = conf;
        this.carConf = carConf;
        this.newBrainFc = newBrainFc;
    }

    getNextGeneration(allPlayers) {
        const bestPlayer = allPlayers.splice(0, 1)[0];
        const bestWeights = bestPlayer.brain.getAllWeights();

        let newBestCar = new Car(this.carConf);
        newBestCar.color = 'rgba(255,0,0, 0.25)'
        let newBestBrain = this.newBrainFc();
        newBestBrain.setWeights(bestWeights);

        let newPlayers = [];
        newPlayers.push(new Player(newBestCar, newBestBrain));
        newPlayers.push(this.getMutateNewPlayers(bestPlayer, this.conf.roughAmount, this.conf.roughChange));
        newPlayers.push(this.getMutateNewPlayers(bestPlayer, this.conf.midAmount, this.conf.midChange));
        newPlayers.push(this.getMutateNewPlayers(bestPlayer, this.conf.precAmount, this.conf.precChange));

        let restBestPlayers = allPlayers.splice(0, this.conf.restPlayers);
        newPlayers.push(this.getMutateRestPlayer(restBestPlayers, this.conf.restPlayersAmount, this.conf.midChange));

        newPlayers.push(this.getRandomPlayers(this.conf.randomAmount));
        return newPlayers.flat();
    }

    getMutateNewPlayers(player, amount, change) {
        let newPlayers = []
        for (let i = 0; i < amount; i++) {
            newPlayers.push(this.getMutatePlayer(player, change));
        }
        return newPlayers;
    }

    getMutateRestPlayer(players, amount, change) {
        let newPlayers = [];
        const modulo = players.length;
        for (let i = 0; i < amount; i++) {
            newPlayers.push(this.getMutatePlayer(players[i % modulo], change));
        }
        return newPlayers;
    }

    getMutatePlayer(player, change) {
        let newWeights = this.mutate(player, change);
        let car = new Car(this.carConf);
        let brain = this.newBrainFc();
        brain.setWeights(newWeights);
        return new Player(car, brain);
    }

    getRandomPlayers(amount) {
        let newPlayers = [];
        for (let i = 0; i < amount; i++) {
            let car = new Car(this.carConf);
            let brain = this.newBrainFc();
            brain.initRandomWeights();
            newPlayers.push(new Player(car, brain));
        }
        return newPlayers;
    }

    mutate(player, change) {
        let weights = player.brain.getAllWeights();
        for (let i = 0; i < weights.length; i++) {
            const mutateChance = Math.random();
            if (mutateChance < 0.2) {
                weights[i] -= change;
            } else if (mutateChance < 0.4) {
                weights[i] += change;
            } else if (mutateChance < 0.5) {
                weights[i] = this.getRandomWeight();
            }
        }
        return weights;
    }

    getRandomWeight() {
        return this.roundWeight(Math.random() * 2 - 1, 2);
    }

    roundWeight(n, k) {
        var factor = Math.pow(10, k + 1);
        n = Math.round(Math.round(n * factor) / 10);
        return n / (factor / 10);
    }
}