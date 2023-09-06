// AdminPage reducer, will hold all data coming back from admin saga fetch all
const adminReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_JOBS_LIST':
            return action.payload;
        default:
            return state;
    }

};

export default adminReducer;