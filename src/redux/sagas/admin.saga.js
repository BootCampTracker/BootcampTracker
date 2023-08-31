import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// fetch all user jobs on FETCH_ALL_JOBS action
function* fetchAllJobEntries() {
    try {
        yield axios.get('/api/admin')
        yield put({ type: 'SET_ALL_JOBS', payload: response.data})
    } catch (error) {
        console.log('Error fetching user jobs data', error)
    }
};

// watcher saga
function* adminSaga () {
    yield takeLatest('FETCH_ALL_JOBS', fetchAllJobEntries);
};

export default adminSaga;