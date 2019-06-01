import util from './LogicUtilities';
import Population from "./Population";
import Route from "./Route";

class GeneticAlgorithm {

    constructor(subsetSize) {
        this.subsetSize = subsetSize;
    }

    //BARGIELA CODE

    evolvePopulation(population) {
        let nextGen = new Population(population.origin, population.target, population.beaconList,
            population.mutationRate, population.size, false);
        nextGen.setRoute(0, population.getFittest());

        //Crossover
        for (let i = 1; i < population.size; i++) {
            let parent1 = this.routeSelector(population);
            let parent2 = this.routeSelector(population);

            //Generate child from parents
            let child = this.crossover(parent1, parent2);
            nextGen.setRoute(i, child);
        }
        //Mutation
        for (let i = 1; i < nextGen.size; i++) {
            let route = this.mutate(nextGen.population[i], nextGen.beaconList, nextGen.mutationRate);
            nextGen.setRoute(i, route);
        }
        //Calculate every member's fitness
        nextGen.calcPopulationFitness();

        //We return the offspring of the initial set
        return nextGen;
    }

    routeSelector(origin) {
        let routeSelection = new Population(origin.origin, origin.target, origin.beaconList,
            origin.mutationRate, this.subsetSize, false);
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

    // Mutamos la ruta en funcion de una probabilidad, elegimos una posicion de la ruta y
    // reconstruimos la misma hasta el destino
    mutate(route, beaconList, mutationRate) {
        if (Math.random(0, 1) < mutationRate) {
            let mutationPoint = util.randomInt(0, route.beacons.length - 1);
            let newBeacons = route.beacons.slice();
            let newRoute = new Route(null, null, null, false);
            newRoute.beacons = util.mutateRoute(beaconList, newBeacons, mutationPoint);
            return newRoute
        } else {
            return route;
        }

    }
}

export default GeneticAlgorithm;


