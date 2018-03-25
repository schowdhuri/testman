import { createSelector } from "reselect";

const getAllDefects = state => state.defects.list.all;

export const getSelectedDefects = state => state.defects.list.selected;

export const getDefects = createSelector(
    [ getAllDefects, getSelectedDefects],
    (all, selected) => all.map(defect => ({
            ...defect,
            selected: Boolean(selected.find(d => d.id==defect.id))
    }))
);

export const getDefectAddEditState = state => state.defects.addEdit;

export const isEditMode = createSelector(
    getDefectAddEditState,
    addEdit => Boolean(addEdit.id)
);

export const areAllDefectsSelected = createSelector(
    [ getAllDefects, getSelectedDefects ],
    (all, selected) => {
        if(!selected.length)
            return false;
        const allInSelected = all.filter(a => selected.find(s => s.id == a.id));
        return allInSelected.length==all.length;
    }
);

export const allowDelete = createSelector(getSelectedDefects, selected => Boolean(selected.length));
