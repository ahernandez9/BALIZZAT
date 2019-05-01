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

        return Math.abs((vectorNormalAB.x * vectorAC.x) + (vectorNormalAB.y * vectorAC.y)) / 2
    }

    function isPointInTriangle(apexA, apexB, apexC, point) {

        let area = calculateTriangleArea(apexA, apexB, apexC);
        let area1 = calculateTriangleArea(point, apexB, apexC);
        let area2 = calculateTriangleArea(apexA, point, apexC);
        let area3 = calculateTriangleArea(apexA, apexB, point);

        return area === (area1 + area2 + area3);
    }

    function isPointInCircle(center, radius, point) {
        return Math.pow(Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2), 2) <= Math.pow(radius, 2)
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
    // X = COLUMNAS
    // Y = FILAS
    // ===========================================================================================================================
    function isPointInRectangle(apexA, apexB, apexC, point) {
        return (apexA.y <= point.y) && (point.y <= apexB.y) && (point.x >= apexA.x) && (point.x <= apexC.x);
    }

    let map = [];
    for (let row = 116; row >= 0; row--) {
        let rowMap = [];
        for (let column = 0; column < 275; column++) {
            //Izquierda
            //Primero de arriba a abajo
            isPointInRectangle({x: 0, y: 0}, {x: 0, y: 15}, {x: 61, y: 0}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Segundo de arriba a abajo
            isPointInRectangle({x: 10, y: 24}, {x: 10, y: 34}, {x: 61, y: 24}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Tercero de arriba a abajo
            isPointInRectangle({x: 10, y: 36}, {x: 10, y: 45}, {x: 61, y: 36}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Cuarto de arriba a abajo
            isPointInRectangle({x: 10, y: 54}, {x: 10, y: 64}, {x: 61, y: 54}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Quinto de arriba a abajo
            isPointInRectangle({x: 10, y: 66}, {x: 10, y: 76}, {x: 61, y: 66}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Sexto de arriba a abajo
            isPointInRectangle({x: 10, y: 85}, {x: 10, y: 95}, {x: 61, y: 85}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Septimo de arriba a abajo
            isPointInRectangle({x: 10, y: 97}, {x: 10, y: 106}, {x: 61, y: 97}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;


            //Segunda bloque de dos + escalerita
            //Primero de arriba izq
            isPointInRectangle({x: 63, y: 10}, {x: 63, y: 20}, {x: 91, y: 10}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Segundo de arriba izq
            isPointInRectangle({x: 63, y: 22}, {x: 63, y: 32}, {x: 91, y: 22}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Primero de arriba der
            isPointInRectangle({x: 94, y: 10}, {x: 94, y: 20}, {x: 122, y: 10}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Segundo de arriba der
            isPointInRectangle({x: 94, y: 22}, {x: 94, y: 32}, {x: 122, y: 22}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;

            //ESCALERITA
            isPointInRectangle({x: 49, y: 83}, {x: 49, y: 105}, {x: 55, y: 83}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 55, y: 81}, {x: 55, y: 103}, {x: 61, y: 81}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 63, y: 79}, {x: 63, y: 101}, {x: 69, y: 79}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 69, y: 77}, {x: 69, y: 99}, {x: 74, y: 77}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 74, y: 75}, {x: 74, y: 97}, {x: 80, y: 75}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 80, y: 74}, {x: 80, y: 95}, {x: 85, y: 74}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 85, y: 72}, {x: 85, y: 94}, {x: 91, y: 72}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 94, y: 70}, {x: 94, y: 91}, {x: 99, y: 70}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 99, y: 69}, {x: 99, y: 90}, {x: 105, y: 69}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 105, y: 67}, {x: 105, y: 88}, {x: 110, y: 67}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 110, y: 65}, {x: 110, y: 86}, {x: 116, y: 65}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 116, y: 63}, {x: 116, y: 84}, {x: 121, y: 63}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;

            //Izquierda
            //Primero de arriba a abajo
            isPointInRectangle({x: 124, y: 10}, {x: 124, y: 20}, {x: 187, y: 10}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 124, y: 22}, {x: 124, y: 32}, {x: 187, y: 22}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Segundo de arriba a abajo
            isPointInRectangle({x: 124, y: 69}, {x: 124, y: 79}, {x: 187, y: 69}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 124, y: 57}, {x: 124, y: 67}, {x: 187, y: 57}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Tercero de arriba a abajo
            isPointInRectangle({x: 147, y: 53}, {x: 147, y: 57}, {x: 164, y: 53}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;

            //Derecha
            //Primero de arriba a abajo
            isPointInRectangle({x: 147, y: 32}, {x: 147, y: 35}, {x: 164, y: 32}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Segundo de arriba a abajo
            isPointInRectangle({x: 189, y: 7}, {x: 189, y: 35}, {x: 199, y: 7}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Tercero de arriba a abajo
            isPointInRectangle({x: 189, y: 53}, {x: 189, y: 81}, {x: 199, y: 53}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            //Cuarto de arriba a abajo
            isPointInRectangle({x: 153, y: 41}, {x: 153, y: 48}, {x: 225, y: 41}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 206, y: 57}, {x: 206, y: 74}, {x: 231, y: 57}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 231, y: 62}, {x: 231, y: 76}, {x: 248, y: 62}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 267, y: 59}, {x: 267, y: 76}, {x: 270, y: 59}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 248, y: 76}, {x: 248, y: 79}, {x: 267, y: 76}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 225, y: 24}, {x: 225, y: 53}, {x: 248, y: 24}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInRectangle({x: 262, y: 39}, {x: 262, y: 50}, {x: 273, y: 39}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;
            isPointInCircle({x: 236, y: 16}, 5, {x: column, y: row}) ? rowMap[column] = 0 : null;

            //CUADRAO GIGANTE DE ABAJO
            isPointInRectangle({x: 121, y: 94}, {x: 121, y: 116}, {x: 273, y: 94}, {
                x: column,
                y: row
            }) ? rowMap[column] = 0 : null;

            //TRIANGULO DE ABAJO
            isPointInTriangle({x: 116, y: 49}, {x: 116, y: 121}, {x: 94, y: 121}, {
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
        //PARTE ALBERTO
        //PRIMER BLOQUE - ARRIBA
        "Beacon-008": {
            x: 9, y: 129,
            distance: NaN,
            nearbyBeacons: ["Beacon-007", 'Beacon-028', 'Beacon-009']
        },
        "Beacon-009": {
            x: 9, y: 140,
            distance: NaN,
            nearbyBeacons: ["Beacon-008", 'Beacon-010']
        },
        "Beacon-010": {
            x: 9, y: 151,
            distance: NaN,
            nearbyBeacons: ["Beacon-009", 'Beacon-011']
        },
        "Beacon-011": {
            x: 9, y: 162,
            distance: NaN,
            nearbyBeacons: ["Beacon-010", 'Beacon-012']
        },
        "Beacon-012": {
            x: 9, y: 173,
            distance: NaN,
            nearbyBeacons: ["Beacon-011", 'Beacon-013']
        },
        "Beacon-013": {
            x: 9, y: 187,
            distance: NaN,
            nearbyBeacons: ["Beacon-012", 'Beacon-014', 'Beacon-033']
        },
        "Beacon-014": {
            x: 7, y: 194,
            distance: NaN,
            nearbyBeacons: ["Beacon-013", 'Beacon-015', 'Beacon-033']
        },
        "Beacon-015": {
            x: 12, y: 202,
            distance: NaN,
            nearbyBeacons: ["Beacon-014", 'Beacon-034', 'Beacon-016']
        },
        //PISCINA CIRCULAR
        "Beacon-016": {
            x: 11, y: 236,
            distance: NaN,
            nearbyBeacons: ["Beacon-015", 'Beacon-054', 'Beacon-053']
        },

        //TODO meter 17-28

        "Beacon-029": {
            x: 21, y: 129,
            distance: NaN,
            nearbyBeacons: ["Beacon-028", 'Beacon-045', 'Beacon-030', 'Beacon-027']
        },
        "Beacon-030": {
            x: 21, y: 140,
            distance: NaN,
            nearbyBeacons: ["Beacon-029", 'Beacon-031']
        },
        "Beacon-031": {
            x: 21, y: 156,
            distance: NaN,
            nearbyBeacons: ["Beacon-030", 'Beacon-032', 'Beacon-047', 'Beacon-048']
        },
        "Beacon-032": {
            x: 21, y: 167,
            distance: NaN,
            nearbyBeacons: ["Beacon-031", 'Beacon-033']
        },
        "Beacon-033": {
            x: 21, y: 188,
            distance: NaN,
            nearbyBeacons: ["Beacon-013", 'Beacon-032', 'Beacon-049']
        },
        "Beacon-034": {
            x: 21, y: 202,
            distance: NaN,
            nearbyBeacons: ["Beacon-015", 'Beacon-016', 'Beacon-051']
        },
        "Beacon-045": {
            x: 27, y: 123,
            distance: NaN,
            nearbyBeacons: ["Beacon-028", 'Beacon-027', 'Beacon-044', 'Beacon-046', 'Beacon-065', 'Beacon-029']
        },
        "Beacon-046": {
            x: 33, y: 129,
            distance: NaN,
            nearbyBeacons: ['Beacon-044', 'Beacon-045', 'Beacon-065', 'Beacon-047', 'Beacon-067']
        },
        "Beacon-047": {
            x: 33, y: 140,
            distance: NaN,
            nearbyBeacons: ["Beacon-046", 'Beacon-067', 'Beacon-069', 'Beacon-031', 'Beacon-048']
        },
        "Beacon-048": {
            x: 33, y: 173,
            distance: NaN,
            nearbyBeacons: ["Beacon-031", 'Beacon-069', 'Beacon-047', 'Beacon-049', 'Beacon-048']
        },
        "Beacon-049": {
            x: 33, y: 188,
            distance: NaN,
            nearbyBeacons: ["Beacon-048", 'Beacon-050', 'Beacon-033', 'Beacon-031', 'Beacon-048']
        },
        "Beacon-050": {
            x: 36, y: 194,
            distance: NaN,
            nearbyBeacons: ["Beacon-049", 'Beacon-051', 'Beacon-052']
        },
        "Beacon-051": {
            x: 30, y: 202,
            distance: NaN,
            nearbyBeacons: ["Beacon-034", 'Beacon-050', 'Beacon-052']
        },
        "Beacon-052": {
            x: 38, y: 206,
            distance: NaN,
            nearbyBeacons: ["Beacon-051", 'Beacon-053', 'Beacon-050']
        },
        "Beacon-053": {
            x: 38, y: 212,
            distance: NaN,
            nearbyBeacons: ["Beacon-052", 'Beacon-054', 'Beacon-016']
        },
        "Beacon-054": {
            x: 23, y: 236,
            distance: NaN,
            nearbyBeacons: ["Beacon-015", 'Beacon-016', 'Beacon-051', 'Beacon-053', 'Beacon-055']
        },
        "Beacon-055": {
            x: 38, y: 267,
            distance: NaN,
            nearbyBeacons: ["Beacon-056", 'Beacon-054', 'Beacon-016']
        },
        "Beacon-056": {
            x: 38, y: 273,
            distance: NaN,
            nearbyBeacons: ["Beacon-015", 'Beacon-055', 'Beacon-148']
        },
        //PALMERITAS
        "Beacon-065": {
            x: 40, y: 128,
            distance: NaN,
            nearbyBeacons: ["Beacon-044", 'Beacon-046', 'Beacon-067', 'Beacon-066', 'Beacon-068', 'Beacon-064']
        },
        "Beacon-066": {
            x: 50, y: 128,
            distance: NaN,
            nearbyBeacons: ["Beacon-110", 'Beacon-111', 'Beacon-079', 'Beacon-068', 'Beacon-067', 'Beacon-065', 'Beacon-064']
        },
        "Beacon-067": {
            x: 40, y: 136,
            distance: NaN,
            nearbyBeacons: ["Beacon-046", 'Beacon-065', 'Beacon-066', 'Beacon-068', 'Beacon-070', 'Beacon-069', 'Beacon-047']
        },
        "Beacon-068": {
            x: 50, y: 136,
            distance: NaN,
            nearbyBeacons: ["Beacon-066", 'Beacon-065', 'Beacon-067', 'Beacon-069', 'Beacon-070', 'Beacon-079', 'Beacon-080']
        },
        "Beacon-069": {
            x: 40, y: 144,
            distance: NaN,
            nearbyBeacons: ["Beacon-047", 'Beacon-067', 'Beacon-068', 'Beacon-070', 'Beacon-048']
        },
        "Beacon-070": {
            x: 50, y: 144,
            distance: NaN,
            nearbyBeacons: ["Beacon-067", 'Beacon-068', 'Beacon-097', 'Beacon-079', 'Beacon-080', 'Beacon-081']
        },
        //SEGUNDO BLOQUE - ABAJO
        "Beacon-111": {
            x: 61, y: 123,
            distance: NaN,
            nearbyBeacons: ["Beacon-110", 'Beacon-132', 'Beacon-066', 'Beacon-079', 'Beacon-112', 'Beacon-064']
        },
        "Beacon-079": {
            x: 56, y: 135,
            distance: NaN,
            nearbyBeacons: ["Beacon-066", 'Beacon-068', 'Beacon-070', 'Beacon-080', 'Beacon-111']
        },
        "Beacon-080": {
            x: 56, y: 146,
            distance: NaN,
            nearbyBeacons: ["Beacon-079", 'Beacon-081', 'Beacon-113', 'Beacon-114', 'Beacon-090']
        },
        "Beacon-081": {
            x: 56, y: 164,
            distance: NaN,
            nearbyBeacons: ["Beacon-080", 'Beacon-082', 'Beacon-114', 'Beacon-115']
        },
        "Beacon-082": {
            x: 56, y: 173,
            distance: NaN,
            nearbyBeacons: ["Beacon-081", 'Beacon-083']
        },
        "Beacon-083": {
            x: 56, y: 187,
            distance: NaN,
            nearbyBeacons: ["Beacon-082", 'Beacon-084', 'Beacon-117']
        },
        "Beacon-084": {
            x: 53, y: 194,
            distance: NaN,
            nearbyBeacons: ["Beacon-083", 'Beacon-117', 'Beacon-085', 'Beacon-118']
        },
        "Beacon-085": {
            x: 53, y: 202,
            distance: NaN,
            nearbyBeacons: ["Beacon-084", 'Beacon-086', 'Beacon-118']
        },
        "Beacon-086": {
            x: 56, y: 212,
            distance: NaN,
            nearbyBeacons: ["Beacon-085", 'Beacon-087']
        },
        "Beacon-087": {
            x: 56, y: 229,
            distance: NaN,
            nearbyBeacons: ["Beacon-086", 'Beacon-088']
        },
        "Beacon-088": {
            x: 56, y: 243,
            distance: NaN,
            nearbyBeacons: ["Beacon-147", 'Beacon-089', 'Beacon-087']
        },
        "Beacon-089": {
            x: 59, y: 269,
            distance: NaN,
            nearbyBeacons: ["Beacon-090", 'Beacon-148', 'Beacon-147', 'Beacon-088']
        },
        "Beacon-112": {
            x: 68, y: 134,
            distance: NaN,
            nearbyBeacons: ["Beacon-113", 'Beacon-111', 'Beacon-132']
        },
        "Beacon-113": {
            x: 68, y: 145,
            distance: NaN,
            nearbyBeacons: ["Beacon-080", 'Beacon-114', 'Beacon-112']
        },
        "Beacon-114": {
            x: 68, y: 156,
            distance: NaN,
            nearbyBeacons: ["Beacon-113", 'Beacon-080', 'Beacon-081', 'Beacon-115']
        },
        "Beacon-115": {
            x: 68, y: 167,
            distance: NaN,
            nearbyBeacons: ["Beacon-114", 'Beacon-116', 'Beacon-081']
        },
        "Beacon-116": {
            x: 68, y: 179,
            distance: NaN,
            nearbyBeacons: ['Beacon-115', 'Beacon-117', 'Beacon-138']
        },
        "Beacon-117": {
            x: 59, y: 188,
            distance: NaN,
            nearbyBeacons: ["Beacon-084", 'Beacon-083', 'Beacon-138', 'Beacon-116']
        },
        "Beacon-118": {
            x: 60, y: 202,
            distance: NaN,
            nearbyBeacons: ["Beacon-085", 'Beacon-141', 'Beacon-084']
        },
        "Beacon-133": {
            x: 80, y: 133,
            distance: NaN,
            nearbyBeacons: ["Beacon-132", 'Beacon-131', 'Beacon-134']
        },
        "Beacon-134": {
            x: 80, y: 144,
            distance: NaN,
            nearbyBeacons: ["Beacon-133", 'Beacon-135']
        },
        "Beacon-135": {
            x: 80, y: 155,
            distance: NaN,
            nearbyBeacons: ["Beacon-134", 'Beacon-136']
        },
        "Beacon-136": {
            x: 80, y: 166,
            distance: NaN,
            nearbyBeacons: ["Beacon-137", 'Beacon-135']
        },
        "Beacon-137": {
            x: 80, y: 177,
            distance: NaN,
            nearbyBeacons: ["Beacon-138", 'Beacon-139', 'Beacon-136']
        },
        "Beacon-138": {
            x: 73, y: 188,
            distance: NaN,
            nearbyBeacons: ["Beacon-139", 'Beacon-117', 'Beacon-137', 'Beacon-116', 'Beacon-055']
        },
        "Beacon-139": {
            x: 81, y: 188,
            distance: NaN,
            nearbyBeacons: ["Beacon-140", 'Beacon-137', 'Beacon-138']
        },
        "Beacon-140": {
            x: 81, y: 200,
            distance: NaN,
            nearbyBeacons: ["Beacon-139", 'Beacon-141', 'Beacon-142']
        },
        "Beacon-141": {
            x: 71, y: 202,
            distance: NaN,
            nearbyBeacons: ["Beacon-140", 'Beacon-118', 'Beacon-142']
        },
        "Beacon-142": {
            x: 75, y: 212,
            distance: NaN,
            nearbyBeacons: ["Beacon-141", 'Beacon-140', 'Beacon-143']
        },
        "Beacon-143": {
            x: 75, y: 223,
            distance: NaN,
            nearbyBeacons: ["Beacon-142", 'Beacon-144']
        },
        "Beacon-144": {
            x: 78, y: 238,
            distance: NaN,
            nearbyBeacons: ["Beacon-143", 'Beacon-145']
        },
        "Beacon-145": {
            x: 81, y: 250,
            distance: NaN,
            nearbyBeacons: ["Beacon-144", 'Beacon-146']
        },
        "Beacon-146": {
            x: 79, y: 270,
            distance: NaN,
            nearbyBeacons: ["Beacon-090", 'Beacon-145']
        },
        "Beacon-147": {
            x: 50, y: 267,
            distance: NaN,
            nearbyBeacons: ["Beacon-088", 'Beacon-089', 'Beacon-148']
        },
        "Beacon-148": {
            x: 5, y: 273,
            distance: NaN,
            nearbyBeacons: ["Beacon-056", 'Beacon-147', 'Beacon-089', 'Beacon-090']
        }
        //THE END
    };

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