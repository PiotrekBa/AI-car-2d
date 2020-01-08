class MutationService {
    constructor(conf, carConf, playersAmount) {
        this.conf = conf;
        this.carConf = carConf;
        this.playersAmount = playersAmount;
    }

    getNextGeneration(allPlayers, isFinished) {
        if(this.conf.useAccuracy && isFinished) {
            return this.getAccuracyNextGeneration(allPlayers);
        } else {
            return this.getNormalNextGeneretion(allPlayers);
        }
    }

    getAccuracyNextGeneration(allPlayers) {
        const bestPlayer = allPlayers.splice(0, 1)[0];
        const bestWeights = bestPlayer.brain.getAllWeights();

        let newBestCar = new Car(this.carConf);
        newBestCar.color = 'rgba(255,0,0, 0.25)'
        let newBestBrain = getNewBrain();
        newBestBrain.setWeights(bestWeights);

        let newPlayers = [];
        newPlayers.push(new Player(newBestCar, newBestBrain));
        newPlayers.push(this.getMutateNewPlayers(bestPlayer, 89, this.conf.accuracyChange));
        newPlayers.push(this.getRandomPlayers(this.playersAmount - newPlayers.flat().length));
        return newPlayers.flat();
    }

    getNormalNextGeneretion(allPlayers) {
        const bestPlayer = allPlayers.splice(0, 1)[0];
        const bestWeights = bestPlayer.brain.getAllWeights();

        let newBestCar = new Car(this.carConf);
        newBestCar.color = 'rgba(255,0,0, 0.25)'
        let newBestBrain = getNewBrain();
        newBestBrain.setWeights(bestWeights);

        let newPlayers = [];
        newPlayers.push(new Player(newBestCar, newBestBrain));
        newPlayers.push(this.getMutateNewPlayers(bestPlayer, this.conf.roughAmount, this.conf.roughChange));
        newPlayers.push(this.getMutateNewPlayers(bestPlayer, this.conf.midAmount, this.conf.midChange));
        newPlayers.push(this.getMutateNewPlayers(bestPlayer, this.conf.precAmount, this.conf.precChange));

        let restBestPlayers = allPlayers.splice(0, this.conf.restPlayers);
        newPlayers.push(this.getMutateRestPlayer(restBestPlayers, this.conf.restPlayersAmount, this.conf.midChange));

        newPlayers.push(this.getRandomPlayers(this.playersAmount - newPlayers.flat().length));
        return newPlayers.flat();
    }

    getMutateNewPlayers(player, percent, change) {
        let newPlayers = [];
        const amount = this.calcAmount(percent);
        for (let i = 0; i < amount; i++) {
            newPlayers.push(this.getMutatePlayer(player, change));
        }
        return newPlayers;
    }

    getMutateRestPlayer(players, percent, change) {
        let newPlayers = [];
        const amount = this.calcAmount(percent);
        const modulo = players.length;
        for (let i = 0; i < amount; i++) {
            newPlayers.push(this.getMutatePlayer(players[i % modulo], change));
        }
        return newPlayers;
    }

    getMutatePlayer(player, change) {
        let newWeights = this.mutate(player, change);
        let car = new Car(this.carConf);
        let brain = getNewBrain();
        brain.setWeights(newWeights);
        return new Player(car, brain);
    }

    calcAmount(percent) {
        return roundWeight(this.playersAmount*percent/100, 0);
    }

    getRandomPlayers(amount) {
        let newPlayers = [];
        for (let i = 0; i < amount; i++) {
            let car = new Car(this.carConf);
            let brain = getNewBrain();
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
                weights[i] = getRandomWeight();
            }
        }
        return weights;
    }
}