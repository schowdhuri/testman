import { createSelector } from "reselect";

export const getAllItems = state => state.testSelector.all;
export const getPath = state => state.testSelector.path;
export const getSelected = state => state.testSelector.selected;
