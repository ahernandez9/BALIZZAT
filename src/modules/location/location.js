import React from 'react'


export const Location = (Props) => {

    const {
        beacon1,
        beacon2,
        beacon3
    } = Props;

    // Función que recibe una posición [x,y] y una distancia d y devuelve un array con la función ( X-x)^2 + (Y-y)^2 = d^2 extendida
    // siendo  X e Y la posición exacta del usuario.

    function _firstEcuationExtended(x, y, d) {
        let minEc = [];
        minEc[0] = -2 * x; // Esta posición va multiplicada por X
        minEc[1] = x * x;
        minEc[2] = -2 * y; // Esta posición va multiplicada por Y
        minEc[3] = y * y;
        minEc[4] = d * d;
        return minEc;
    }

    function _substracMinEc(xMinEc, yMinEc) {
        let subsEc = [];
        // Representación resultado: [2x,+ 3, -2y, +3, = 4 ]
        subsEc[0] = xMinEc[0] - yMinEc[0]; // Esta posición va multiplicada por X
        subsEc[1] = xMinEc[1] - yMinEc[1];
        subsEc[2] = xMinEc[2] - yMinEc[2]; // Esta posición va multiplicada por Y
        subsEc[3] = xMinEc[3] - yMinEc[3];
        subsEc[4] = xMinEc[4] - yMinEc[4];
        return subsEc;
    }

    function _getYFromEcuation(f) {
        let yResult = [];
        yResult[0] = (f[4] - f[1] - f[3]) / f[2];
        yResult[1] = -f[0] / f[2];
        return yResult;
    }

    function triangulation(beacon1, beacon2, beacon3) {

        let minEc1 = _firstEcuationExtended(beacon1.x, beacon1.y, beacon1.distance);
        let minEc2 = _firstEcuationExtended(beacon2.x, beacon2.y, beacon2.distance);
        let minEc3 = _firstEcuationExtended(beacon3.x, beacon3.y, beacon3.distance);
        let subsEc1 = _substracMinEc(minEc1, minEc2);
        let subsEc2 = _substracMinEc(minEc2, minEc3);
        let y1 = _getYFromEcuation(subsEc1);
        let y2 = _getYFromEcuation(subsEc2);

        let X = Math.trunc((y1[0] - y2[0]) / (y2[1] - y1[1]));
        let Y = Math.trunc(y1[0] + (y1[1] * X));

        console.log("Posición calculada: ", [X, Y]);
        return [X, Y];


    }

    return (triangulation(beacon1, beacon2, beacon3))

};