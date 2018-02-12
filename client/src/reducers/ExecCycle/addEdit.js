import * as ACTIONS from "constants/ExecCyclesActions";

const initialState = {
    name: "",
    startDate: null,
    endDate: null,
    testRuns: [],
    status: "New"
};

const addEditExecCycle = (state=initialState, action) => {
    const { type } = action;
    switch(type) {

        case ACTIONS.CHANGE_EC_NAME:
            return {
                ...state,
                name: action.value
            };

        case ACTIONS.RESET_EC_ADD_EDIT:
            return initialState;

        case ACTIONS.RCV_EXEC_CYCLE:
            return {
                ...initialState,
                ...action.execCycle
            };
    }
    return state;
};

export default addEditExecCycle;
