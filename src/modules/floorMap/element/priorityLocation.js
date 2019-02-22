import React from 'react'


export const PriorityLocation = (Props) => {

    const {
        areas
    } = Props;

    function calculateAreaWithPriority1() {
        let result = [];
        let areasPriority1 = areas.priority1[0];
        console.log("areasPriority1: ", areasPriority1);
        for (let i = 0; i < areas.priority2.length; i++) {
            for (let j = 0; j < areas.priority2[i].length; j++) {
                // areasPriority1.includes(areas.priority2[i][j]) ?
                //     !result.includes(areas.priority2[i][j]) ? result.push(areas.priority2[i][j]) : null : null;
                areasPriority1.some((element) => {
                    return element[0] === areas.priority2[i][j][0] && element[1] === areas.priority2[i][j][1]
                }) ?
                    !result.some((element) => {
                        //console.log("2: ", element[0] === areas.priority2[i][j][0] || element[1] === areas.priority2[i][j][1]);
                        return element[0] === areas.priority2[i][j][0] && element[1] === areas.priority2[i][j][1]
                    }) ? result.push(areas.priority2[i][j]) : null : null;
            }
        }

        console.log("Result: ", result);
        if (result.length > 0) {
            return result;
        }

        return areasPriority1;

    }

    function calculateAreaWithPriority2() {
        let result = [];

        if (areas.priority2.length === 1) {
            return areas.priority2[0];
        }
        let adder = 1;
        for (let i = 0; i < areas.priority2.length - 1; i++) {
            for (let j = 0; j < areas.priority2[i + adder].length; j++) {
                areas.priority2[i].some((element) => {
                    return element[0] === areas.priority2[i + adder][j][0] && element[1] === areas.priority2[i + adder][j][1]
                }) ? result.push(areas.priority2[i + adder][j]) : null;
            }
            adder++;
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
        if(area.length > 1) {
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
        return [area[0][0],area[0][1]];
    }

    return centerFinder();

};
