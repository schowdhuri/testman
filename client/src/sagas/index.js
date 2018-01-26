import { spawn } from "redux-saga/effects";

import reqTestCases from "sagas/reqTestCases";

function* rootSaga() {
    yield spawn(reqTestCases);
}

export default rootSaga;
