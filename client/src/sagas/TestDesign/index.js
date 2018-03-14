import { spawn } from "redux-saga/effects";

import deleteComment from "./deleteComment";
import deleteTestCase from "./deleteTestCase";
import reqTestCase from "./reqTestCase";
import reqTestCases from "./reqTestCases";
import reqTestPlans from "./reqTestPlans";
import saveComment from "./saveComment";
import saveTestCase from "./saveTestCase";
import saveTestPlan from "./saveTestPlan";
import uploadCSV from "./uploadCSV";

function* testDesignSaga() {
    yield spawn(deleteComment);
    yield spawn(deleteTestCase);
    yield spawn(reqTestCase);
    yield spawn(reqTestCases);
    yield spawn(reqTestPlans);
    yield spawn(saveComment);
    yield spawn(saveTestCase);
    yield spawn(saveTestPlan);
    yield spawn(uploadCSV);
}

export default testDesignSaga;
