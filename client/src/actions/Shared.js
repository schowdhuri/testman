import * as ACTIONS from "constants/SharedActions";

export const setLoading = (id, status) => ({
    type: ACTIONS.IS_LOADING,
    id,
    status
});

export const redirectToTestDesign = () => ({
    type: ACTIONS.REDIRECT_TEST_DESIGN
});
