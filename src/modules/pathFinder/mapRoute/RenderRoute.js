import utils from './RenderUtilities';

/*
 * Ruta comprendida entre dos puntos de un array bidimensional con ciertas restricciones
 * Solo se puede transitar por puntos cuyo valor en el array sea 1
 * No se puede pasar dos veces por el mismo punto
 */

class RenderRoute {

    constructor(map, origin, target){
        // Positions of the route
        this.positions = this.generateRoute(map, origin, target);
    }

    generateRoute(map, origin, target) {
        let routeTrial = utils.newRoute(map, origin, target);
        while (routeTrial == null) {
            routeTrial = utils.newRoute(map, origin, target);
        }
        console.log(routeTrial);
        return routeTrial;
    }
}

export default RenderRoute;