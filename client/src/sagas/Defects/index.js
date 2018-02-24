import { spawn } from "redux-saga/effects";

import deleteComment from "./deleteComment";
import deleteDefect from "./deleteDefect";
import deleteDefects from "./deleteDefects";
import reqDefect from "./reqDefect";
import reqDefects from "./reqDefects";
import saveComment from "./saveComment";
import saveDefect from "./saveDefect";

function* defectsSaga() {
    yield spawn(deleteComment);
    yield spawn(deleteDefect);
    yield spawn(deleteDefects);
    yield spawn(reqDefect);
    yield spawn(reqDefects);
    yield spawn(saveComment);
    yield spawn(saveDefect);
}

export default defectsSaga;
