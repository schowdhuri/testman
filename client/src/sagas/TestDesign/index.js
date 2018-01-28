import { spawn } from "redux-saga/effects";

import reqTestCase from "./reqTestCase";
import reqTestCases from "./reqTestCases";
import reqTestPlans from "./reqTestPlans";
import saveTestCase from "./saveTestCase";
import saveTestPlan from "./saveTestPlan";

function* testDesignSaga() {
    yield spawn(reqTestCase);
    yield spawn(reqTestCases);
    yield spawn(reqTestPlans);
    yield spawn(saveTestCase);
    yield spawn(saveTestPlan);
}

export default testDesignSaga;
