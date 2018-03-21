import { spawn } from "redux-saga/effects";

import attachFile from "./attachFile";
import deleteDefect from "./deleteDefect";
import deleteDefects from "./deleteDefects";
import reqDefect from "./reqDefect";
import reqDefects from "./reqDefects";
import saveDefect from "./saveDefect";

function* defectsSaga() {
    yield spawn(attachFile);
    yield spawn(deleteDefect);
    yield spawn(deleteDefects);
    yield spawn(reqDefect);
    yield spawn(reqDefects);
    yield spawn(saveDefect);
}

export default defectsSaga;
