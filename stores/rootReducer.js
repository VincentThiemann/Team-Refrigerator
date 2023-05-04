import { combineReducers } from "redux";
import tabReducer from "./tabs/tabReducer";
import firstLaunchReducer from "./firstLaunch/firstLaunchReducer";
import cartReducer from './cart/cartReducer';
import bookmarkReducer from './bookmark/bookmarkReducer';
import locationReducer from "./location/locationReducer";

export default combineReducers({
    tabReducer,
    generalState: firstLaunchReducer,
    cartState: cartReducer,
    bookmarkState: bookmarkReducer,
    location: locationReducer,
})