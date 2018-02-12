import { connect } from "react-redux";
import SelectorModal from "./SelectorModal";

import * as actions from "actions/TestCaseSelector";

import testCaseSelector from "selectors/TestDesign";

import {
    getAllItems,
    getPath,
    getSelected
} from "selectors/TestCaseSelector";

const mapStateToProps = state => ({
    selectedItems: getSelected(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClose(preSelectedItems) {
        dispatch(actions.resetSelection(preSelectedItems));
        if(typeof(ownProps.onClose)==="function")
            ownProps.onClose();
    },
    onSave(data) {
        dispatch(actions.reqImportTests(data));
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        show: ownProps.show
    };
};

const SelectorModalContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(SelectorModal);

export default SelectorModalContainer;
