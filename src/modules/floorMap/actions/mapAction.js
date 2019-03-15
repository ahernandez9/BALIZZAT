export const downloadMap = () => async (dispatch) => {

    /*
    =============================================================================================================

    Para dibujar un triangulo lo que hacemos es calcular el area del mismo dados los tres vértices y luego dibujamos tres
    triangulos con el punto que queremos calcular si esta dentro del triangulo y los tres vertices. Si el area total del
    triangulo es igual a la suma de los tres triangulos que hemos sacado a partir del punto , el punto esta dentro.

    ================================================================================================================
     */

    function calculateTriangleArea(apexA, apexB, apexC) {

        let vectorAB = {x: apexB.x - apexA.x, y: apexB.y - apexA.y};
        let vectorAC = {x: apexC.x - apexA.x, y: apexC.y - apexA.y};
        let vectorNormalAB = {x: vectorAB.y, y: -vectorAB.x};

        return Math.abs((vectorNormalAB.x * vectorAC.x) + (vectorNormalAB.y * vectorAC.y))/2
    }

    function isPointInTriangle(apexA, apexB, apexC, point) {
        // let denominator = ((apexB.y - apexC.y) * (apexA.x - apexC.x) + (apexC.x - apexB.x) * (apexA.y - apexC.y));
        //
        // let alpha = ((apexB.y - apexC.y) * (point.x - apexC.x) + (apexC.x - apexB.x) * (point.y - apexC.y)) / denominator;
        //
        // let beta = ((apexC.y - apexA.y) * (point.x - apexC.x) + (apexA.x - apexC.x) * (point.y - apexC.y)) / denominator;
        //
        // let gamma = 1.0 - alpha - beta;
        //
        // return (0 <= alpha&& 0 <= beta && 0 <= gamma) ? true : isPointInEdgeTriangule(apexA, apexB, apexC, point);

        let area = calculateTriangleArea(apexA, apexB , apexC);
        let area1 = calculateTriangleArea(point, apexB, apexC);
        let area2 = calculateTriangleArea(apexA, point, apexC);
        let area3 = calculateTriangleArea(apexA, apexB, point);

        return area === (area1 +  area2 + area3);


    }


    // ===============================================================================================================================
    // Fórmula general para poner RECTANGULOS en el mapa: Debemos localizar tres puntos del rectangulo , como en la siguiente figura:
    // punto B|---------------|
    //        |               |  RECORDAR QUE EL EJE Y ESTA AL REVES, EMPIEZA EN EL PUNTO MÁS GRANDE Y ACABA EN [0,0]
    //        |               |
    //        |               |
    // punto A|---------------|Punto C
    //
    // Una vez tenemos esos punto podemos la siguiente condición if en el constructor del mapa:
    //
    //
    // ===========================================================================================================================
    function isPointInRectangle(apexA, apexB, apexC, point) {
        return (apexA.y <= point.y) && (point.y <= apexB.y) && (point.x >= apexA.x) && (point.x <= apexC.x);
    }

    let map = [];
    for (let row = 19; row >= 0; row--) {
        let rowMap = [];
        for (let column = 0; column < 36; column++) {
            isPointInRectangle({x: 0, y: 8}, {x: 0, y: 17}, {x: 15, y: 8}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;

            isPointInTriangle({x: 0, y: 0}, {x: 0, y: 35}, {x: 13, y: 35}, {
                x: row,
                y: column
            }) ? rowMap[column] = 0 : null;

            isPointInTriangle({x: 8, y:25 }, {x: 11, y: 25}, {x: 11, y: 35}, {
                x: row,
                y: column
            }) ? rowMap[column] = 0 : null;

            isPointInTriangle({x: 11, y: 25}, {x: 11, y: 35},{x: 15, y: 35},   {
                x: row,
                y: column
            }) ? rowMap[column] = 0 : null;

            rowMap[column] !== 0 ? rowMap[column] = 1 : null;


        }
        map[row] = rowMap;
    }
    dispatch({
        type: 'DOWNLOAD_MAP',
        payload: map
    })
};


// Descarga las posiciones absolutas de las balizas en el mapa. Cualquier modificación en nombre o posición HACERLA AQUI
export const downloadBeaconList = () => async (dispatch) => {
    let beaconsList = {
        "BlueUp-04-025410": {x: 19, y: 7, distance: NaN, nearbyBeacons: ["BlueUp-04-025411", "BlueUp-04-025412", "BlueUp-04-025413"]},
        "BlueUp-04-025411": {x: 7, y: 21, distance: NaN, nearbyBeacons: ["BlueUp-04-025410", "BlueUp-04-025412"]},
        "BlueUp-04-025412": {x: 17, y: 35, distance: NaN, nearbyBeacons: ["BlueUp-04-025410", "BlueUp-04-025411"]},
        //Nuevos de pasillo y tal
        "BlueUp-04-025413": {x: 24, y: 0, distance: NaN, nearbyBeacons: ["BlueUp-04-025410", "BlueUp-04-025414"]},
        "BlueUp-04-025414": {x: 25, y: 20, distance: NaN, nearbyBeacons: ["BlueUp-04-025413", "BlueUp-04-025415", "BlueUp-04-025422"]},
        "BlueUp-04-025415": {x: 30, y: 40, distance: NaN, nearbyBeacons: ["BlueUp-04-025414", "BlueUp-04-025416", "BlueUp-04-025417", "BlueUp-04-025422", "BlueUp-04-025418"]},
        "BlueUp-04-025416": {x: 50, y: 30, distance: NaN, nearbyBeacons: ["BlueUp-04-025415", "BlueUp-04-025417", "BlueUp-04-025418"]},
        "BlueUp-04-025417": {x: 38, y: 0, distance: NaN, nearbyBeacons: ["BlueUp-04-025415", "BlueUp-04-025416"]},
        //Nuevo modulaso 2.0 pa mujeres
        "BlueUp-04-025418": {x: 45, y: 40, distance: NaN, nearbyBeacons: ["BlueUp-04-025416", "BlueUp-04-025419", "BlueUp-04-025420"]},
        "BlueUp-04-025419": {x: 35, y: 50, distance: NaN, nearbyBeacons: ["BlueUp-04-025418", "BlueUp-04-025420", "BlueUp-04-025421"]},
        "BlueUp-04-025420": {x: 48, y: 70, distance: NaN, nearbyBeacons: ["BlueUp-04-025418", "BlueUp-04-025419", "BlueUp-04-025421"]},
        "BlueUp-04-025421": {x: 30, y: 70, distance: NaN, nearbyBeacons: ["BlueUp-04-025419", "BlueUp-04-025420", "BlueUp-04-025422"]},
        "BlueUp-04-025422": {x: 25, y: 50, distance: NaN, nearbyBeacons: ["BlueUp-04-025421", "BlueUp-04-025415", "BlueUp-04-025414"]}
    };
    // let beaconsList = {
    //     "AC:23:3F:26:0B:6F": {x: 19, y: 7, distance: NaN},
    //     "AC:23:3F:27:0A:D4": {x: 7, y: 21, distance: NaN},
    //     "AC:23:3F:27:0A:E4": {x: 17, y: 35, distance: NaN}
    // };
    console.log("BeaconsList: ", beaconsList);

    dispatch({
        type: 'DOWNLOAD_BEACONLIST',
        payload: beaconsList
    })
};

//Devolvemos el valor anterior al mapa y actualizamos la nueva posición.
export const updatePosition = (position, center) => async (dispatch, getState) => {
    if (position !== undefined) {
        // console.log("Green point", center);
        // console.log("Position point", position);
        let newMap = getState().MapReducer.plan;
        let prevPosition = getState().MapReducer.prevPosition;
        if (prevPosition.length > 0) {
            prevPosition.forEach((oldPosition) => {
                newMap[oldPosition[1]][oldPosition[2]] = oldPosition[0];
            });
        }
        prevPosition = [];
        center !== null && newMap[center[0]][center[1]] !== 0 ? prevPosition[0] = [newMap[center[0]][center[1]], center[0], center[1]] : null;
        // Posicion 0 = valor del mapa, posición 1 = eje x, posicion 2 = eje Y
        for (let i = 1; i < position.length; i++) {
            prevPosition[i] = [newMap[position[i][0]][position[i][1]], position[i][0], position[i][1]];
            newMap[position[i][0]][position[i][1]] = 5;
        }
        center !== null && newMap[center[0]][center[1]] !== 0 ? newMap[center[0]][center[1]] = 6 : null;
        console.log("PrevPosition: ", prevPosition);
        // console.log("Vamos a ver: ", prevPosition);
        // console.log("NewMap : ", newMap);
        // console.log("PrevPosition : ",prevPosition);
        dispatch({
            type: 'UPDATE_MAP',
            payload: {newMap: newMap, prevPosition: prevPosition}
        })
    }
};