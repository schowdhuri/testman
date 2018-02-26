import * as ACTIONS from "constants/TestSelectorActions";

export const reqInitialData = () => ({
    type: ACTIONS.REQ_INIT_DATA
});

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

export const resetSelection = selectedItems => ({
    type: ACTIONS.RESET_SELECT,
    selectedItems
});

export const reqImportTests = (selectedItems, importActionContract) => ({
    type: ACTIONS.REQ_IMPORT_TESTS,
    selectedItems,
    importActionContract
});

export const rcvImportTests = tests => ({
    type: ACTIONS.RCV_IMPORT_TESTS,
    tests
});
