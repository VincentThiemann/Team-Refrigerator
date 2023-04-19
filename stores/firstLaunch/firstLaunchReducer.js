import firstLauchActions from './firstLauchActions';

const initialState = {
  isFirstTimeUse: true,
};

const firstLaunchReducer = (state = initialState, action) => {
  switch (action.type) {
    case firstLauchActions.types.SET_FIRST_TIME_USE:
      return {...state, isFirstTimeUse: action.payload};
    default:
      return state;
  }
};

export default firstLaunchReducer;