import { createSelector } from "reselect";

export const getDefects = state => state.defects.list.all;

export const getDefectAddEditState = state => state.defects.addEdit;
