import * as ACTIONS from "constants/ExecCyclesActions";

const initialState = false;

const importTestDialog = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.TOGGLE_IMPORT_DLG:
            return action.show;

        case ACTIONS.RCV_IMPORT_TESTS:
            return initialState;
    }
    return state;
};

export default importTestDialog;
