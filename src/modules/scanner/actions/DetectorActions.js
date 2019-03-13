import Types from '../Types';

export const addRange = (beacons) => async (dispatch) => {

    dispatch({
        type: Types.ADD_BEACON_ON_RANGE,
        payload: beacons,
    })
};

export const empty = () => async (dispatch, getState) => {
    console.log("Vaciando");
    dispatch({
        type: Types.EMPTY
    })
}

// export const subsRange = (id) => async (dispatch, getState) => {
//     const {beaconsOnRange} = getState().RangeReducer;
//     for (let i = 0; i < beaconsOnRange.length; i++) {
//         if (beaconsOnRange[i].id === parseInt(id, 10)) {
//             beaconsOnRange.splice(i, 1);
//             break;
//         }
//     }
//     dispatch({
//         type: Types.SUBS_BEACON_ON_RANGE,
//         payload: beaconsOnRange.slice(),
//     })
//
// };
