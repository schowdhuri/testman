import { NAV_DOWN, NAV_TO, NAV_UP } from "constants/GroupMultiSelectActions";

const initialState = [];

const pathReducer = (state=initialState, action={}) => {
    const { type } = action;
    let index;
    switch(type) {
        case NAV_DOWN:
            return [
                ...state,
                action.item
            ];

        case NAV_TO:
            if(!action.item || !action.item.id)
                return initialState;
            index = -1;
            state.forEach((level, i) => {
                if(level.id === action.item.id)
                    index = i;
            });
            if(index != -1) {
                return state.slice(0, index + 1);
            }
            break;

        case NAV_UP:
            return state.slice(0, state.length-1);
    }
    return state;
};

export default pathReducer;
