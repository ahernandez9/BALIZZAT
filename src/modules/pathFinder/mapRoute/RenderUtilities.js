const utils = {

    newRoute: function(map, origin, target){
        /**
         * Localizamos las posiciones origen y destino, y a partir de ellas buscamos la ruta óptima recorriendo
         * solo las posiciones colindantes transitables, eligiendo para cada paso la que nos acerca mas al
         * objetivo.
         **/
            //Creamos la ruta vacia y añadimos el primer elemento
        let route = [];
        let currentPosition = origin;
        route.push(currentPosition);
        let nextPosition = null;

        //Vamos añadiendo beacons a la ruta hasta llegar al beacon target
        while (!this.comparePositions(currentPosition, target)) {
            nextPosition = this.nextPosition(map, currentPosition, target);
            if (nextPosition === {}) return null; // Por que no funciona con los ternarios?
            route.push(nextPosition);
            currentPosition = nextPosition;
        }

        return route;
    },

    getPosibilities: function(map, position) {
        let posibilities = [];
        // Arriba
        (map[position.x + 1] !== undefined && map[position.x + 1][position.y] !== undefined && map[position.y + 1][position.x] !== 0) ?
            posibilities.push({x: position.x + 1, y: position.y}) : null;
        // Abajo
        (map[position.x - 1] !== undefined && map[position.x - 1][position.y] !== undefined  && map[position.x + 1][position.y] !== 0) ?
            posibilities.push({x: position.x - 1, y: position.y}) : null;
        // Derecha
        (map[position.x] !== undefined && map[position.x][position.y + 1] !== undefined && map[position.x][position.y + 1] !== 0) ?
            posibilities.push({x: position.x, y: position.y + 1}) : null;
        // Izquierda
        (map[position.x] !== undefined && map[position.x][position.y - 1] !== undefined && map[position.x][position.y - 1] !== 0) ?
            posibilities.push({x: position.x, y: position.y - 1}) : null;

        //Diagonales
        (map[position.x + 1] !== undefined && map[position.x + 1][position.y + 1] !== undefined && map[position.x + 1][position.y + 1] !== 0) ?
            posibilities.push({x: position.x + 1, y: position.y + 1}) : null;
        (map[position.x + 1] !== undefined && map[position.x + 1][position.y - 1] !== undefined && map[position.x + 1][position.y - 1] !== 0) ?
            posibilities.push({x: position.x + 1, y: position.y - 1}) : null;
        (map[position.x - 1] !== undefined && map[position.x - 1][position.y + 1] !== undefined && map[position.x - 1][position.y + 1] !== 0) ?
            posibilities.push({x: position.x - 1, y: position.y + 1}) : null;
        (map[position.x - 1] !== undefined && map[position.x - 1][position.y - 1] !== undefined && map[position.x - 1][position.y - 1] !== 0) ?
            posibilities.push({x: position.x - 1, y: position.y - 1}) : null;
        return posibilities
    },

    //Elegimos una posicion aleatoria TRANSITABLE que salga de la posicion actual
    nextPosition: function(map, position, target) {
        //Sacamos las (máximo) 8 posiciones pegadas a la actual
        let posibilities = this.getPosibilities(map, position);

        //Elegimos la que mas nos acerque al objetivo
        let distance = 10000000;
        let nextPosition = {};
        for (let posibility of posibilities) {
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