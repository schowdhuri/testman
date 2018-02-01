import { spawn } from "redux-saga/effects";

import deleteComment from "./deleteComment";
import reqSelectorItems from "./reqSelectorItems";
import reqTestCase from "./reqTestCase";
import reqTestCases from "./reqTestCases";
import reqTestPlans from "./reqTestPlans";
import saveComment from "./saveComment";
import saveTestCase from "./saveTestCase";
import saveTestPlan from "./saveTestPlan";

function* testDesignSaga() {
    yield spawn(deleteComment);
    yield spawn(reqSelectorItems);
    yield spawn(reqTestCase);
    yield spawn(reqTestCases);
    yield spawn(reqTestPlans);
    yield spawn(saveComment);
    yield spawn(saveTestCase);
    yield spawn(saveTestPlan);
}

export default testDesignSaga;
