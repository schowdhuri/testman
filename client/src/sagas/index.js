import { spawn } from "redux-saga/effects";

import defectsSaga from "./Defects";
import execCyclesSaga from "./ExecCycle";
import redirectSaga from "./redirects";
import testDesignSaga from "./TestDesign";

function* rootSaga() {
    yield spawn(defectsSaga);
    yield spawn(execCyclesSaga);
    yield spawn(redirectSaga);
    yield spawn(testDesignSaga);
}

export default rootSaga;
