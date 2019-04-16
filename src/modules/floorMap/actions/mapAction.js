export const downloadMap = () => async (dispatch, getState) => {

    /*
    =============================================================================================================

    Para dibujar un triangulo lo que hacemos es calcular el area del mismo dados los tres vértices y luego dibujamos tres
    triangulos con el punto que queremos calcular si esta dentro del triangulo y los tres vertices. Si el area total del
    triangulo es igual a la suma de los tres triangulos que hemos sacado a partir del punto , el punto esta dentro.

    X => FILAS
    Y => COLUMNAS
    ================================================================================================================
     */

    function calculateTriangleArea(apexA, apexB, apexC) {

        let vectorAB = {x: apexB.x - apexA.x, y: apexB.y - apexA.y};
        let vectorAC = {x: apexC.x - apexA.x, y: apexC.y - apexA.y};
        let vectorNormalAB = {x: vectorAB.y, y: -vectorAB.x};

        return Math.abs((vectorNormalAB.x * vectorAC.x) + (vectorNormalAB.y * vectorAC.y))/2
    }

    function isPointInTriangle(apexA, apexB, apexC, point) {

        let area = calculateTriangleArea(apexA, apexB , apexC);
        let area1 = calculateTriangleArea(point, apexB, apexC);
        let area2 = calculateTriangleArea(apexA, point, apexC);
        let area3 = calculateTriangleArea(apexA, apexB, point);

        return area === (area1 +  area2 + area3);


    }


    // ===============================================================================================================================
    // Fórmula general para poner RECTANGULOS en el mapa: Debemos localizar tres puntos del rectangulo , como en la siguiente figura:
    // punto A|---------------| Punto C
    //        |               |
    //        |               |     RECORDAR QUE EL EJE Y ESTA AL REVES, EMPIEZA EN EL PUNTO MÁS GRANDE Y ACABA EN [0,0]
    //        |               |
    // punto B|---------------|
    //
    // Una vez tenemos esos punto podemos la siguiente condición if en el constructor del mapa:
    //
    //
    // ===========================================================================================================================
    function isPointInRectangle(apexA, apexB, apexC, point) {
        return (apexA.y <= point.y) && (point.y <= apexB.y) && (point.x >= apexA.x) && (point.x <= apexC.x);
    }

    let map = [];
    // for (let row = 19; row >= 0; row--) {
    //     let rowMap = [];
    //     for (let column = 0; column < 36; column++) {
    //         isPointInRectangle({x: 0, y: 8}, {x: 0, y: 17}, {x: 15, y: 8}, {
    //             x: column,
    //             y: row
    //         }) ? rowMap[column] = 0 : null;
    //
    //         isPointInTriangle({x: 0, y: 0}, {x: 0, y: 35}, {x: 13, y: 35}, {
    //             x: row,
    //             y: column
    //         }) ? rowMap[column] = 0 : null;
    //
    //         isPointInTriangle({x: 8, y:25 }, {x: 11, y: 25}, {x: 11, y: 35}, {
    //             x: row,
    //             y: column
    //         }) ? rowMap[column] = 0 : null;
    //
    //         isPointInTriangle({x: 11, y: 25}, {x: 11, y: 35},{x: 15, y: 35},   {
    //             x: row,
    //             y: column
    //         }) ? rowMap[column] = 0 : null;
    //
    //         rowMap[column] !== 0 ? rowMap[column] = 1 : null;
    //
    //
    //     }
    //     map[row] = rowMap;
    // }
    // for (let row = 50; row >= 0; row--) {
    //     let rowMap = [];
    //     for (let column = 0; column < 71; column++) {
    //         //Izquierda
    //         //Primero de arriba a abajo
    //         isPointInRectangle({x: 0, y: 8}, {x: 0, y: 17}, {x: 15, y: 8}, {
    //             x: column,
    //             y: row
    //         }) ? rowMap[column] = 0 : null;
    //         //Segundo de arriba a abajo
    //         isPointInRectangle({x: 7, y: 20}, {x: 7, y: 25}, {x: 35, y: 20}, {
    //             x: column,
    //             y: row
    //         }) ? rowMap[column] = 0 : null;
    //         //Tercero de arriba a abajo
    //         isPointInRectangle({x: 0, y: 30}, {x: 0, y: 40}, {x: 25, y: 30}, {
    //             x: column,
    //             y: row
    //         }) ? rowMap[column] = 0 : null;
    //
    //         //Derecha
    //         //Primero de arriba a abajo
    //         isPointInRectangle({x: 36, y: 0}, {x: 36, y: 25}, {x: 70, y: 0}, {
    //             x: column,
    //             y: row
    //         }) ? rowMap[column] = 0 : null;
    //         //Segundo de arriba a abajo
    //         isPointInRectangle({x: 35, y: 30}, {x: 35, y: 40}, {x: 60, y: 30}, {
    //             x: column,
    //             y: row
    //         }) ? rowMap[column] = 0 : null;
    //         //Tercero de arriba a abajo
    //         isPointInRectangle({x: 35, y: 41}, {x: 35, y: 44}, {x: 45, y: 41}, {
    //             x: column,
    //             y: row
    //         }) ? rowMap[column] = 0 : null;
    //         //Cuarto de arriba a abajo
    //         isPointInRectangle({x: 35, y: 48}, {x: 35, y: 50}, {x: 45, y: 48}, {
    //             x: column,
    //             y: row
    //         }) ? rowMap[column] = 0 : null;
    //
    //         isPointInTriangle({x: 0, y: 0}, {x: 0, y: 35}, {x: 13, y: 35}, {
    //             x: row,
    //             y: column
    //         }) ? rowMap[column] = 0 : null;
    //
    //         isPointInTriangle({x: 8, y:25 }, {x: 11, y: 25}, {x: 11, y: 35}, {
    //             x: row,
    //             y: column
    //         }) ? rowMap[column] = 0 : null;
    //
    //         isPointInTriangle({x: 11, y: 25}, {x: 11, y: 35},{x: 15, y: 35},   {
    //             x: row,
    //             y: column
    //         }) ? rowMap[column] = 0 : null;
    //
    //         rowMap[column] !== 0 ? rowMap[column] = 1 : null;
    //
    //
    //     }
    //     map[row] = rowMap;
    // }

    for (let row = 116; row >= 0; row--) {
        let rowMap = [];
        for (let column = 0; column < 275; column++) {
            //Primero de arriba a abajo
            isPointInRectangle({x: 0, y: 8}, {x: 0, y: 17}, {x: 15, y: 8}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Segundo de arriba a abajo
            isPointInRectangle({x: 7, y: 20}, {x: 7, y: 25}, {x: 35, y: 20}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Tercero de arriba a abajo
            isPointInRectangle({x: 0, y: 30}, {x: 0, y: 40}, {x: 25, y: 30}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;

            //Derecha
            //Primero de arriba a abajo
            isPointInRectangle({x: 36, y: 0}, {x: 36, y: 25}, {x: 70, y: 0}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Segundo de arriba a abajo
            isPointInRectangle({x: 35, y: 30}, {x: 35, y: 40}, {x: 60, y: 30}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Tercero de arriba a abajo
            isPointInRectangle({x: 35, y: 41}, {x: 35, y: 44}, {x: 45, y: 41}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Cuarto de arriba a abajo
            isPointInRectangle({x: 35, y: 48}, {x: 35, y: 50}, {x: 45, y: 48}, {
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

    //Recorremos la lista de beacons, poniendo un 7 en las posiciones del mapa que ocupan las mismas para ponerlas en negro
    let beaconlist = getState().MapReducer.beaconsList;
    for (const [beaconKey, beacon] of Object.entries(beaconlist)) {
        map[beacon.x][beacon.y] = 7;
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
        "BlueUp-04-025414": {x: 26, y: 20, distance: NaN, nearbyBeacons: ["BlueUp-04-025413", "BlueUp-04-025415", "BlueUp-04-025422"]},
        "BlueUp-04-025415": {x: 35, y: 34, distance: NaN, nearbyBeacons: ["BlueUp-04-025414", "BlueUp-04-025416", "BlueUp-04-025417", "BlueUp-04-025422", "BlueUp-04-025418"]},
        "BlueUp-04-025416": {x: 50, y: 30, distance: NaN, nearbyBeacons: ["BlueUp-04-025415", "BlueUp-04-025417", "BlueUp-04-025418"]},
        "BlueUp-04-025417": {x: 43, y: 0, distance: NaN, nearbyBeacons: ["BlueUp-04-025415", "BlueUp-04-025416"]},
        //Nuevo modulaso 2.0 pa mujeres
        "BlueUp-04-025418": {x: 47, y: 40, distance: NaN, nearbyBeacons: ["BlueUp-04-025416", "BlueUp-04-025419", "BlueUp-04-025420"]},
        "BlueUp-04-025419": {x: 41, y: 50, distance: NaN, nearbyBeacons: ["BlueUp-04-025418", "BlueUp-04-025420", "BlueUp-04-025421"]},
        "BlueUp-04-025420": {x: 48, y: 70, distance: NaN, nearbyBeacons: ["BlueUp-04-025418", "BlueUp-04-025419", "BlueUp-04-025421"]},
        "BlueUp-04-025421": {x: 30, y: 70, distance: NaN, nearbyBeacons: ["BlueUp-04-025419", "BlueUp-04-025420", "BlueUp-04-025422"]},
        "BlueUp-04-025422": {x: 26, y: 50, distance: NaN, nearbyBeacons: ["BlueUp-04-025421", "BlueUp-04-025415", "BlueUp-04-025414"]}
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
        let newMap = getState().MapReducer.plan.slice();
        let prevPosition = getState().MapReducer.prevPosition;
        if (prevPosition.length > 0) {
            prevPosition.forEach((oldPosition) => {
                newMap[oldPosition[1]][oldPosition[2]] = oldPosition[0];
            });
        }
        prevPosition = [];
        center !== null && newMap[center[0]][center[1]] !== 0 ? prevPosition[0] = [newMap[center[0]][center[1]], center[0], center[1]] : null;
        // Posicion 0 = valor del mapa, posición 1 = eje x, posicion 2 = eje Y
        for (let i = 0; i < position.length; i++) {
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

export const updateCurrentPosition = (position) => async (dispatch, getState) => {
    dispatch({
        type: 'UPDATE_POSITION',
        payload: position
    })
};

export const updateOptimalRoute = (route) => async (dispatch, getState) => {
    dispatch({
        type: 'UPDATE_ROUTE',
        payload: route
    })
};


//Actualizamos el mapa con la posicion de las balizas a 7 (negro)
export const colorPositions = (positions, color) => async (dispatch, getState) => {
    let newMap = getState().MapReducer.plan.slice();

    for (let position of positions) {
        newMap[position.x][position.y] = color;
    }

    dispatch({
        type: 'DOWNLOAD_MAP',
        payload: newMap
    })
};