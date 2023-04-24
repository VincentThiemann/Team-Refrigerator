const initialState = {

  addressName: null,
};

export default locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return {
        addressName: action.payload.addressName,
      };
    default:
      return state;
  }
};

export const setLocation = ( addressName ) => ({
    type: 'SET_LOCATION',
    payload: { addressName },
  });

 