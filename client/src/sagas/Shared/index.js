import { spawn } from "redux-saga/effects";

import attachFileToComment from "./attachFileToComment";
import checkLogin from "./checkLogin";
import deleteAttachment from "./deleteAttachment";
import deleteComment from "./deleteComment";
import downloadAttachment from "./downloadAttachment";
import redirectSaga from "./redirects";
import reqUsers from "./reqUsers";
import saveComment from "./saveComment";
import updateAttachment from "./updateAttachment";
import uploadFile from "./uploadFile";

function* sharedSaga() {
    yield spawn(attachFileToComment);
    yield spawn(checkLogin);
    yield spawn(deleteAttachment);
    yield spawn(deleteComment);
    yield spawn(downloadAttachment);
    yield spawn(redirectSaga);
    yield spawn(reqUsers);
    yield spawn(saveComment);
    yield spawn(uploadFile);
    yield spawn(updateAttachment);
}

export default sharedSaga;
