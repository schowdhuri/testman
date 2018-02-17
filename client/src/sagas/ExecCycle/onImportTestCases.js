import { put, takeEvery } from "redux-saga/effects";

import { RCV_IMPORT_TESTS } from "constants/TestCaseSelectorActions";
import { reqTestRuns } from "actions/ExecCycle";

function* onImportTests(action) {
    const { execCycle } = action;
    if(!execCycle || !execCycle.id)
        return;
    yield put(reqTestRuns(execCycle.id));
}

export default function* () {
    yield takeEvery(RCV_IMPORT_TESTS, onImportTests);
};
