import * as ACTIONS from "constants/SharedActions";

export const setLoading = (id, status) => ({
    type: ACTIONS.IS_LOADING,
    id,
    status
});
