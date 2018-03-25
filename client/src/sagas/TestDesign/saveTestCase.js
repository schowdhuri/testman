import Alert from "react-s-alert";
import { call, put, take, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_TC_SAVE } from "constants/TestDesignActions";
import { RCV_UPLOAD_FILES } from "constants/SharedActions";

import { rcvSaveTestCase } from "actions/TestDesign";
import { redirectToTestDesign, reqUploadFiles, setLoading } from "actions/Shared";

import validateTestCase from "utils/TestDesign/validateTestCase";
import buildTestCase from "utils/TestDesign/buildTestCase";
import parseTestCase from "utils/TestDesign/parseTestCase";


function* saveTestCase(action) {
    const { testPlanId, testCase, files, redirect } = action;
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
            // upload files, if any
            if(files.length) {
                yield put(reqUploadFiles(files));
                const uploadResult = yield take(RCV_UPLOAD_FILES);
                testCase.description.attachments = uploadResult.files;
            }
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
