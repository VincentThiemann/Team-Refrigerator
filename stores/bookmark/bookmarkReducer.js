import bookmarkActions from './bookmarkActions';

const initialState = {
  bookmarks: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case bookmarkActions.types.GET_BOOKMARKS:
      return {...state, bookmarks: action?.payload};
    case bookmarkActions.types.SET_IS_LOADING:
      return {...state, isLoading: action?.payload};
    default:
      return state;
  }
};