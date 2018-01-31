import * as ACTIONS from "constants/GroupMultiSelectActions";

export const deselectItem = (cid, item, items) => ({
    type: ACTIONS.DESELECT_ITEM,
    cid,
    item,
    items
});

export const deselectAll = (cid, items) => ({
    type: ACTIONS.DESELECT_ALL,
    cid,
    items
});

export const destroy = cid => ({
    type: ACTIONS.DESTROY,
    cid
});

export const filterList = (cid, filterText) => ({
    type: ACTIONS.FILTER_LIST,
    cid,
    filterText
});

export const init = (cid, selectedItems) => ({
    type: ACTIONS.INIT,
    cid,
    selectedItems
});

export const navDown = (cid, item) => ({
    type: ACTIONS.NAV_DOWN,
    cid,
    item: {
        id: item.id,
        name: item.name
    }
});

export const navUp = cid => ({
    type: ACTIONS.NAV_UP,
    cid
});

export const navTo = (cid, item) => ({
    type: ACTIONS.NAV_TO,
    cid,
    item: item ? {
        id: item.id,
        name: item.name
    } : undefined
});

export const selectAll = (cid, items) => ({
    type: ACTIONS.SELECT_ALL,
    cid,
    items
});

export const selectItem = (cid, item, path) => ({
    type: ACTIONS.SELECT_ITEM,
    cid,
    item: {
        ...item,
        path
    }
});
