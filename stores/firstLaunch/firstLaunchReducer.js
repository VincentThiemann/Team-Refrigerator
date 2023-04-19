import * as firstLaunchActionTypes from './firstLauchActions';

const initialState = {
  isFirstTimeUse: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case firstLaunchActionTypes.SET_FIRST_TIME_USE:
      return {...state, isFirstTimeUse: action.payload};
    default:
      return state;
  }
};