import Alert from "react-s-alert";
import { all, call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_UPLOAD_FILES } from "constants/SharedActions";
import { rcvUploadFiles, setLoading } from "actions/Shared";

function* uploadFiles(action) {
    const { files } = action;

    yield put(setLoading(REQ_UPLOAD_FILES, true));
    try {
        const pArr = files.map(file => {
            const data = new FormData();
            data.append("file", file);
            return request({
                url: `/api/attachment/`,
                type: "post",
                data
            });
        });
        const results = yield all(pArr);
        yield put(rcvUploadFiles(results.map(response => response.json)));
    } catch(ex) {
        console.log(ex);
        Alert.error(ex && ex.text || "Upload failed");
    }
    yield put(setLoading(REQ_UPLOAD_FILES, false));
}

export default function* () {
    yield takeEvery(REQ_UPLOAD_FILES, uploadFiles);
};
