import * as launchActionTypes from "./launchActions";

const initialState = {
    isFirstLaunch: true,
}

export default launchReducers = (state = initialState, action) => {
    switch (action.type) {
        case launchActionTypes.SET_FIRST_TIME_USE:
            return {
                ...state, 
                isFirstLaunch: action.payload,
            }
        default:
            return state;
    }
}
