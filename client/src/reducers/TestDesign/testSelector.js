import * as ACTIONS from "constants/TestCaseSelectorActions";
import isChildOf from "businessLogic/shared/GroupMultiSelect/isChildOf";

const initialState = {
    all: [],
    isReady: false,
    path: [],
    selected: []
};

const selectorReducer = (state=initialState, action) => {
    const { type } = action;
    let index;
    let selectedItems;
    switch(type) {
        case ACTIONS.CHANGE_PATH:
            return {
                ...state,
                path: action.path
            };

        case ACTIONS.RCV_ITEMS:
            return {
                ...state,
                all: action.items,
                selected: action.selectedItems.length
                    ? action.selectedItems
                    : state.selected,
                isReady: true
            };

        case ACTIONS.DESELECT:
            index = state.selected.findIndex(t => t.id === action.item.id);
            if(index >= 0) {
                return {
                    ...state,
                    selected: [
                        ...state.selected.slice(0, index),
                        ...state.selected.slice(index + 1)
                    ]
                };
            }
            break;

        case ACTIONS.DESELECT_ALL:
            return {
                ...state,
                selected: []
            };

        case ACTIONS.SELECT: {
            const selectedItem = {
                ...action.item,
                path: action.path
            };
            return {
                ...state,
                selected: [
                    selectedItem,
                    ...state.selected.filter(s => !isChildOf(s, selectedItem))
                ]
            };
        }

        case ACTIONS.SELECT_ALL:
            selectedItems = [ ...state.selected ];
            action.items.forEach(t => {
                if(!selectedItems.find(st => st.id===t.id))
                    selectedItems.push(t);
            });
            return {
                ...state,
                selected: selectedItems
            };

        // case ACTIONS.INIT_ADD_STATE:
        //     return initialState;

        // case ACTIONS.INIT_EDIT_STATE:
        //     return {
        //         ...initialState,
        //         ...action.data
        //     };

    }
    return state;
};

export default selectorReducer;
