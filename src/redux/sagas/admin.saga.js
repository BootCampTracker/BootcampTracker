import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// fetch all user jobs on GET_ALL_JOBS action
function* fetchUserJobs(action) {
    try {
        yield axios.get('/api/admin')
        yield put({ type: 'SET_ALL_JOBS', payload: response.data})
    } catch (error) {
        console.log('Error fetching user jobs data', error)
    }
};

// watcher saga
function* adminSaga () {
    yield takeLatest('GET_ALL_JOBS');
};

export default adminSaga;