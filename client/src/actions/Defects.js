import * as ACTIONS from "constants/DefectsActions";

export const reqDefects = () => ({
    type: ACTIONS.REQ_DEFECTS
});

export const rcvDefects = defects => ({
    type: ACTIONS.RCV_DEFECTS,
    defects
});

export const reqDefect = id => ({
    type: ACTIONS.REQ_DEFECT,
    id
});

export const rcvDefect = defect => ({
    type: ACTIONS.RCV_DEFECT,
    defect
});

export const resetAddEdit = () => ({
    type: ACTIONS.RESET_DF_ADD_EDIT
});

export const changeAssignee = value => ({
    type: ACTIONS.CHANGE_DF_ASSIGNEE,
    value
});

export const changeDefectName = value => ({
    type: ACTIONS.CHANGE_DF_NAME,
    value
});

export const changeDefectDescription = value => ({
    type: ACTIONS.CHANGE_DF_DESCR,
    value
});

export const changeDefectStatus = value => ({
    type: ACTIONS.CHANGE_DF_STATUS,
    value
});

export const changeDefectComment = value => ({
    type: ACTIONS.CHANGE_DF_COMMENT,
    value
});

export const reqSaveDefectComment = (defectId, value, id) => ({
    type: ACTIONS.REQ_SAVE_DF_COMMENT,
    defectId,
    value,
    id
});

export const rcvSaveDefectComment = value => ({
    type: ACTIONS.RCV_SAVE_DF_COMMENT,
    value
});

export const reqDeleteComment = id => ({
    type: ACTIONS.REQ_DELETE_COMMENT,
    id
});

export const rcvDeleteComment = id => ({
    type: ACTIONS.RCV_DELETE_COMMENT,
    id
});

export const reqSaveDefect = (defect, redirect=false) => ({
    type: ACTIONS.REQ_SAVE_DEFECT,
    defect,
    redirect
});

export const rcvSaveDefect = defect => ({
    type: ACTIONS.RCV_SAVE_DEFECT,
    defect
});

export const toggleSelect = (defect, status) => ({
    type: ACTIONS.TOGGLE_SELECT_DEF,
    defect,
    status
});

export const toggleSelectAll = status => ({
    type: ACTIONS.TOGGLE_SELECT_DEF_ALL,
    status
});

export const reqDeleteDefect = (id, redirect=false) => ({
    type: ACTIONS.REQ_DELETE_DEFECT,
    id,
    redirect
});

export const rcvDeleteDefect = id => ({
    type: ACTIONS.RCV_DELETE_DEFECT,
    id
});

export const reqDeleteDefects = (idArr=[]) => ({
    type: ACTIONS.REQ_DELETE_DEFECTS,
    idArr
});

export const rcvDeleteDefects = idArr => ({
    type: ACTIONS.RCV_DELETE_DEFECTS,
    idArr
});

export const addTests = testCases => ({
    type: ACTIONS.ADD_TESTS_TO_DEFECT,
    testCases
});

export const deleteTestCase = id => ({
    type: ACTIONS.DEL_TEST_FRM_DEFECT,
    id
});
