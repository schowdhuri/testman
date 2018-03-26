import { spawn } from "redux-saga/effects";

import getSummary from "./getSummary";

function* dashboardSaga() {
    yield spawn(getSummary);
}

export default dashboardSaga;
