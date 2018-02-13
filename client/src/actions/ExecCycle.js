import * as ACTIONS from "constants/ExecCyclesActions";

export const reqExecCycles = () => ({
    type: ACTIONS.REQ_EXEC_CYCLES
});

export const rcvExecCycles = execCycles => ({
    type: ACTIONS.RCV_EXEC_CYCLES,
    execCycles
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
