// ComparisonPage reducer, will set the global state from 
// users selecting dropdown values
const compareReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_COMPARE_JOBS':
            return action.payload;
        default:
            return state;
    }

};

export default compareReducer;