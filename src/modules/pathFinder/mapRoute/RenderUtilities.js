const utils = {

    newRoute: function(map, origin, target){
        /**
         * Localizamos las posiciones origen y destino, y a partir de ellas montamos rutas aleatorias recorriendo
         * solo las posiciones colindantes no recorridas de cada uno.
         **/
        //La primera posicion es la unica que tiene 4 posibilidades, las otras tienen 3 porque vienen de otra
        // let isFirstPosition = true;
            //Creamos la ruta vacia y añadimos el primer elemento
        let route = [];
        let currentPosition = origin;
        route.push(currentPosition);
        let nextPosition = null;

        //Vamos añadiendo beacons a la ruta hasta llegar al beacon target
        while (!this.comparePositions(currentPosition, target)) {
            nextPosition = this.nextPosition(map, currentPosition, target/*, relativeSituation*/);
            console.log('Next position: ', nextPosition);
            route.push(nextPosition);
            currentPosition = nextPosition;
        }

        return route;
    },

    getPosibilities: function(map, position/*, relativeSituation*/) {
        let posibilities = [];
        console.log('position', position);
        // map[position.x + 1] && map[position.x + 1][position.y] && map[position.x + 1][position.y] === 1 ? posibilities.push(map[position.x + 1][position.y]) : null;
        // map[position.x - 1] && map[position.x - 1][position.y] && map[position.x + 1][position.y] === 1 ? posibilities.push(map[position.x - 1][position.y]) : null;
        // map[position.x] && map[position.x][position.y + 1] && map[position.x + 1][position.y] === 1 ? posibilities.push(map[position.x][position.y + 1]) : null : null : null;
        // map[position.x] && map[position.x][position.y - 1] && map[position.x + 1][position.y] === 1 ? posibilities.push(map[position.x][position.y - 1]) : null : null : null;
        // //Abajo
        // // if(relativeSituation === 3 || relativeSituation === 4) {
        //     if (map[position.x + 1] !== undefined) {
        //         if (map[position.x + 1][position.y] !== undefined) {
        //             if (map[position.x + 1][position.y] !== 0) {
        //                 posibilities.push({x: position.x + 1, y: position.y})
        //             }
        //         }
        //     }
        // // }
        // //Arriba
        // // if (relativeSituation === 1 || relativeSituation === 2) {
        //     if (map[position.x - 1] !== undefined) {
        //         if (map[position.x - 1][position.y] !== undefined) {
        //             if (map[position.x - 1][position.y] !== 0) {
        //                 posibilities.push({x: position.x - 1, y: position.y})
        //             }
        //         }
        //     }
        // // }
        // //A la derecha
        // // if (relativeSituation === 2 || relativeSituation === 4) {
        //     if (map[position.x] !== undefined) {
        //         if (map[position.x][position.y + 1] !== undefined) {
        //             if (map[position.x][position.y + 1] !== 0) {
        //                 posibilities.push({x: position.x, y: position.y + 1})
        //             }
        //         }
        //     }
        // // }
        // //A la izquierda
        // // if (relativeSituation === 1 || relativeSituation === 3) {
        //     if (map[position.x] !== undefined) {
        //         if (map[position.x][position.y - 1] !== undefined) {
        //             if (map[position.x][position.y - 1] !== 0) {
        //                 posibilities.push({x: position.x, y: position.y - 1})
        //             }
        //         }
        //     }
        // // }
        map[position.x + 1] !== undefined && map[position.x + 1][position.y] !== undefined && map[position.y + 1][position.x] === 1 ?
            posibilities.push(map[position.x + 1][position.y]) : null;
        map[position.x - 1] !== undefined && map[position.x - 1][position.y] !== undefined  && map[position.x + 1][position.y] === 1 ?
            posibilities.push(map[position.x - 1][position.y]) : null;
        map[position.x] !== undefined && map[position.x][position.y + 1] !== undefined && map[position.x + 1][position.y] === 1 ?
            posibilities.push(map[position.x][position.y + 1]) : null;
        map[position.x] !== undefined && map[position.x][position.y - 1] !== undefined && map[position.x + 1][position.y] === 1 ?
            posibilities.push(map[position.x][position.y - 1]) : null;
        return posibilities
    },

    //Elegimos una posicion aleatoria TRANSITABLE que salga de la posicion actual
    nextPosition: function(map, position, target/*, relativeSituation*/) {
        //Sacamos las 4 posiciones pegadas a la actual
        let posibilities = this.getPosibilities(map, position);
        console.log(posibilities);

        //Elegimos una que nos acerque al objetivo
        let distance = 10000000;
        let nextPosition = {};
        for (let posibility of posibilities) {
            console.log('posibility: ', posibility);
            let newDistance = this.manhattanDistance(posibility, target);
            if (newDistance < distance) {
                distance = newDistance;
                nextPosition = posibility
            }
        }
        return nextPosition;
    },

    comparePositions: function (position1, position2) {
        return position1.x === position2.x && position1.y === position2.y;
    },

    manhattanDistance: function(from, to) {
        return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
    }
};

export default utils;