import { spawn } from "redux-saga/effects";

import attachFile from "./attachFile";
import deleteTestCase from "./deleteTestCase";
import reqTestCase from "./reqTestCase";
import reqTestCases from "./reqTestCases";
import reqTestPlans from "./reqTestPlans";
import saveTestCase from "./saveTestCase";
import saveTestPlan from "./saveTestPlan";
import uploadCSV from "./uploadCSV";

function* testDesignSaga() {
    yield spawn(attachFile);
    yield spawn(deleteTestCase);
    yield spawn(reqTestCase);
    yield spawn(reqTestCases);
    yield spawn(reqTestPlans);
    yield spawn(saveTestCase);
    yield spawn(saveTestPlan);
    yield spawn(uploadCSV);
}

export default testDesignSaga;
