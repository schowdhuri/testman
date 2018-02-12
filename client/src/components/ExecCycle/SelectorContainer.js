import { connect } from "react-redux";
import Selector from "./Selector";

import * as actions from "actions/TestCaseSelector";
import { reqTestCases } from "actions/TestDesign";

import testCaseSelector from "selectors/TestDesign";

import { isLoading } from "selectors/Shared";
import {
    getAllItems,
    getPath,
    getSelected
} from "selectors/TestCaseSelector";

const mapStateToProps = state => ({
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
    onInit(selectedItems) {
        console.log("reqItems with ", selectedItems);
        dispatch(actions.reqItems(selectedItems, undefined));
    },
    onSelect(item, path) {
        dispatch(actions.select(item, path));
    },
    onSelectAll(items) {
        dispatch(actions.selectAll(items));
    }
});

const SelectorContainer = connect(mapStateToProps, mapDispatchToProps)(Selector);

export default SelectorContainer;
