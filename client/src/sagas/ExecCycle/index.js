import { spawn } from "redux-saga/effects";

import addNewDefect from "./addNewDefect";
import importTests from "./importTests";
import linkDefects from "./linkDefects";
import reqDeleteExecCycle from "./reqDeleteExecCycle";
import reqDeleteTestRuns from "./reqDeleteTestRuns";
import reqExecCycle from "./reqExecCycle";
import reqExecCycles from "./reqExecCycles";
import reqTestRun from "./reqTestRun";
import reqTestRuns from "./reqTestRuns";
import saveExecCycle from "./saveExecCycle";
import saveTestRun from "./saveTestRun";
import startStopExec from "./startStopExec";
import unlinkDefect from "./unlinkDefect";

function* execCyclesSaga() {
    yield spawn(addNewDefect);
    yield spawn(importTests);
    yield spawn(linkDefects);
    yield spawn(reqDeleteExecCycle);
    yield spawn(reqDeleteTestRuns);
    yield spawn(reqExecCycle);
    yield spawn(reqExecCycles);
    yield spawn(reqTestRun);
    yield spawn(reqTestRuns);
    yield spawn(saveExecCycle);
    yield spawn(saveTestRun);
    yield spawn(startStopExec);
    yield spawn(unlinkDefect);
}

export default execCyclesSaga;
