import { spawn } from "redux-saga/effects";

import reqExecCycles from "./reqExecCycles";
import reqTestRuns from "./reqTestRuns";
import saveExecCycle from "./saveExecCycle";

function* execCyclesSaga() {
    yield spawn(reqExecCycles);
    yield spawn(reqTestRuns);
    yield spawn(saveExecCycle);
}

export default execCyclesSaga;
