import { spawn } from "redux-saga/effects";

import importTestCases from "./importTestCases";
import onImportTestCases from "./onImportTestCases";
import reqDeleteExecCycle from "./reqDeleteExecCycle";
import reqDeleteTestRuns from "./reqDeleteTestRuns";
import reqExecCycles from "./reqExecCycles";
import reqInitialSelectorData from "./reqInitialSelectorData";
import reqSelectorItems from "./reqSelectorItems";
import reqTestRuns from "./reqTestRuns";
import saveExecCycle from "./saveExecCycle";
import saveTestRun from "./saveTestRun";
import startStopExec from "./startStopExec";

function* execCyclesSaga() {
    yield spawn(importTestCases);
    yield spawn(onImportTestCases);
    yield spawn(reqDeleteExecCycle);
    yield spawn(reqDeleteTestRuns);
    yield spawn(reqExecCycles);
    yield spawn(reqInitialSelectorData);
    yield spawn(reqSelectorItems);
    yield spawn(reqTestRuns);
    yield spawn(saveExecCycle);
    yield spawn(saveTestRun);
    yield spawn(startStopExec);
}

export default execCyclesSaga;
