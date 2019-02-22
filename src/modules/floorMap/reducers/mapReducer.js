const INITIAL_STATE = {
    // Posicion 0 = valor del mapa, posición 1 = eje x, posicion 2 = eje Y
    prevPosition: [],
    plan: [],
    beaconsList: {},
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DOWNLOAD_MAP':
            return {
                ...state,
                plan: action.payload,
            };
        case 'DOWNLOAD_BEACONLIST':
            return {
                ...state,
                beaconsList: action.payload
            };
        case 'UPDATE_MAP':
            return{
                ...state,
                plan: action.payload.newMap,
                prevPosition: action.payload.prevPosition
            };
        default:
            return state
    }

};

