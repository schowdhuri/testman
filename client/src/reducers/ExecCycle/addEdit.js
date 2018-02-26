import * as ACTIONS from "constants/ExecCyclesActions";

const initialState = {
    name: "",
    startDate: null,
    endDate: null,
    testRuns: [],
    status: "New",
    showImportDialog: false
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

        case ACTIONS.INIT_EC_EDIT: {
            const { execCycle } = action;
            if(!execCycle)
                return initialState;
            return {
                ...state,
                name: execCycle.name,
                startDate: execCycle.startDate,
                endDate: execCycle.endDate,
                testRuns: [ ...execCycle.testRuns ],
                status: execCycle.status
            };
        }

        case ACTIONS.RCV_EXEC_CYCLE:
        case ACTIONS.SELECT_EXEC_CYCLE:
            return {
                ...initialState,
                ...action.execCycle
            };

        case ACTIONS.TOGGLE_IMPORT_DLG:
            return {
                ...state,
                showImportDialog: action.show
            };

    }
    return state;
};

export default addEditExecCycle;
