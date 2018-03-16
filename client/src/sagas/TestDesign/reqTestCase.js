import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_TEST_CASE } from "constants/TestDesignActions";
import { rcvTestCase } from "actions/TestDesign";
import { setLoading } from "actions/Shared";
import parseTestCase from "utils/TestDesign/parseTestCase";

function* getTestCases(action) {
    const { id } = action;
    yield put(setLoading(REQ_TEST_CASE, true));
    try {
        const response = yield call(request, {
            url: `/api/testcase/${id}`,
            dataType: "json"
        });
        const testCase = response.json;
        yield put(rcvTestCase(parseTestCase(testCase)));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to fetch tests");
    }
    yield put(setLoading(REQ_TEST_CASE, false));
}

export default function* () {
    yield takeEvery(REQ_TEST_CASE, getTestCases);
};
