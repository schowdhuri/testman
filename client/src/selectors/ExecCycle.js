import { createSelector } from "reselect";

const getAllExecCycles = state => state.execCycle.list.all;
export const getSelectedExecCycle = state => state.execCycle.list.selected;
export const getStatusFilter = state => state.execCycle.list.statusFilter;
export const getAddEditState = state => state.execCycle.addEdit;
const getTestRunMap = state => state.execCycle.testRuns;
export const getTestRunAddEditState = state=> state.execCycle.addEdit;
export const showImportDialog = state => state.execCycle.importTestDialog;
export const getTestRun = state => state.execCycle.testRun;

export const getExecCycles = createSelector(
    [ getAllExecCycles, getSelectedExecCycle ],
    (execCycles, selected) => execCycles.map(ec => ({
        ...ec,
        selected: selected ? ec.id==selected.id : false
    }))
);

const getCurrentTestRuns = createSelector(
    [ getTestRunMap, getSelectedExecCycle ],
    (trMap, execCycle) => {
        if(!execCycle || !trMap[execCycle.id] || !trMap[execCycle.id].all)
            return [];
        return trMap[execCycle.id].all;
    }
);

export const getSelectedTestRuns = createSelector(
    [ getTestRunMap, getSelectedExecCycle ],
    (trMap, execCycle) => {
        if(!execCycle || !trMap[execCycle.id] || !trMap[execCycle.id].selected)
            return [];
        return trMap[execCycle.id].selected;
    }
);

export const areAllTestRunsSelected = createSelector(
    [ getCurrentTestRuns, getSelectedTestRuns ],
    (all, selected) => {
        if(!selected.length)
            return false;
        const allInSelected = all.filter(a => selected.find(s => s.id == a.id));
        return allInSelected.length==all.length;
    }
);

export const getTestRuns = createSelector(
    [ getCurrentTestRuns, getSelectedTestRuns ],
    (all, selected) => all.map(tr => ({
            ...tr,
            selected: Boolean(selected.find(t => t.id==tr.id))
    }))
);

export const allowAddTestRun = createSelector(
    getSelectedExecCycle,
    execCycle => execCycle && execCycle.status != "Completed"
);

export const allowDeleteTestRuns = createSelector(
    [ getSelectedExecCycle, getSelectedTestRuns ],
    (execCycle, testRuns) => Boolean(execCycle && testRuns.length && execCycle.status != "Completed")
);

export const allowDeleteTestRun = createSelector(
    getSelectedExecCycle,
    execCycle => Boolean(execCycle && execCycle.status != "Completed")
);

export const isInProgress = createSelector(
    [ getSelectedExecCycle ],
    execCycle => Boolean(execCycle && execCycle.status == "In Progress")
);

export const allowStartExec = createSelector(
    getSelectedExecCycle,
    execCycle => execCycle && execCycle.status == "New"
);

export const allowEndExec = createSelector(
    [ getSelectedExecCycle, getSelectedTestRuns ],
    (execCycle, testRuns) => {
        if(!execCycle || execCycle.status != "In Progress")
            return false;
        if(testRuns.filter(tr => tr.status=="New").length)
            return false;
        return true;
    }
);
