import * as ACTIONS from "constants/ExecCyclesActions";
import { RCV_IMPORT_TESTS } from "constants/TestCaseSelectorActions";

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

        case ACTIONS.TOGGLE_SELECT_TR_ALL: {
            const testRuns = state[action.execCycleId];
            if(testRuns) {
                if(action.status) {
                    return {
                        ...state,
                        [action.execCycleId]: {
                            ...testRuns,
                            selected: testRuns.all
                        }
                    };
                } else {
                    return {
                        ...state,
                        [action.execCycleId]: {
                            ...testRuns,
                            selected: []
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
