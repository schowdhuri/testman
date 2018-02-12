import * as ACTIONS from "constants/ExecCyclesActions";

const initialState = {
    all: [],
    selected: null
};

const execCycleList = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.RCV_EXEC_CYCLES:
            return {
                ...state,
                all: action.execCycles
            };

        case ACTIONS.SELECT_EXEC_CYCLE:
            return {
                ...state,
                selected: action.execCycle
            };
    }
    return state;
};

export default execCycleList;
