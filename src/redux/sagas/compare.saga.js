import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// fetch all jobs on FETCH_COMPARE_JOBS action
function* fetchCompareJobs(action) {
    console.log('in the fetchCompareJobs function!');
    try {
        // console.log(`action.payload is: ${JSON.stringify(action.payload)} `);
        // Instead of sending payload to be req.body, use string interpolation to make a query url
            // EX target.com/?searchTerm=value&searchTerm=value&etc
        const response = yield axios.get(`/api/compare?workplaceLocation=${action.payload.workplaceLocation}&job=${action.payload.job}&bootcamp=${action.payload.bootcamp}&state=${action.payload.state}`)
        yield put({ type: 'SET_COMPARE_JOBS', payload: response.data})
    } catch (error) {
        console.log('Error fetching compare jobs data', error)
    }
};

// fetch all jobs on FETCH_COMPARE_JOBS_TWO action
function* fetchCompareJobsTwo(action) {
    try {
        const response = yield axios.get(`/api/compare?workplaceLocation=${action.payload.workplaceLocation}&job=${action.payload.job}&bootcamp=${action.payload.bootcamp}&state=${action.payload.state}`)
        yield put({ type: 'SET_COMPARE_JOBS_TWO', payload: response.data})
    } catch (error) {
        console.log('Error fetching compare jobs data', error)
    }
};

// watcher saga
function* compareSaga () {
    yield takeLatest('FETCH_COMPARE_JOBS', fetchCompareJobs);
    yield takeLatest('FETCH_COMPARE_JOBS_TWO', fetchCompareJobsTwo);
};

export default compareSaga;