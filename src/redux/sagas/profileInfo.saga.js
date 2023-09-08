//imports
import { put, takeLatest} from 'redux-saga/effects';
import axios from 'axios'

//fetching job data for profile 
function* fetchProfileInfo(action) {
    try {
        const response = yield axios.get(`/api/profile/${action.payload}`)
        console.log('response.data is:', response.data);
        yield put({ type: 'SET_PROFILE_INFO', payload: response.data })
    } catch (err) {
        console.log('error getting profile data', err);
    }
}

//watcher saga
function* profileSaga () {
    yield takeLatest('FETCH_PROFILE_INFO', fetchProfileInfo)
}

export default profileSaga