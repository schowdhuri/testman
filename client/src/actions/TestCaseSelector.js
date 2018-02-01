import * as ACTIONS from "constants/TestCaseSelectorActions";

export const reqItems = (selectedItems=[], path=[]) => ({
    type: ACTIONS.REQ_ITEMS,
    selectedItems,
    path
});

export const rcvItems = (items, selectedItems=[]) => ({
    type: ACTIONS.RCV_ITEMS,
    items,
    selectedItems
});

export const changePath = path => ({
    type: ACTIONS.CHANGE_PATH,
    path
});

export const deselect = item => ({
    type: ACTIONS.DESELECT,
    item
});

export const deselectAll = () => ({
    type: ACTIONS.DESELECT_ALL
});

export const select = (item, path) => ({
    type: ACTIONS.SELECT,
    item,
    path
});

export const selectAll = items => ({
    type: ACTIONS.SELECT_ALL,
    items
});
