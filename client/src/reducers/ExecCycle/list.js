import * as ACTIONS from "constants/ExecCyclesActions";

const initialState = {
    all: [],
    selected: null,
    statusFilter: null,
    _tempSelectedId: null,
};

const execCycleList = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.RCV_EXEC_CYCLES: {
            const { execCycles } = action;
            if(state._tempSelectedId) {
                const match = execCycles.find(ec => ec.id == state._tempSelectedId);
                if(match) {
                    return {
                        ...state,
                        all: execCycles,
                        selected: match,
                        _tempSelectedId: null
                    };
                }
            }
            return {
                ...state,
                all: execCycles,
                selected: state.selected
                    ? state.selected
                    : execCycles.length
                        ? execCycles[0]
                        : null
            };
        }

        case ACTIONS.RCV_CLONE_EC: {
            const { execCycle } = action;
            return {
                ...state,
                all: [
                    ...state.all,
                    execCycle
                ]
            };
        }

        case ACTIONS.SELECT_EXEC_CYCLE: {
            const { execCycle } = action;
            const match = state.all.find(ec => ec.id == execCycle.id);
            if(!match) {
                return {
                    ...state,
                    selected: null,
                    _tempSelectedId: execCycle.id
                };
            }
            return {
                ...state,
                selected: match
            };
        }

        case ACTIONS.RCV_EC_SAVE: {
            const { execCycle } = action;
            let all = state.all;
            let selected = state.selected;
            const index = state.all.findIndex(ec => ec.id == execCycle.id);
            if(index != -1) {
                all = [
                    ...state.all.slice(0, index),
                    execCycle,
                    ...state.all.slice(index + 1)
                ];
            } else {
                all = [
                    ...state.all,
                    execCycle
                ];
            }
            if(selected && selected.id == execCycle.id)
                selected = execCycle;
            return {
                ...state,
                all,
                selected
            };
        }

        case ACTIONS.RCV_DEL_EC: {
            const { execCycle } = action;
            let all = state.all;
            let selected = state.selected;
            const index = state.all.findIndex(ec => ec.id == execCycle.id);
            if(index != -1) {
                all = [
                    ...state.all.slice(0, index),
                    ...state.all.slice(index + 1)
                ];
            }
            if(selected && selected.id == execCycle.id)
                selected = null;
            return {
                ...state,
                all,
                selected
            };
        }

        case ACTIONS.RCV_END_EC:
        case ACTIONS.RCV_START_EC: {
            const { execCycle } = action;
            let all = state.all;
            let selected = state.selected;
            const index = state.all.findIndex(ec => ec.id == execCycle.id);
            if(index != -1) {
                all = [
                    ...state.all.slice(0, index),
                    {
                        ...state.all[index],
                        status: execCycle.status
                    },
                    ...state.all.slice(index + 1)
                ];
            } else {
                all = [
                    ...state.all,
                    execCycle
                ];
            }
            if(selected && selected.id == execCycle.id)
                selected = {
                    ...selected,
                    status: execCycle.status
                };
            return {
                ...state,
                all,
                selected
            };
        }

        case ACTIONS.CHANGE_STATUS_FILTER:
            return {
                ...state,
                statusFilter: action.value
            };
    }
    return state;
};

export default execCycleList;
