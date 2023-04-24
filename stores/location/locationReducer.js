const initialState = {
  latitude: null,
  longitude: null,
};

export default locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    default:
      return state;
  }
};

const setLocation = (latitude, longitude) => ({
    type: 'SET_LOCATION',
    payload: { latitude, longitude },
  });