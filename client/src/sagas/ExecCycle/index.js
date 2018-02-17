import { spawn } from "redux-saga/effects";

import importTestCases from "./importTestCases";
import reqDeleteTestRuns from "./reqDeleteTestRuns";
import reqExecCycles from "./reqExecCycles";
import reqInitialSelectorData from "./reqInitialSelectorData";
import reqSelectorItems from "./reqSelectorItems";
import reqTestRuns from "./reqTestRuns";
import saveExecCycle from "./saveExecCycle";

function* execCyclesSaga() {
    yield spawn(importTestCases);
    yield spawn(reqDeleteTestRuns);
    yield spawn(reqExecCycles);
    yield spawn(reqInitialSelectorData);
    yield spawn(reqSelectorItems);
    yield spawn(reqTestRuns);
    yield spawn(saveExecCycle);
}

export default execCyclesSaga;
