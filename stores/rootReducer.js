import { combineReducers } from "redux";
import tabReducer from "./tabs/tabReducer";
import firstLaunchReducer from "./firstLaunch/firstLaunchReducer";
import locationReducer from "./location/locationReducer";

export default combineReducers({
    tabReducer, 
    generalState: firstLaunchReducer,
    location: locationReducer,
})