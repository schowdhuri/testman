import Alert from "react-s-alert";
import { call, put, take, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_IMPORT_TESTS } from "constants/TestCaseSelectorActions";
import { RCV_TEST_CASES } from "constants/TestDesignActions";
import { RCV_EC_SAVE } from "constants/ExecCyclesActions";

import { rcvImportTests, resetSelection } from "actions/TestCaseSelector";
import { reqTestCases } from "actions/TestDesign";
import { reqSaveExecCycle } from "actions/ExecCycle";
import { setLoading } from "actions/Shared";

function* importTests(action) {
    const { execCycle, selectedItems } = action;
    yield put(setLoading(REQ_IMPORT_TESTS, true));
    const tests = [];
    try {
        for(let i=0; i<selectedItems.length; i++) {
            const item = selectedItems[i];
            if(item.hasChildren) {
                // testplan
                yield put(reqTestCases(item.id));
                const { testPlanId, testCases } = yield take(RCV_TEST_CASES);
                if(item.id == testPlanId) {
                    testCases.forEach(tc => tests.push(tc));
                }
            } else {
                // single test case
                tests.push(item);
            }
        }
        yield put(reqSaveExecCycle({
            ...execCycle,
            testCases: [
                ...execCycle.testRuns.map(tr => ({ id: tr.testCase })),
                ...tests
            ]
        }));
        yield put(setLoading(REQ_IMPORT_TESTS, false));
        yield take(RCV_EC_SAVE);
        Alert.success(`Imported ${tests.length} tests`);
        yield put(rcvImportTests(execCycle, tests));
    } catch(ex) {
        yield put(resetSelection(preSelecedItems));
        console.log(ex);
        Alert.error("Failed to import test. " + (ex && ex.text || ""));
        yield put(setLoading(REQ_IMPORT_TESTS, false));
    }
}

export default function* () {
    yield takeEvery(REQ_IMPORT_TESTS, importTests);
};
