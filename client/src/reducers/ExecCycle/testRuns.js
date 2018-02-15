import * as ACTIONS from "constants/ExecCyclesActions";

const initialState = {};

const testRuns = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.RCV_TEST_RUNS:
            return {
                ...state,
                [action.execCycleId]: {
                    all: action.testRuns,
                    selected: []
                }
            };

        case ACTIONS.TOGGLE_SELECT_TR: {
            const testRuns = state[action.execCycleId];
            if(testRuns && testRuns.selected) {
                const index = testRuns.selected.findIndex(tr => tr.id==action.testRun.id);
                if(action.status && index == -1) {
                    return {
                        ...state,
                        [action.execCycleId]: {
                            ...state[action.execCycleId],
                            selected: [
                                ...state[action.execCycleId].selected,
                                action.testRun
                            ]
                        }
                    };
                }
                if(!action.status && index !== -1) {
                    return {
                        ...state,
                        [action.execCycleId]: {
                            ...state[action.execCycleId],
                            selected: [
                                ...state[action.execCycleId].selected.slice(0, index),
                                ...state[action.execCycleId].selected.slice(index + 1),
                            ]
                        }
                    };
                }
            }
            break;
        }
    }
    return state;
};

export default testRuns;
