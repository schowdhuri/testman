import * as ACTIONS from "constants/DefectsActions";

const initialState = {
    all: [],
    selected: [],
    assigneeFilter: null,
    statusFilter: null
};

const defectsList = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.RCV_DEFECTS:
            return {
                ...state,
                all: action.defects
            }

        case ACTIONS.TOGGLE_SELECT_DEF: {
            const { defect, status } = action;
            const index = state.selected.findIndex(s => s.id == defect.id);
            if(status && index == -1) {
                return {
                    ...state,
                    selected: [
                        ...state.selected,
                        defect
                    ]
                };
            }
            if(!status && index !== -1) {
                return {
                    ...state,
                    selected: [
                        ...state.selected.slice(0, index),
                        ...state.selected.slice(index + 1),
                    ]
                };
            }
            break;
        }

        case ACTIONS.RCV_DELETE_DEFECT: {
            const { id } = action;
            const all = state.all.filter(d => d.id!=id);
            const selected = state.selected.filter(d => d.id==id);
            return {
                ...state,
                all,
                selected
            };
        }

        case ACTIONS.RCV_DELETE_DEFECTS: {
            const { idArr } = action;
            const all = state.all.filter(d => !idArr.find(id => d.id==id));
            const selected = state.selected.filter(d => !idArr.find(id => d.id==id));
            return {
                ...state,
                all,
                selected
            };
        }

        case ACTIONS.TOGGLE_SELECT_DEF_ALL: {
            const { status } = action;
            return {
                ...state,
                selected: status
                    ? [ ...state.all ]
                    : []
            };
        }

        case ACTIONS.CHANGE_ASSIGNEE_FILTER:
            return {
                ...state,
                assigneeFilter: action.value
            };

        case ACTIONS.CHANGE_STATUS_FILTER:
            return {
                ...state,
                statusFilter: action.value
            };

    }
    return state;
};

export default defectsList;
