import { combineReducers } from "redux";

import testPlans from "./testPlans";
import addEditTestCase from "./addEditTestCase";
import testSelector from "./testSelector";

const designReducer = combineReducers({
    testPlans,
    addEditTestCase,
    testSelector
});

export default designReducer;
