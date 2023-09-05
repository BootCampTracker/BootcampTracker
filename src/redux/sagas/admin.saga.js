import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// fetch all jobs on FETCH_ALL_JOBS action
function* fetchAllJobEntries() {
    try {
        const response = yield axios.get('/api/admin')
        console.log({response});
        yield put({ type: 'SET_ALL_JOBS', payload: response.data})
    } catch (error) {
        console.log('Error fetching user jobs data', error)
    }
};

// Delete job by jobId DELETE_JOB_ROW action
function* deleteJobRow(action) {
    try {
        yield axios.delete(`/api/admin/${action.payload}`)
        yield put({ type: 'FETCH_ALL_JOBS'})
    } catch (error) {
        console.log('Error deleting job row', error)
    }
}

// watcher saga
function* adminSaga () {
    yield takeLatest('FETCH_ALL_JOBS', fetchAllJobEntries);
    yield takeLatest('DELETE_JOB_ROW', deleteJobRow)
};

export default adminSaga;