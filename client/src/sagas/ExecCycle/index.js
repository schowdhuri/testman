import { spawn } from "redux-saga/effects";

import importTestCases from "./importTestCases";
import reqExecCycles from "./reqExecCycles";
import reqSelectorItems from "./reqSelectorItems";
import reqTestRuns from "./reqTestRuns";
import saveExecCycle from "./saveExecCycle";

function* execCyclesSaga() {
    yield spawn(importTestCases);
    yield spawn(reqExecCycles);
    yield spawn(reqSelectorItems);
    yield spawn(reqTestRuns);
    yield spawn(saveExecCycle);
}

export default execCyclesSaga;
