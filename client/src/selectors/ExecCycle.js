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
export const getAddEditState = state => state.execCycle.addEdit;

const getTestRunMap = state => state.execCycle.testRuns;

export const getTestRuns = createSelector(
    [ getTestRunMap, getSelectedExecCycle ],
    (trMap, execCycle) => {
        if(!execCycle || !trMap[execCycle.id] || !trMap[execCycle.id].all)
            return [];
        const testRuns = trMap[execCycle.id]
        return testRuns.all.map(tr => ({
            ...tr,
            selected: Boolean(testRuns.selected.find(t => t.id==tr.id))
        }));
    }
);

export const getTestRunAddEditState = state=> state.execCycle.addEdit;
export const showImportDialog = state => state.execCycle.addEdit.showImportDialog;
