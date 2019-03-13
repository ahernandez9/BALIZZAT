import React from 'react'


export const PriorityAreaCalculator = (Props) => {

    const {
        beaconsOnPriority,
        plan
    } = Props;

    // distance : Formula para calcular distancia entre beacon y movil a partir de el rssi esperado a un metro ( -50) y una
    //constante en 20 y 40 ( 35 ). Los valores dados salen después de calcular varias posibilidades.
    function calculateDistance(rssi) {
        let distance = Math.round(10 ** ((-50 - rssi) / 35));

        //Si la distancia es 0.algo la redondeamos a 1 para que los calculos funcionen. A efectos prácticos es lo mismo
        return distance === 0 ? 1 : distance;
    }

    //Todo se multiplica x 2 de nuevo porque cada metro son dos posiciones del array
    function calculateAreaPriority(beacon, distance) {
        let result = [];
        //let distance = calculateDistance(beacon.rssi);
        let rowStart = beacon.x - (distance * 2) + 1;
        let stop = (distance * 2) * 2 - 1;
        for (let xCounter = 0; xCounter < stop; xCounter++) {
            let columnStart = beacon.y - distance + 1;
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
        let beaconPriority1 = [], priority1 = [];
        let beaconPriority2 = [], priority2 = [];
        beaconsOnPriority.forEach((beacon) => {
            calculateDistance(beacon.rssi) <= 4 ? beaconPriority1.push(beacon) : beaconPriority2.push(beacon)
        });

        //Si tenemos mas de una prioridad 1 cojemos la que esté mas cerca
        if (beaconPriority1.length > 1) {
            beaconPriority1.sort((a, b) => {
                return calculateDistance(a.rssi) - calculateDistance(b.rssi)
            });
        }
        if (beaconPriority1.length > 0) {
            priority1.push(calculateAreaPriority(beaconPriority1[0], calculateDistance(beaconPriority1[0].rssi)))
        }
        if (beaconPriority2.length > 1) {
            beaconPriority2.sort((a, b) => {
                return calculateDistance(a.rssi) - calculateDistance(b.rssi)
            });
        }
        if (beaconPriority2.length > 0) {
            beaconPriority2.map((beacon) => {
                priority2.push(calculateAreaPriority(beacon), calculateDistance(beacon.rssi));
            })
        }
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