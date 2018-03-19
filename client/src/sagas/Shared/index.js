import { spawn } from "redux-saga/effects";

import checkLogin from "./checkLogin";
import deleteAttachment from "./deleteAttachment";
import downloadAttachment from "./downloadAttachment";
import redirectSaga from "./redirects";
import reqUsers from "./reqUsers";
import updateAttachment from "./updateAttachment";
import uploadFile from "./uploadFile";

function* sharedSaga() {
    yield spawn(checkLogin);
    yield spawn(deleteAttachment);
    yield spawn(downloadAttachment);
    yield spawn(redirectSaga);
    yield spawn(reqUsers);
    yield spawn(uploadFile);
    yield spawn(updateAttachment);
}

export default sharedSaga;
