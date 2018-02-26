import Alert from "react-s-alert";
import { put, take, takeEvery } from "redux-saga/effects";

import { REQ_IMPORT_TESTS, RCV_EC_SAVE } from "constants/ExecCyclesActions";
import { reqSaveExecCycle, reqTestRuns, rcvImportTests } from "actions/ExecCycle";

function* importTests(action) {
    const { execCycle, tests } = action;
    if(!execCycle || !execCycle.id)
        return;
    const testRuns = [ ...execCycle.testRuns ];
    const testCases = testRuns.map(tr => ({
        id: tr.testCase
    }));
    tests.forEach(testCase => {
        if(!find(testCases.find(tc => tc.id==testCase.id))) {
            testCases.push({
                id: testCase.id
            });
        }
    });
    yield put(reqSaveExecCycle({
        ...execCycle,
        testRuns: undefined,
        testCases
    }));
    yield take(RCV_EC_SAVE);
    Alert.success(`${tests.length} tests imported`);
    yield put(rcvImportTests(tests));
}

export default function* () {
    yield takeEvery(REQ_IMPORT_TESTS, importTests);
};
