import {connect} from "react-redux";
import util from './LogicUtilities';
import {downloadBeaconList} from "../../floorMap/actions/mapAction";

class Route {
    constructor(beaconList, origin, target, newRouteNeeded){

        // The genetic sequence
        this.beacons = [];
        this.fitness = 0;

        // Random Route generated from characters
        if (newRouteNeeded) {
            this.beacons = Array(beaconList.length).fill(null);
            this.beacons = this.generateRoute(beaconList, origin, target);
        }
    }

    generateRoute(beaconList, origin, target) {
        let routeTrial = util.newRoute(beaconList, origin, target);
        while (routeTrial == null) {
            routeTrial = util.newRoute(beaconList, origin, target);
        }
        return routeTrial;
    }

    // Fitness function (returns floating point total distance of the route)
    calculateTotalFitness() {
        let distance = 0;
        for (let i = 0; i < this.beacons.length - 1; i++) {
            distance += Route.calculateDualFitness(this.beacons[i], this.beacons[i+1])
        }

        this.fitness = distance;
    }

    // Fitness function (returns floating point distance between two beacons)
    static calculateDualFitness(origin, target) {
        return util.manhattanDistance(origin,target);
    }

    //ESTO HAY QUE CAMBIARLO JODEEEEEEEEEO
    // Cross Route with partner to produce child
    // Select the first coincidence in the route beacons and cross the routes using that point. Probability?
    crossover(partner) {

        // Initialise new child
        const child = new Route(null, null, null, false);
        //const midpoint = util.randomInt(0, this.beacons.length - 1);
        const crossoverPoint = util.matchingPosition(this, partner);

        // Cross Route from two parents from each side of midpoint
        this.beacons.forEach((beacon, i) => {

            if (i > crossoverPoint) {
                child.beacons[i] = this.beacons[i];
            } else {
                child.beacons[i] = partner.beacons[i];
            }
        });

        return child;
    }

    //ESTO HAY QUE CAMBIARLO JODEEEEEEEEEO
    // picks a new random character based on a mutation probability
    // Mutamos la ruta en funcion de una probabilidad, elegimos una posicion de la ruta y reconstruimos la misma hasta el destino
    mutate(beaconList, mutationRate) {
        if (Math.random(0, 1) < mutationRate) {
            let mutationPoint = util.randomInt(0, this.beacons.length - 1);
            let newBeacons = this.beacons.slice();
            this.beacons = util.mutateRoute(beaconList, newBeacons, mutationPoint);
        }
    }
}

export default Route;