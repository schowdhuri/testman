import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_UPLOAD_FILE } from "constants/SharedActions";
import { rcvUploadFile, setLoading } from "actions/Shared";

function* uploadFile(action) {
    const { file } = action;
    yield put(setLoading(REQ_UPLOAD_FILE, true));
    const data = new FormData();
    data.append("file", file);
    try {
        const response = yield call(request, {
            url: `/api/attachment/`,
            type: "post",
            data
        });
        yield put(rcvUploadFile(response.json));
    } catch(ex) {
        console.log(ex);
        Alert.error(ex && ex.text || "Upload failed");
    }
    yield put(setLoading(REQ_UPLOAD_FILE, false));
}

export default function* () {
    yield takeEvery(REQ_UPLOAD_FILE, uploadFile);
};
