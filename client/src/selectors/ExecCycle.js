import { createSelector } from "reselect";

const getAllExecCycles = state => state.execCycle.list.all;
export const getSelectedExecCycle = state => state.execCycle.list.selected;
export const getExecCycles = createSelector(
    [ getAllExecCycles, getSelectedExecCycle ],
    (execCycles, selected) => execCycles.map(ec => ({
        ...ec,
        selected: selected ? ec.id==selected.id : false
    }))
);

const getTestRunMap = state => state.execCycle.testRuns;

export const getTestRuns = createSelector(
    [ getTestRunMap, getSelectedExecCycle ],
    (testRuns, execCycle) => execCycle && testRuns[execCycle.id] || []
);

export const getTestRunAddEditState = state=> state.execCycle.addEdit;