import * as ACTIONS from "constants/ExecCyclesActions";

const initialState = {
    all: [],
    selected: null,
    _tempSelectedId: null
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
                all: execCycles
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
    }
    return state;
};

export default execCycleList;
