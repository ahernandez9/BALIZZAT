import Route from './Route';
import util from './LogicUtilities';

class Population {
    constructor(initialBeacon, finalBeacon, beaconList, m, populationSize, shouldFill) {
        this.origin = initialBeacon;
        this.target = finalBeacon;
        this.beaconList = beaconList;
        this.mutationRate = m;
        this.size = populationSize;

        // Fill population with DNA instances
        this.population = Array(populationSize).fill(null);
        if (shouldFill) {
            this.population = this.population.map(() => new Route(this.beaconList, this.origin, this.target, true));
            this.calcPopulationFitness();
        }
    }

    // Calculate fitness value for every member of the population
    calcPopulationFitness() {
        this.population.forEach(member => {
            member.calculateTotalFitness()
        });
    }

    //BARGIELA CODE
    setRoute(index, route) {
        this.population[index] = route;
    }

    getFittest() {
        let worldRecord = 1000;
        let index = 0;

        // Find the fittest member of the population
        this.population.forEach((member, i) => {
            if (member.fitness < worldRecord) {
                index = i;
                worldRecord = member.fitness;
            }
        });

        // Get best result so far
        return this.population[index];
    }
}
export default Population;