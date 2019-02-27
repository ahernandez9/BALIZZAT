import React from 'react'


export const PriorityLocation = (Props) => {

    const {
        areas
    } = Props;

    function calculateAreaWithPriority1() {
        let result = [];
        let areasPriority1 = areas.priority1[0];
        console.log("areasPriority1: ", areasPriority1);

        for (let j = 0; j < areas.priority2[0].length; j++) {
            // areasPriority1.includes(areas.priority2[i][j]) ?
            //     !result.includes(areas.priority2[i][j]) ? result.push(areas.priority2[i][j]) : null : null;
            areasPriority1.some((element) => {
                return element[0] === areas.priority2[0][j][0] && element[1] === areas.priority2[0][j][1]
            }) ? result.push(areas.priority2[0][j]) : null;
        }


        console.log("Result: ", result);
        if (result.length > 0) {
            return result;
        }

        return areasPriority1;

    }

    function calculateAreaWithPriority2() {
        let result = [];

        if (areas.priority2.length > 0) {
            if (areas.priority2.length === 1) {
                return areas.priority2[0];
            }
            //Comparamos las dos primeras areas.
            areas.priority2[1].map((position) => {
                areas.priority2[0].some((element) => {
                    return element[0] === position[0] && element[1] === position[1]
                }) ? result.push(position) : null;
            });

            //Comparamos la interseccion de las dos primeras con el resto.
            if (areas.priority2.length > 2) {
                for (let j = 2; j < areas.priority2.length; j++) {
                    let finalResult = [];
                    areas.priority2[j].map((position) => {
                        result.some((element) => {
                            return element[0] === position[0] && element[1] === position[1]
                        }) ? finalResult.push(position) : null;
                    });
                    result = finalResult;
                }
            }
        }

        return result;

    }

    function calculateArea() {
        console.log("Entrando a priorityLocation");
        if (areas.priority1.length !== 0) {
            return calculateAreaWithPriority1();
        } else {
            return calculateAreaWithPriority2();
        }
    }

    return calculateArea();


};

export const centerAreaCalculator = (Props) => {

    const {
        area
    } = Props;

    function centerFinder() {
        if (area.length > 1) {
            let minX = area[0][0], maxX = area[0][0], minY = area[0][1], maxY = area[0][1];
            area.map((point) => {
                point[0] > maxX ? maxX = point[0] : null;
                point[0] < minX ? minX = point[0] : null;
                point[1] > maxY ? maxY = point[1] : null;
                point[1] < minY ? minY = point[1] : null;
            });
            console.log("Position points :", area);
            console.log("maxX:", maxX);
            console.log("maxY:", maxY);
            console.log("minY:", minY);
            console.log("minX:", minX);
            let X = Math.round(((maxX - minX) / 2) + minX);
            let Y = Math.round(((maxY - minY) / 2) + minY);
            console.log("Point", [X, Y]);
            return [X, Y]
        }
        return [area[0][0], area[0][1]];
    }

    return centerFinder();

};
