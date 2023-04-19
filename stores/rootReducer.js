import { combineReducers }from "redux";
import tabReducer from "./tabs/tabReducer";
import firstLaunchReducer from "./firstLaunch/firstLaunchReducer";

export default combineReducers({
    tabReducer, firstLaunchReducer
})