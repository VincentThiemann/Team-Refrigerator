import StorageService from "../../services/StorageService"

export const SET_FIRST_TIME_USE = 'SET_FIRST_TIME_USE'
export const setFirstTimeUse = () => ({
    type: SET_FIRST_TIME_USE,
    payload: false,
})

export function appStart() {
    return dispatch => {
        StorageService.getFirstTimeUse().then(isFirstTimeUse => {
            dispatch({
              type: types.SET_FIRST_TIME_USE,
              payload: isFirstTimeUse ? false : true,
            });
    });
};
};

export default { setFirstTimeUse, appStart}