import * as ACTIONS from "constants/DefectsActions";

const initialState = {
    all: []
};

const defectsList = (state=initialState, action) => {
    const { type } = action;
    switch(type) {
        case ACTIONS.RCV_DEFECTS:
            return {
                ...state,
                all: action.defects
            }
    }
    return state;
};

export default defectsList;
