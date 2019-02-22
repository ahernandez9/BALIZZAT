import React from 'react'


export const PriorityAreaCalculator = (Props) => {

    const {
        beaconsOnPriority,
        plan
    } = Props;

    //Todo se multiplica x 2 de nuevo porque cada metro son dos posiciones del array
    function calculateArea(beacon) {
        let result = [];
        let  rowStart = beacon.x - (beacon.distance * 2) + 1;
        let stop = (beacon.distance * 2) * 2 - 1;
        for (let xCounter = 0; xCounter < stop; xCounter++) {
            let columnStart = beacon.y - beacon.distance + 1;
            let row = plan[rowStart];
            if (row !== undefined) {
                for (let yCounter = 0; yCounter < stop; yCounter++) {
                    row[columnStart] !== 0 && row[columnStart] !== undefined ? result.push([rowStart, columnStart]) : null;
                    columnStart++
                }
            }
            rowStart++
        }
        return result;
    }


    function calculatePriorities(beaconsOnPriority) {
        console.log("Entrando a priorityArea", beaconsOnPriority);
        let priority1 = [];
        let priority2 = [];
        beaconsOnPriority.forEach((beacon) => {
            beacon.distance <= 5 ? priority1.push(calculateArea(beacon)) : priority2.push(calculateArea(beacon))
        });
        // if(priority1.length > 1){
        //     priority1.map((area) => {
        //         priority2.push(area);
        //     });
        //     priority1 = [];
        // }
        //Si tenemos mas de una prioridad 1 cojemos la que esté mas cerca
        priority1.sort((a,b) => {
            return a.distance - b.distance
        });
        console.log({
            priority1: priority1,
            priority2: priority2
        });
        return {
            priority1: priority1,
            priority2: priority2
        }

    }

    return calculatePriorities(beaconsOnPriority);

};