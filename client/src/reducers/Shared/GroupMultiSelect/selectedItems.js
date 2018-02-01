import * as ACTIONS from "constants/GroupMultiSelectActions";
import flatten from "businessLogic/shared/GroupMultiSelect/flatten";
import isChildOf from "businessLogic/shared/GroupMultiSelect/isChildOf";

const selectedItemsReducer = (state=[], action) => {
    const { type } = action;
    let deselectedItem;
    switch(type) {
        case ACTIONS.DESELECT_ITEM:
            // remove item from selectedItems[]
            deselectedItem = action.item;
            return state.filter(item => item.id != deselectedItem.id);

        case ACTIONS.SELECT_ITEM:
            return [
                ...state.filter(s => !isChildOf(s, action.item)),
                action.item
            ];

        case ACTIONS.SELECT_ALL:
            // add everything from the current level
            return [
                ...state,
                ...flatten({
                    items: action.items
                })
            ];

        case ACTIONS.DESELECT_ALL:
            return [];
    }
    return state;
};

export default selectedItemsReducer;
