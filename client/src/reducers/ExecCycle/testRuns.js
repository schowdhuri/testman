import * as ACTIONS from "constants/ExecCyclesActions";

// testRuns are stored as { [execCycleId]: { all: testRunArr, selected: selectedArr } }
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

        case ACTIONS.RCV_DEL_TEST_RUNS: {
            const { idArr } = action;
            const execCycleIds = Object.keys(state);
            return execCycleIds.reduce((acc, execCycleId) => {
                const testRuns = state[execCycleId].all
                    .filter(tr => !idArr.find(id => id==tr.id));
                return {
                    ...acc,
                    [execCycleId]: {
                        all: testRuns,
                        selected: []
                    }
                };
            }, {});
        }

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
