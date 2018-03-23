import { put, take, takeEvery } from "redux-saga/effects";

import {
    REQ_ATTACH_TO_COMM,
    RCV_SAVE_COMMENT,
    RCV_UPLOAD_FILES
} from "constants/SharedActions";

import {
    rcvAttachToComment,
    reqSaveComment,
    reqUploadFiles,
    setLoading
} from "actions/Shared";


function* attachToComment(action) {
    const { file, comment, entity, entityId } = action;
    let result;
    yield put(setLoading(REQ_ATTACH_TO_COMM, true));
    // upload file
    yield put(reqUploadFiles([ file ]));
    const uploadResult = yield take(RCV_UPLOAD_FILES);
    if(comment && comment.id) {
        // add attachment and save comment
        yield put(reqSaveComment(
            {
                ...comment,
                attachments: [
                    ...comment.attachments,
                    uploadResult.files[0]
                ]
            },
            entity,
            entityId
        ));
        result = yield take(RCV_SAVE_COMMENT);
    }
    yield put(rcvAttachToComment(
        uploadResult.files[0],
        result && result.comment,
        entity,
        entityId
    ));
    yield put(setLoading(REQ_ATTACH_TO_COMM, false));
}

export default function* () {
    yield takeEvery(REQ_ATTACH_TO_COMM, attachToComment);
};
