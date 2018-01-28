import { createSelector } from "reselect";

export const getTestPlans = state => state.testDesign.testPlans.all;
export const getSelectedTestPlanId = state => state.testDesign.testPlans.selectedId;

export const getSelectedTestPlan = createSelector(
    [ getTestPlans, getSelectedTestPlanId],
    (testPlans, testPlanId) => testPlanId
        ? testPlans.find(tp => tp.id == testPlanId)
        : null 
);

const getTestCaseMap = state => state.testDesign.testPlans.testCases;

export const getTestCases = createSelector(
    [ getTestCaseMap, getSelectedTestPlanId ],
    (testCases, testPlanId) => testPlanId && testCases[testPlanId] || []
);

export const getTestCaseAddEditState = state=> state.testDesign.addEditTestCase;
