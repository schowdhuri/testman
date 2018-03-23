import * as ACTIONS from "constants/SharedActions";

export const reqLoginStatus = () => ({
    type: ACTIONS.REQ_LOGIN_STATUS
});

export const rcvLoginStatus = user => ({
    type: ACTIONS.RCV_LOGIN_STATUS,
    user
});

export const setLoading = (id, status) => ({
    type: ACTIONS.IS_LOADING,
    id,
    status
});

export const redirectToTestDesign = () => ({
    type: ACTIONS.REDIRECT_TEST_DESIGN
});

export const redirectToDefects = () => ({
    type: ACTIONS.REDIRECT_DEFECTS
});

export const redirectToExecCycle = () => ({
    type: ACTIONS.REDIRECT_EXEC_CYCLE
});

export const reqUsers = () => ({
    type: ACTIONS.REQ_USERS
});

export const rcvUsers = users => ({
    type: ACTIONS.RCV_USERS,
    users
});

export const reqUploadFiles = files => ({
    type: ACTIONS.REQ_UPLOAD_FILES,
    files
});

export const rcvUploadFiles = files => ({
    type: ACTIONS.RCV_UPLOAD_FILES,
    files
});

export const reqDeleteAttachment = attachment => ({
    type: ACTIONS.REQ_DELETE_ATTACH,
    attachment
});

export const rcvDeleteAttachment = attachment => ({
    type: ACTIONS.RCV_DELETE_ATTACH,
    attachment
});

export const reqUpdateAttachment = attachment => ({
    type: ACTIONS.REQ_UPDATE_ATTACH,
    attachment
});

export const rcvUpdateAttachment = attachment => ({
    type: ACTIONS.RCV_UPDATE_ATTACH,
    attachment
});

export const reqDownloadAttachment = attachment => ({
    type: ACTIONS.REQ_DOWNLOAD_ATTACH,
    attachment
});

export const reqAttachToDefectComment = (file, comment, defectId) => ({
    type: ACTIONS.REQ_ATTACH_TO_COMM,
    file,
    comment,
    entity: "defect",
    entityId: defectId
});

export const reqAttachToTestCaseComment = (file, comment, testCaseId) => ({
    type: ACTIONS.REQ_ATTACH_TO_COMM,
    file,
    comment,
    entity: "testCase",
    entityId: testCaseId
});

export const rcvAttachToComment = (file, comment, entity, entityId) => ({
    type: ACTIONS.RCV_ATTACH_TO_COMM,
    file,
    comment,
    [entity]: entityId
});

export const reqSaveComment = (comment, entity, entityId) => ({
    type: ACTIONS.REQ_SAVE_COMMENT,
    comment,
    entity,
    entityId
});

export const reqSaveDefectComment = (comment, defectId) => ({
    type: ACTIONS.REQ_SAVE_COMMENT,
    comment,
    entity: "defect",
    entityId: defectId
});

export const reqSaveTestCaseComment = (comment, testCaseId) => ({
    type: ACTIONS.REQ_SAVE_COMMENT,
    comment,
    entity: "testCase",
    entityId: testCaseId
});

export const rcvSaveComment = (comment, entity, entityId) => ({
    type: ACTIONS.RCV_SAVE_COMMENT,
    comment,
    [entity]: entityId
});

export const reqDeleteComment = id => ({
    type: ACTIONS.REQ_DELETE_COMMENT,
    id
});

export const rcvDeleteComment = id => ({
    type: ACTIONS.RCV_DELETE_COMMENT,
    id
});
