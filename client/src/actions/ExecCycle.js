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

export const reqSaveTestRun = testRun => ({
    type: ACTIONS.REQ_SAVE_TR,
    testRun
});

export const rcvSaveTestRun = (testRun, execCycleId) => ({
    type: ACTIONS.RCV_SAVE_TR,
    testRun,
    execCycleId
});

export const initEditExecCycle = execCycle => ({
    type: ACTIONS.INIT_EC_EDIT,
    execCycle
});

export const reqDeleteExecCycle = execCycle => ({
    type: ACTIONS.REQ_DEL_EC,
    execCycle
});

export const rcvDeleteExecCycle = execCycle => ({
    type: ACTIONS.RCV_DEL_EC,
    execCycle
});

export const reqStartExecCycle = execCycle => ({
    type: ACTIONS.REQ_START_EC,
    execCycle
});

export const rcvStartExecCycle = execCycle => ({
    type: ACTIONS.RCV_START_EC,
    execCycle
});

export const reqEndExecCycle = execCycle => ({
    type: ACTIONS.REQ_END_EC,
    execCycle
});

export const rcvEndExecCycle = execCycle => ({
    type: ACTIONS.RCV_END_EC,
    execCycle
});

export const resetTRAddEdit = () => ({
    type: ACTIONS.RESET_TR_ADD_EDIT
});

export const reqTestRun = id => ({
    type: ACTIONS.REQ_TEST_RUN,
    id
});

export const rcvTestRun = testRun => ({
    type: ACTIONS.RCV_TEST_RUN,
    testRun
});

export const rcvImportTests = tests => ({
    type: ACTIONS.RCV_IMPORT_TESTS,
    tests
});

export const reqLinkDefects = (testRun, defects) => ({
    type: ACTIONS.REQ_LINK_DEFECTS,
    defects,
    testRun
});

export const rcvLinkDefects = (defects, testRun) => ({
    type: ACTIONS.RCV_LINK_DEFECTS,
    defects,
    testRun
});

export const reqAddNewDefect = (defect, files, testRun) => ({
    type: ACTIONS.REQ_ADD_NEW_DEFECT,
    defect,
    files,
    testRun
});

export const rcvAddNewDefect = defect => ({
    type: ACTIONS.RCV_ADD_NEW_DEFECT,
    defect
});

export const reqUnlinkDefect = (testRun, defect) => ({
    type: ACTIONS.REQ_UNLINK_DEFECT,
    testRun,
    defect
});

export const rcvUnlinkDefect = (testRun, defect) => ({
    type: ACTIONS.RCV_UNLINK_DEFECT,
    testRun,
    defect
});

export const reqCloneExecCycle = (id, cloneType) => ({
    type: ACTIONS.REQ_CLONE_EC,
    id,
    cloneType
});

export const rcvCloneExecCycle = execCycle => ({
    type: ACTIONS.RCV_CLONE_EC,
    execCycle
});
