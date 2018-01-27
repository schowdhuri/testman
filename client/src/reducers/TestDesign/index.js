import { combineReducers } from "redux";

import testPlans from "./testPlans";
import addEditTestCase from "./addEditTestCase";

const designReducer = combineReducers({
    testPlans,
    addEditTestCase
});

export default designReducer;
