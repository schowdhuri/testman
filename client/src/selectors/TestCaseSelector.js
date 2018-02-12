import { createSelector } from "reselect";

export const getAllItems = state => state.execCycle.testSelector.all;
export const getPath = state => state.execCycle.testSelector.path;
export const getSelected = state => state.execCycle.testSelector.selected;
