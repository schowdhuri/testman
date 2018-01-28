import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/request";

import { REQ_TC_SAVE } from "constants/TestDesignActions";
import { rcvSaveTestCase } from "actions/TestDesign";
import { redirectToTestPlan } from "actions/Shared";
import { setLoading } from "actions/Shared";

import validateTestCase from "businessLogic/TestDesign/validateTestCase";
import buildTestCase from "businessLogic/TestDesign/buildTestCase";

function* saveTestCase(action) {
    console.log(action)
    const { testPlanId, testCase } = action;
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
        yield put(rcvSaveTestCase(response.json));
        yield put(redirectToTestPlan(testPlanId));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to save test case");
    }
    yield put(setLoading(REQ_TC_SAVE, false));
}

export default function* () {
    yield takeEvery(REQ_TC_SAVE, saveTestCase);
};
