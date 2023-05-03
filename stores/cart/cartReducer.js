import cartActions from './cartActions';

const initialState = {
  cart: {},
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case cartActions.types.GET_CART_ITEMS:
      return {...state, cart: action?.payload};
    case cartActions.types.SET_IS_LOADING:
      return {...state, isLoading: action?.payload};
    default:
      return state;
  }
};