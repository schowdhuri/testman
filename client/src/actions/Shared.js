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
