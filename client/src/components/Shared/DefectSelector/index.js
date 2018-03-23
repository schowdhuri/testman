import { connect } from "react-redux";
import Selector from "./Selector";

import * as actions from "actions/DefectSelector";

import {
    getAllItems,
    getPath,
    getSelected
} from "selectors/DefectSelector";

import { isLoading } from "selectors/Shared";


const mapStateToProps = state => ({
    isLoading: isLoading(state),
    items: getAllItems(state),
    path: getPath(state),
    selectedItems: getSelected(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClose(preSelectedItems) {
        dispatch(actions.resetSelection(preSelectedItems));
        if(typeof(ownProps.onClose)==="function")
            ownProps.onClose();
    },
    onDeselect(item) {
        dispatch(actions.deselect(item));
    },
    onDeselectAll() {
        dispatch(actions.deselectAll());
    },
    onInit() {
        dispatch(actions.reqItems());
        if(typeof(ownProps.onInit)=="function")
            ownProps.onInit();
    },
    onSelect(item, path) {
        dispatch(actions.select(item, path));
    },
    onSelectAll(items) {
        dispatch(actions.selectAll(items));
    },
    onSave(selectedItems) {
        if(typeof(ownProps.onSave)=="function")
            ownProps.onSave(selectedItems);
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    show: Boolean(ownProps.show),
    allowAdd: ownProps.allowAdd !== undefined
        ? ownProps.allowAdd
        : true,
    allowAddFolder: ownProps.allowAddFolder !== undefined
        ? ownProps.allowAddFolder
        : true,
    readOnly: ownProps.readOnly !== undefined
        ? ownProps.readOnly
        : false
});

const SelectorContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Selector);

export default SelectorContainer;
