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

    newRoute: function(beaconList, origin, target){
        /**
         * Localizamos los beacon origen y destino, y a partir de ellos montamos rutas aleatorias usando los
         * nearbyBeacons de cada uno.
         **/
        //Creamos la ruta vacia y añadimos el primer elemento
        let route = [];
        let visitedBeacons = [];
        let currentBeacon = origin;
        route.push(currentBeacon);
        let nextBeacon = null;

        //Vamos añadiendo beacons a la ruta hasta llegar al beacon target
        while (!this.compareBeacons(currentBeacon, target)) {
            nextBeacon = this.nextBeacon(beaconList, currentBeacon);
            visitedBeacons.push(nextBeacon);

            //Solo añadimos un nuevo beacon colindante en caso de que no hayamos pasado ya por el mismo
            while (this.containsBeacon(route, nextBeacon)) {
                nextBeacon = this.nextBeacon(beaconList, currentBeacon);
                visitedBeacons.push(nextBeacon);
                if (visitedBeacons.length > currentBeacon.nearbyBeacons.length) return null;
            }
            route.push(nextBeacon);
            currentBeacon = nextBeacon;
            visitedBeacons = [];
            if(route.length === beaconList.length && this.compareBeacons(currentBeacon, target)) {
                return null
            }

        }

        return route;
    },

    mutateRoute: function(beaconList, beacons, mutationPoint) {
        let newPathFromMutationPoint = this.newRoute(beaconList, beacons[mutationPoint], beacons[beacons.length - 1]);
        while (newPathFromMutationPoint == null) {
            newPathFromMutationPoint = this.newRoute(beaconList, beacons[mutationPoint], beacons[beacons.length - 1]);
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

    nextBeacon: function(beaconList, beacon) {
        let nextBeaconName = beacon.nearbyBeacons[Math.floor(Math.random()*beacon.nearbyBeacons.length)];
        return beaconList[nextBeaconName];
    },

    compareBeacons: function (beacon1, beacon2) {
        return beacon1.x === beacon2.x && beacon1.y === beacon2.y;
    },

    containsBeacon: function (visitedBeaconList, beacon) {
        return visitedBeaconList.some((element) => {
            return this.compareBeacons(element, beacon)
        }) ?  true : null;
    },

    manhattanDistance: function(from, to) {
        return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
    },

    typicalDistance: function(from, to) {
        return Math.sqrt(Math.pow((to.y - from.y), 2) + Math.pow((to.x - from.x), 2))
    }
};

export default util;