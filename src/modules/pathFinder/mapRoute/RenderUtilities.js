const util = {
    map: function(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    },

    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    matchingPosition: function(route1, route2) {
        let matchIndex = -1;
        for(let i = 0; i < route1.length; i++) {
            matchIndex = route2.some((element) => {
                return this.compareBeacons(element, route1.beacons[i])
            }) ?  i : -1;
        }
        return matchIndex;
    },

    newRoute: function(map, origin, target){
        /**
         * Localizamos las posiciones origen y destino, y a partir de ellas montamos rutas aleatorias recorriendo
         * solo las posiciones colindantes no recorridas de cada uno.
         **/
        //La primera posicion es la unica que tiene 4 posibilidades, las otras tienen 3 porque vienen de otra
        // let isFirstPosition = true;
            //Creamos la ruta vacia y añadimos el primer elemento
        let route = [];
        let visitedPositions = [];
        let currentPosition = origin;
        route.push(currentPosition);
        let nextPosition = null;

        //Vamos añadiendo beacons a la ruta hasta llegar al beacon target
        while (!this.comparePositions(currentPosition, target)) {
            nextPosition = this.nextPosition(map, currentPosition);
            visitedPositions.push(nextPosition);

            //Solo añadimos una nueva posición colindante en caso de que no hayamos pasado ya por la misma
            while (this.containsPosition(route, nextPosition)) {
                nextPosition = this.nextPosition(map, currentPosition);
                visitedPositions.push(nextPosition);

                if (visitedPositions.length > this.getPosibilities(map, nextPosition).length) return null;
            }
            // isFirstPosition = false;
            route.push(nextPosition);
            currentPosition = nextPosition;
            visitedPositions = [];

            if(/*route.length === map.length && */this.compareBeacons(currentPosition, target)) {
                return null
            }
        }

        return route;
    },

    mutateRoute: function(map, beacons, mutationPoint) {
        let newPathFromMutationPoint = this.newRoute(map, beacons[mutationPoint], beacons[beacons.length - 1]);
        while (newPathFromMutationPoint == null) {
            newPathFromMutationPoint = this.newRoute(map, beacons[mutationPoint], beacons[beacons.length - 1]);
        }
        let mutatedPath = [];
        for (let i = 0; i < mutationPoint; i++) {
            mutatedPath[i] = beacons[i];
        }
        for (let i = mutationPoint; i < beacons.length; i++) {
            mutatedPath[i] = newPathFromMutationPoint[i-mutationPoint];
        }
        return mutatedPath;
    },

    getPosibilities: function(map, position) {
        let posibilities = [];
        map[position.x + 1] ? map[position.x + 1][position.y] ? map[position.x + 1][position.y] === 1 ? posibilities.push(map[position.x + 1][position.y]) : null : null : null;
        map[position.x - 1] ? map[position.x - 1][position.y] ? map[position.x + 1][position.y] === 1 ? posibilities.push(map[position.x - 1][position.y]) : null : null : null;
        map[position.x] ? map[position.x][position.y + 1] ? map[position.x + 1][position.y] === 1 ? posibilities.push(map[position.x][position.y + 1]) : null : null : null;
        map[position.x] ? map[position.x][position.y - 1] ? map[position.x + 1][position.y] === 1 ? posibilities.push(map[position.x][position.y - 1]) : null : null : null;
        return posibilities
    },

    //Elegimos una posicion aleatoria TRANSITABLE que salga de la posicion actual
    nextPosition: function(map, position) {
        //Sacamos las 4 posiciones pegadas a la actual
        let posibilities = this.getPosibilities(map, position);

        //Elegimos una aleatoriamente y la devolvemos
        return posibilities[Math.floor(Math.random()*posibilities.length)];
    },

    comparePositions: function (position1, position2) {
        return position1.x === position2.x && position1.y === position2.y;
    },

    containsPosition: function (visitedBeaconList, position) {
        return visitedBeaconList.some((element) => {
            return this.compareBeacons(element, position)
        }) ?  true : null;
    },

    manhattanDistance: function(from, to) {
        return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
    }
};

export default util;