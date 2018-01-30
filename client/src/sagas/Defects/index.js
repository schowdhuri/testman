import { spawn } from "redux-saga/effects";

import reqDefect from "./reqDefect";
import reqDefects from "./reqDefects";
import saveDefect from "./saveDefect";

function* defectsSaga() {
    yield spawn(reqDefect);
    yield spawn(reqDefects);
    yield spawn(saveDefect);
}

export default defectsSaga;
