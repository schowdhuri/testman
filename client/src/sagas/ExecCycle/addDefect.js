import Alert from "react-s-alert";
import { call, put, take, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_ADD_DEFECT } from "constants/ExecCyclesActions";
import { RCV_SAVE_DEFECT } from "constants/DefectsActions";
import { rcvAddNewDefect } from "actions/ExecCycle";
import { reqSaveDefect } from "actions/Defects";

import { setLoading } from "actions/Shared";

function* addNewDefect(action) {
    const { defect, testRun } = action;
    let testRuns = defect.testRuns || [];
    const testRunExists = testRuns.find(tr => tr.id==testRun.id);
    if(!testRunExists) {
        testRuns = [
            ...testRuns,
            testRun
        ];
    }
    yield put(setLoading(REQ_ADD_DEFECT, true));
    yield put(reqSaveDefect({
        ...defect,
        testCases: [{
            id: testRun.testCase.id
        }],
        testRuns: [ testRun ]
    }));
    const result = yield take(RCV_SAVE_DEFECT);
    yield put(rcvAddNewDefect(result.defect));
    yield put(setLoading(REQ_ADD_DEFECT, false));
}

export default function* () {
    yield takeEvery(REQ_ADD_DEFECT, addNewDefect);
};
