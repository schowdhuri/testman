import * as ACTIONS from "constants/SharedActions";

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

export const reqUploadFile = file => ({
    type: ACTIONS.REQ_UPLOAD_FILE,
    file
});

export const rcvUploadFile = file => ({
    type: ACTIONS.RCV_UPLOAD_FILE,
    file
});

export const reqDeleteAttachment = attachment => ({
    type: ACTIONS.REQ_DELETE_ATTACH,
    attachment
});

export const rcvDeleteAttachment = attachment => ({
    type: ACTIONS.RCV_DELETE_ATTACH,
    attachment
});

export const reqSaveAttachment = attachment => ({
    type: ACTIONS.REQ_SAVE_ATTACH,
    attachment
});

export const rcvSaveAttachment = attachment => ({
    type: ACTIONS.RCV_SAVE_ATTACH,
    attachment
});

export const reqDownloadAttachment = attachment => ({
    type: ACTIONS.REQ_DOWNLOAD_ATTACH,
    attachment
});
