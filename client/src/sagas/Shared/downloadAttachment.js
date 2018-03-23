import { put, takeEvery } from "redux-saga/effects";

import { REQ_DOWNLOAD_ATTACH } from "constants/SharedActions";
import { setLoading } from "actions/Shared";

function* downloadAttachment(action) {
    const { attachment } = action;
    yield put(setLoading(REQ_DOWNLOAD_ATTACH, true));

    const form = document.createElement("form");
    form.action = `/api/attachment/${attachment.id}/download`;
    document.body.appendChild(form);
    form.submit();

    yield put(setLoading(REQ_DOWNLOAD_ATTACH, false));
}

export default function* () {
    yield takeEvery(REQ_DOWNLOAD_ATTACH, downloadAttachment);
};
