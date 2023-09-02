const profileGraphsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PROFILE_GRAPH':
      return action.payload;
    default:
      return state;
  }
};


export default profileGraphsReducer;