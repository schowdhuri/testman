import { createSelector } from "reselect";

export const getAllItems = state => state.testDesign.testSelector.all;
export const getPath = state => state.testDesign.testSelector.path;
export const getSelected = state => state.testDesign.testSelector.path;
