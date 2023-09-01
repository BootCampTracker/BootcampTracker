import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
// POST
function* setJobInfo(action) {
  console.log("Payload outside:", action.payload);
  try {
    yield axios.post("/jobinfo", action.payload);
    yield put({ type: "SET_JOB_INFO", payload: action.payload });
    // Catch any Errors
  } catch (err) {
    console.log(`ERROR in POST sagas for Job info:`, err);
  }
}

function* jobInfoSagas() {
  yield takeLatest("ADD_JOB_INFO", setJobInfo);
}

export default jobInfoSagas;
