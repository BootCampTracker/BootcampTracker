import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// GET for Profile info to display into Graphs
function* setProfileGraphs(action) {
  console.log('Before Try Action:', action.payload);
  try {
    const response = yield axios.get(`/api/profile/graph`);
    // Dispatch the GET in 'SET_PROFILE_GRAPH' and payload
    yield put({ type: "SET_PROFILE_GRAPH", payload: response.data });
    // Catch any ERRORS
  } catch (error) {
    console.log("ERROR in GET profile Graphs:",error);
  }
}

function* profileGraphsSaga() {
  yield takeLatest("FETCH_PROFILE_GRAPHS", setProfileGraphs);
}

export default profileGraphsSaga;
