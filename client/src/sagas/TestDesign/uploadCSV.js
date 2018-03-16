import Alert from "react-s-alert";
import request from "utils/Shared/request";
import { call, put, takeEvery } from "redux-saga/effects";

import { REQ_UPLOAD_TESTS } from "constants/TestDesignActions";
import { rcvUploadTests } from "actions/TestDesign";
import { setLoading } from "actions/Shared";

export function* uploadTests(action) {
    const { testPlanId, file } = action;
    if(!testPlanId) {
        Alert.error("testPlanId not found");
        return;
    }
    const handle = Alert.info("Uploading");
    const data = new FormData();
    data.append("file", file);
    try {
        yield put(setLoading(REQ_UPLOAD_TESTS, true));
        const response = yield call(request, {
            url: `/api/testcase/upload?testplan=${testPlanId}`,
            type: "post",
            data
        });
        Alert.success("Upload complete");
        yield put(rcvUploadTests(testPlanId, response.json));
    } catch (ex) {
        console.log("Failed to upload tests: ", ex); // eslint-disable-line no-console
        Alert.error(ex.errors && ex.errors[0] || ex.statusText || "Unable to upload CSV");
    }
    Alert.close(handle);
    yield put(setLoading(REQ_UPLOAD_TESTS, false));
}

export default function* () {
    yield takeEvery(REQ_UPLOAD_TESTS, uploadTests);
};
