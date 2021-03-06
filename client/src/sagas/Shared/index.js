import { spawn } from "redux-saga/effects";

import setupInvalidateSession from "./setupInvalidateSession";
import checkLogin from "./checkLogin";

import attachFileToComment from "./attachFileToComment";
import deleteAttachment from "./deleteAttachment";
import deleteComment from "./deleteComment";
import downloadAttachment from "./downloadAttachment";
import redirectSaga from "./redirects";
import reqUsers from "./reqUsers";
import saveComment from "./saveComment";
import updateAttachment from "./updateAttachment";
import uploadFiles from "./uploadFiles";

function* sharedSaga() {
    yield spawn(setupInvalidateSession);
    yield spawn(attachFileToComment);
    yield spawn(checkLogin);
    yield spawn(deleteAttachment);
    yield spawn(deleteComment);
    yield spawn(downloadAttachment);
    yield spawn(redirectSaga);
    yield spawn(reqUsers);
    yield spawn(saveComment);
    yield spawn(uploadFiles);
    yield spawn(updateAttachment);
}

export default sharedSaga;
