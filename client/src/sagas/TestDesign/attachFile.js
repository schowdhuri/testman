import Alert from "react-s-alert";
import { call, put, take, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_ATTACH_TO_TC, RCV_TC_SAVE } from "constants/TestDesignActions";
import { RCV_UPLOAD_FILES } from "constants/SharedActions";
import { rcvAttachToTestCase, reqSaveTestCase } from "actions/TestDesign";
import { reqUploadFiles, setLoading } from "actions/Shared";

function* attachToTestCase(action) {
    const { testPlanId, testCase, file } = action;
    yield put(setLoading(REQ_ATTACH_TO_TC, true));
    // upload file
    yield put(reqUploadFiles([ file ]));
    const uploadResult = yield take(RCV_UPLOAD_FILES);
    // add to testCase
    testCase.description.attachments.push(uploadResult.files[0]);
    // save testCase
    yield put(reqSaveTestCase(testPlanId, testCase));
    const result = yield take(RCV_TC_SAVE);
    yield put(rcvAttachToTestCase(uploadResult.files[0], result.testCase));
    yield put(setLoading(REQ_ATTACH_TO_TC, false));
}

export default function* () {
    yield takeEvery(REQ_ATTACH_TO_TC, attachToTestCase);
};
