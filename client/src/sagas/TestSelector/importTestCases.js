import Alert from "react-s-alert";
import { call, put, take, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_IMPORT_TESTS } from "constants/TestSelectorActions";
import { RCV_TEST_CASES } from "constants/TestDesignActions";

import { rcvImportTests, resetSelection } from "actions/TestSelector";
import { reqTestCases } from "actions/TestDesign";
import { setLoading } from "actions/Shared";

function* importTests(action) {
    const { selectedItems, importActionContract } = action;
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
        yield put(setLoading(REQ_IMPORT_TESTS, false));
        if(importActionContract) {
            yield put({
                type: importActionContract.type,
                [importActionContract.key]: tests
            });
        }
        yield put(rcvImportTests(tests));
        // Alert.success(`Imported ${tests.length} tests`);
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to import test. " + (ex && ex.text || ""));
        yield put(setLoading(REQ_IMPORT_TESTS, false));
    }
}

export default function* () {
    yield takeEvery(REQ_IMPORT_TESTS, importTests);
};
