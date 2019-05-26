import util from './LogicUtilities';
import Population from "./Population";
import Route from "./Route";

class GeneticAlgorithm {

    constructor(population, subsetSize) {
        this.population = population;
        this.subsetSize = subsetSize;
    }

    //BARGIELA CODE

    evolvePopulation() {
        let nextGen = new Population(this.population.origin, this.population.target, this.population.beaconList,
            this.population.mutationRate, this.population.size, false);
        nextGen.setRoute(0, this.population.getFittest());

        //Crossover
        for (let i = 1; i < this.population.size; i++) {
            let parent1 = this.routeSelector(this.population);
            let parent2 = this.routeSelector(this.population);

            //Generate child from parents
            let child = this.crossover(parent1, parent2);
            nextGen.setRoute(i, child);
        }
        //Mutation
        for (let i = 1; i < nextGen.size; i++) {
            this.mutate(nextGen.population[i], nextGen.beaconList, nextGen.mutationRate);
        }
        //We return the offspring of the initial set

        return nextGen;
    }

    routeSelector(origin) {
        let routeSelection = new Population(this.population.origin, this.population.target, this.population.beaconList,
            this.population.mutationRate, this.subsetSize, false);
        let fittest;
        for (let i = 0; i < this.subsetSize; i++) {
            let r = util.randomInt(0, origin.size - 1);
            routeSelection.setRoute(i, origin.population[r]);
        }
        fittest = routeSelection.getFittest();
        return fittest;
    }

    // One-point crossover from the boss himself
    crossover(parent1, parent2) {

        // Initialise new child
        const child = new Route(null, null, null, false);
        //const midpoint = util.randomInt(0, this.beacons.length - 1);
        let crossoverPoint = util.matchingPosition(parent1, parent2);

        crossoverPoint === -1 ? crossoverPoint = util.randomInt(0, parent1.beacons.length - 1) : null;

        // Cross Route from two parents from each side of midpoint
        for (let i = 0; i < parent1.beacons.length; i++) {
            if(i < crossoverPoint) {
                child.beacons[i] = parent1.beacons[i];
            }
        }
        // We find cities in parent2 which have not been copied into child and
        // we add them to the offspring in order
        for (let i = 0; i < parent2.beacons.length; i++) {
            if(!util.containsBeacon(child.beacons, parent2.beacons[i])) {
                child.beacons.push(parent2.beacons[i])
            }
        }

        return child;
    }

    // The mutation method uses mutationRate to decide if a position of the route is
    // swapped with another random position in the route.
    mutate (route, mutationRate) {
        for (let i = 0; i < route.beacons.length; i++) {
            if (Math.random() < mutationRate) {
                let p = util.randomInt(0, route.beacons.length - 1);
                let beacon1 = route.beacons[i];
                let beacon2 = route.beacons[p];
                //Mutation
                route.setRoute(i, beacon2);
                route.setRoute(p, beacon1);
            }
        }
    }
}

export default GeneticAlgorithm;


