import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// fetch all jobs on FETCH_COMPARE_JOBS action
function* fetchCompareJobs(action) {
    try {
        console.log('in the fetchCompareJobs function!');
        // yield axios.get('/api/compare, payload: action.payload')
        // yield put({ type: 'SET_COMPARE_JOBS', payload: response.data})
    } catch (error) {
        console.log('Error fetching compare jobs data', error)
    }
};

// watcher saga
function* compareSaga () {
    yield takeLatest('FETCH_COMPARE_JOBS', fetchCompareJobs);
};

export default compareSaga;