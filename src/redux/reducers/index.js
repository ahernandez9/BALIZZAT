import {combineReducers} from "redux";
import MapReducer from "../../modules/floorMap/reducers/mapReducer"
import RangeReducer from "../../modules/scanner/reducers/RangeReducer"
import AlertReducer from "../../modules/alerts/reducers/AlertReducer";
//import RangeReducer from "../../modules/beaconDetector/reducers/RangeReducer";

export const todoApp = combineReducers({
    MapReducer,
    RangeReducer,
    AlertReducer
});

