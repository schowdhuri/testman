import * as ACTIONS from "constants/ExecCyclesActions";

export const reqExecCycles = () => ({
    type: ACTIONS.REQ_EXEC_CYCLES
});

export const rcvExecCycles = execCycles => ({
    type: ACTIONS.RCV_EXEC_CYCLES,
    execCycles
});

export const reqExecCycle = id => ({
    type: ACTIONS.REQ_EXEC_CYCLE,
    id
});

export const rcvExecCycle = execCycle => ({
    type: ACTIONS.RCV_EXEC_CYCLE,
    execCycle
});

export const reqSaveExecCycle = execCycle => ({
    type: ACTIONS.REQ_EC_SAVE,
    execCycle
});

export const rcvSaveExecCycle = execCycle => ({
    type: ACTIONS.RCV_EC_SAVE,
    execCycle
});

export const selectExecCycle = execCycle => ({
    type: ACTIONS.SELECT_EXEC_CYCLE,
    execCycle
});

export const reqTestRuns = execCycleId => ({
    type: ACTIONS.REQ_TEST_RUNS,
    execCycleId
});

export const rcvTestRuns = (execCycleId, testRuns) => ({
    type: ACTIONS.RCV_TEST_RUNS,
    execCycleId,
    testRuns
});

export const toggleImportDialog = show => ({
    type: ACTIONS.TOGGLE_IMPORT_DLG,
    show
});

export const toggleSelect = (execCycleId, testRun, status) => ({
    type: ACTIONS.TOGGLE_SELECT_TR,
    execCycleId,
    testRun,
    status
});

export const toggleSelectAll = (execCycleId, status) => ({
    type: ACTIONS.TOGGLE_SELECT_TR_ALL,
    execCycleId,
    status
});

export const reqDeleteTestRuns = (idArr=[]) => ({
    type: ACTIONS.REQ_DEL_TEST_RUNS,
    idArr
});

export const rcvDeleteTestRuns = idArr => ({
    type: ACTIONS.RCV_DEL_TEST_RUNS,
    idArr
});

export const initEditExecCycle = execCycle => ({
    type: ACTIONS.INIT_EC_EDIT,
    execCycle
});
