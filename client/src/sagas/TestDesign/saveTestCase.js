import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_TC_SAVE } from "constants/TestDesignActions";
import { rcvSaveTestCase } from "actions/TestDesign";
import { redirectToTestDesign, setLoading } from "actions/Shared";

import validateTestCase from "utils/TestDesign/validateTestCase";
import buildTestCase from "utils/TestDesign/buildTestCase";
import parseTestCase from "utils/TestDesign/parseTestCase";

function* saveTestCase(action) {
    const { testPlanId, testCase, redirect } = action;
    if(!testPlanId) {
        Alert.error("testPlanId not found");
        return;
    }
    const validationResult = validateTestCase(testCase);
    if(!validationResult.valid) {
        Alert.error(validationResult.error);
        return;
    }
    yield put(setLoading(REQ_TC_SAVE, true));
    try {
        let response;
        if(testCase.id) {
            response = yield call(request, {
                url: `/api/testcase/${testCase.id}`,
                type: "put",
                data: buildTestCase(testCase),
                dataType: "json"
            });
        } else {
            response = yield call(request, {
                url: `/api/testcase?testplan=${testPlanId}`,
                type: "post",
                data: buildTestCase(testCase),
                dataType: "json"
            });
        }
        Alert.success("Saved");
        yield put(rcvSaveTestCase(testPlanId, parseTestCase(response.json)));
        if(redirect)
            yield put(redirectToTestDesign());
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error("Failed to save test case");
    }
    yield put(setLoading(REQ_TC_SAVE, false));
}

export default function* () {
    yield takeEvery(REQ_TC_SAVE, saveTestCase);
};
