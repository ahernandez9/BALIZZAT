import util from './RenderUtilities';

/*
 * Ruta comprendida entre dos puntos de un array bidimensional con ciertas restricciones
 * Solo se puede transitar por puntos cuyo valor en el array sea 1
 * No se puede pasar dos veces por el mismo punto
 */

class RenderRoute {
    constructor(map, origin, target, newRouteNeeded){

        // The genetic sequence
        this.positions = [];
        this.fitness = 0;

        // Random RenderRoute generated
        if (newRouteNeeded) {
            //TODO - creamos inicialmente un array de posiciones vacias, pero de qué longitud?
            //this.positions = Array(map.length).fill(null);
            this.positions = this.generateRoute(map, origin, target);
        }
    }

    generateRoute(map, origin, target) {
        let routeTrial = util.newRoute(map, origin, target);
        while (routeTrial == null) {
            routeTrial = util.newRoute(map, origin, target);
        }
        console.log(routeTrial);
        return routeTrial;
    }

    // Fitness function (returns integer with total number of positions transitioned)
    calculateTotalFitness() {

        this.fitness = this.positions.length;
    }

    //ESTO HAY QUE CAMBIARLO JODEEEEEEEEEO
    // Cross LogicRoute with partner to produce child
    // Select the first coincidence in the route beacons and cross the routes using that point. Probability?
    crossover(partner) {

        // Initialise new child
        const child = new LogicRoute(null, null, null, false);
        //const midpoint = util.randomInt(0, this.beacons.length - 1);
        const crossoverPoint = util.matchingPosition(this, partner);

        // Cross LogicRoute from two parents from each side of midpoint
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

export default RenderRoute;