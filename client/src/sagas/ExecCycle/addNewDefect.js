import { put, take, takeEvery } from "redux-saga/effects";

import { REQ_ADD_NEW_DEFECT } from "constants/ExecCyclesActions";
import { RCV_SAVE_DEFECT } from "constants/DefectsActions";
import { rcvAddNewDefect } from "actions/ExecCycle";
import { reqSaveDefect } from "actions/Defects";

import { setLoading } from "actions/Shared";

function* addNewDefect(action) {
    const { defect, files, testRun } = action;
    yield put(setLoading(REQ_ADD_NEW_DEFECT, true));
    yield put(reqSaveDefect(
        {
            ...defect,
            testCases: [{
                id: testRun.testCase.id
            }],
            testRuns: [ testRun ]
        },
        files,
        false
    ));
    const result = yield take(RCV_SAVE_DEFECT);
    yield put(rcvAddNewDefect(result.defect));
    yield put(setLoading(REQ_ADD_NEW_DEFECT, false));
}

export default function* () {
    yield takeEvery(REQ_ADD_NEW_DEFECT, addNewDefect);
};
