import { createSelector } from "reselect";

export const getSelectedTestPlan = state => state.testDesign.testPlans.selected;

const getAllTestPlans = state => state.testDesign.testPlans.all;

export const getTestPlans = createSelector(
    [ getAllTestPlans, getSelectedTestPlan ],
    (testPlans, selected={}) => testPlans.map(tp => ({
        ...tp,
        selected: tp.id == selected.id
    }))
);
const getTestCaseMap = state => state.testDesign.testPlans.testCases;

export const getTestCases = createSelector(
    [ getTestCaseMap, getSelectedTestPlan ],
    (testCases, testPlan) => testPlan && testCases[testPlan.id] || []
);

export const getTestCaseAddEditState = state=> state.testDesign.addEditTestCase;
