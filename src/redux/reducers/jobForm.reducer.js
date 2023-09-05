const jobFormReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_JOB_INFO':
      return action.payload;
    default:
      return state;
  }
};


export default jobFormReducer;