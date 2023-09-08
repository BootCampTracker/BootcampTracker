//used to store profile info returned from server
const profileReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PROFILE_INFO":
      return action.payload;
    default:
      return state;
  }
};

export default profileReducer;
