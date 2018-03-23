import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_DELETE_COMMENT } from "constants/SharedActions";
import { rcvDeleteComment, setLoading } from "actions/Shared";

function* deleteComment(action) {
    const { id } = action;
    yield put(setLoading(REQ_DELETE_COMMENT, true));
    try {
        const response = yield call(request, {
            url: `/api/comment/${id}`,
            type: "delete"
        });
        yield put(rcvDeleteComment(response.json));
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error(ex && ex.text || "Unable to delete");
    }
    yield put(setLoading(REQ_DELETE_COMMENT, false));
}

export default function* () {
    yield takeEvery(REQ_DELETE_COMMENT, deleteComment);
};
