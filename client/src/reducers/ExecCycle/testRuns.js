import * as ACTIONS from "constants/ExecCyclesActions";

const initialState = {};

const testRuns = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.RCV_TEST_RUNS:
            return {
                ...state,
                [action.execCycleId]: action.testRuns
            };
    }
    return state;
};

export default testRuns;
