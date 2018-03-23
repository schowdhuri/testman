import Alert from "react-s-alert";
import { call, put, take, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_SAVE_COMMENT, RCV_UPLOAD_FILES } from "constants/SharedActions";
import { rcvSaveComment, reqUploadFiles, setLoading } from "actions/Shared";

import buildComment from "utils/Shared/buildComment";

function* saveComment(action) {
    const { comment, entity, entityId } = action;
    if(!entity)
        throw new Error("NO ENTTITY saveComment")
    const data = buildComment(comment);

    yield put(setLoading(REQ_SAVE_COMMENT, true));
    try {
        let response;
        if(comment.id) {
            response = yield call(request, {
                url: `/api/comment/${comment.id}`,
                type: "put",
                data,
                dataType: "json"
            });
        } else if(entity && entityId) {
            data[entity] = entityId;
            if(data.files && data.files.length) {
                // upload the files
                yield put(reqUploadFiles(data.files));
                const { files } = yield take(RCV_UPLOAD_FILES);
                data.content.attachments = files.map(f => f.id);
            }
            response = yield call(request, {
                url: "/api/comment",
                type: "post",
                data,
                dataType: "json"
            });
        }
        yield put(rcvSaveComment(response.json, entity, entityId));
    } catch(ex) {
        console.log(ex); // eslint-disable-line no-console
        Alert.error("Failed to save comment");
    }
    yield put(setLoading(REQ_SAVE_COMMENT, false));
}

export default function* () {
    yield takeEvery(REQ_SAVE_COMMENT, saveComment);
};
