import * as ACTIONS from "constants/DefectsActions";

export const reqDefects = () => ({
    type: ACTIONS.REQ_DEFECTS
});

export const rcvDefects = defects => ({
    type: ACTIONS.RCV_DEFECTS,
    defects
});
