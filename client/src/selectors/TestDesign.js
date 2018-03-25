import { createSelector } from "reselect";

const getAllTestPlans = state => state.testDesign.testPlans.all;
export const getSelectedTestPlan = state => state.testDesign.testPlans.selected;
export const getTestPlans = createSelector(
    [ getAllTestPlans, getSelectedTestPlan ],
    (testPlans, selected) => testPlans.map(tp => ({
        ...tp,
        selected: selected ? tp.id==selected.id : false
    }))
);

const getTestCaseMap = state => state.testDesign.testPlans.testCases;

export const getTestCases = createSelector(
    [ getTestCaseMap, getSelectedTestPlan ],
    (testCases, testPlan) => testPlan && testCases[testPlan.id] || []
);

export const getTestCaseAddEditState = state=> state.testDesign.addEdit;

export const isEditMode = createSelector(
    getTestCaseAddEditState,
    addEdit => Boolean(addEdit.id)
);
