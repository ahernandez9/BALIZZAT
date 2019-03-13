import Types from '../Types';

const INITIAL_STATE = {
    beaconsOnRange: [],
};
export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.ADD_BEACON_ON_RANGE:
            return {
                ...state,
                beaconsOnRange: action.payload,
            };
        case Types.SUBS_BEACON_ON_RANGE:
            return {
                ...state,
                beaconsOnRange: action.payload,
            };
        case Types.EMPTY:
            return {
                ...state,
                beaconsOnRange: [],
            };
        default:
            return state
    }
};

