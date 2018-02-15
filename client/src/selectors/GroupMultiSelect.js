import deepEqual from "deep-equal";
import shortId from "shortid";
import { createSelector } from "reselect";

export const getFilterText = state => state.filterText;
export const getPath = state => state.path;

export const getSelectedItems = state =>
    state.selectedItems ? state.selectedItems.filter(s => s.path) : [];

const groupSelectedItems = createSelector(
    getSelectedItems,
    selectedItems => {
        const result = [];
        selectedItems.forEach(s => {
            const ri = result.findIndex(r => deepEqual(r.path, s.path));
            if(ri < 0) {
                result.push({
                    id: shortId.generate(),
                    name: s.path.length
                        ? s.path[s.path.length-1].name
                        : "Test Plans",
                    path: s.path,
                    items: [ s ]
                });
            } else {
                result[ri].items.push(s);
            }
        });
        return result;
    }
);

export const flattenSelected = createSelector(
    groupSelectedItems,
    selectedItems => {
        const arr = [];
        selectedItems.forEach(s => {
            arr.push({
                id: s.id,
                isGroup: true,
                name: s.name,
                path: s.path
            });
            s.items.forEach(sub => {
                arr.push(sub);
            });
        });
        return arr;
    }
);

export const getUnselectedItems = (state, allItems) => {
    const selectedItems = getSelectedItems(state);
    const filterText = getFilterText(state);
    if(filterText)
        allItems = allItems.filter(a => a.name.toLowerCase().indexOf(filterText.toLowerCase())>=0);
    if(!selectedItems || !selectedItems.length)
        return allItems;
    return allItems.filter(a => !selectedItems.find(s => {
        if(!s.path.length && !a.path.length)
            return s.id===a.id;
        return s.id===a.id && deepEqual(s.path, a.path);
    }));
};

export const allowFilter = state => !state.path || state.path.length > 0;
