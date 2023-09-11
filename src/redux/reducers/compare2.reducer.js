// ComparisonPage reducer for second job, will set the global state from 
// users selecting dropdown values
const compareReducer2 = (state = [], action) => {
    switch (action.type) {
        case 'SET_COMPARE_JOBS_TWO':
            return action.payload;
        default:
            return state;
    }

};

export default compareReducer2;