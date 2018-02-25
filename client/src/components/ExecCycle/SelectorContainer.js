import { connect } from "react-redux";
import Selector from "./Selector";

import * as actions from "actions/TestCaseSelector";
import { reqTestCases } from "actions/TestDesign";
import { initEditExecCycle } from "actions/ExecCycle";

import {
    getAllItems,
    getPath,
    getSelected
} from "selectors/TestCaseSelector";

import { isLoading } from "selectors/Shared";

import { getSelectedExecCycle } from "selectors/ExecCycle";

const mapStateToProps = state => ({
    execCycle: getSelectedExecCycle(state),
    isLoading: isLoading(state),
    items: getAllItems(state),
    path: getPath(state),
    selectedItems: getSelected(state)
});

const mapDispatchToProps = dispatch => ({
    onChangePath(path) {
        dispatch(actions.changePath(path));
        dispatch(actions.reqItems(undefined, path));
    },
    onDeselect(item) {
        dispatch(actions.deselect(item));
    },
    onDeselectAll() {
        dispatch(actions.deselectAll());
    },
    onInit(execCycle) {
        dispatch(initEditExecCycle(execCycle));
        dispatch(actions.reqItems());
    },
    onSelect(item, path) {
        dispatch(actions.select(item, path));
    },
    onSelectAll(items) {
        dispatch(actions.selectAll(items));
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
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
