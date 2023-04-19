const initialState = {
    isFirstLaunch: true,
}

export default LaunchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'First_Launch':
            return {
                ...state, isFirstLaunch: false,
            }
        default:
            return state;
    }
}

const setFirstLaunch = () => ({ type: "First_Launch" })