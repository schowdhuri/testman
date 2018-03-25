import { put, take, takeEvery } from "redux-saga/effects";

import { REQ_ATTACH_TO_DEFECT, RCV_SAVE_DEFECT } from "constants/DefectsActions";
import { RCV_UPLOAD_FILES } from "constants/SharedActions";
import { rcvAttachToDefect, reqSaveDefect } from "actions/Defects";
import { reqUploadFiles, setLoading } from "actions/Shared";


function* attachToDefect(action) {
    const { defect, file } = action;
    yield put(setLoading(REQ_ATTACH_TO_DEFECT, true));
    // upload file
    yield put(reqUploadFiles([ file ]));
    const uploadResult = yield take(RCV_UPLOAD_FILES);
    // add to defect
    defect.description.attachments.push(uploadResult.files[0]);
    // save defect
    yield put(reqSaveDefect(defect, null, false));
    const result = yield take(RCV_SAVE_DEFECT);
    yield put(rcvAttachToDefect(uploadResult.files[0], result.defect));
    yield put(setLoading(REQ_ATTACH_TO_DEFECT, false));
}

export default function* () {
    yield takeEvery(REQ_ATTACH_TO_DEFECT, attachToDefect);
};
