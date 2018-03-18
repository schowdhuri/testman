import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_DELETE_ATTACH } from "constants/SharedActions";
import { rcvDeleteAttachment, setLoading } from "actions/Shared";

function* deleteAttachment(action) {
    const { attachment } = action;
    yield put(setLoading(REQ_DELETE_ATTACH, true));
    try {
        const response = yield call(request, {
            url: `/api/attachment/${attachment.id}`,
            type: "delete"
        });
        yield put(rcvDeleteAttachment(response.json));
    } catch(ex) {
        console.log(ex);
        Alert.error(ex && ex.text || "Unable to save");
    }
    yield put(setLoading(REQ_DELETE_ATTACH, false));
}

export default function* () {
    yield takeEvery(REQ_DELETE_ATTACH, deleteAttachment);
};
