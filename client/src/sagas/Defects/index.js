import { spawn } from "redux-saga/effects";

import reqDefects from "./reqDefects";
// import reqDefect from "./reqDefect";

function* defectsSaga() {
    yield spawn(reqDefects);
}

export default defectsSaga;
