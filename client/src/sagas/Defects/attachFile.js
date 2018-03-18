import Alert from "react-s-alert";
import { call, put, take, takeEvery } from "redux-saga/effects";

import request from "utils/Shared/request";

import { REQ_ATTACH_TO_DEFECT, RCV_SAVE_DEFECT } from "constants/DefectsActions";
import { RCV_UPLOAD_FILE } from "constants/SharedActions";
import { rcvAttachToDefect, reqSaveDefect } from "actions/Defects";
import { reqUploadFile, setLoading } from "actions/Shared";

function* attachToDefect(action) {
    const { defect, file } = action;
    yield put(setLoading(REQ_ATTACH_TO_DEFECT, true));
    // upload file
    yield put(reqUploadFile(file));
    const uploadResult = yield take(RCV_UPLOAD_FILE);
    // add to defect
    defect.description.attachments.push(uploadResult.file);
    // save defect
    yield put(reqSaveDefect(defect, false));
    const result = yield take(RCV_SAVE_DEFECT);
    yield put(rcvAttachToDefect(uploadResult.file, result.defect));
    yield put(setLoading(REQ_ATTACH_TO_DEFECT, false));
}

export default function* () {
    yield takeEvery(REQ_ATTACH_TO_DEFECT, attachToDefect);
};
