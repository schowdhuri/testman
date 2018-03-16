import Alert from "react-s-alert";
import { call, put, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_DELETE_COMMENT } from "constants/TestDesignActions";
import { rcvDeleteComment } from "actions/TestDesign";
import { setLoading } from "actions/Shared";

function* deleteComment(action) {
    const { id } = action;
    if(!id) {
        Alert.error("id not found");
        return;
    }
    yield put(setLoading(REQ_DELETE_COMMENT, true));
    try {
        yield call(request, {
            url: `/api/comment/${id}`,
            type: "delete"
        });
        yield put(rcvDeleteComment(id));
    } catch(ex) {
        console.log(ex);
        Alert.error("Failed to delete comment");
    }
    yield put(setLoading(REQ_DELETE_COMMENT, false));
}

export default function* () {
    yield takeEvery(REQ_DELETE_COMMENT, deleteComment);
};
