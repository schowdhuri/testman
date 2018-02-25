import { connect } from "react-redux";

import SelectorModal from "components/ExecCycle/SelectorModal";

import * as actions from "actions/TestCaseSelector";

import testCaseSelector from "selectors/TestDesign";

import { getSelected } from "selectors/TestCaseSelector";

const mapStateToProps = state => ({
    selectedItems: getSelected(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClose(preSelectedItems) {
        dispatch(actions.resetSelection(preSelectedItems));
        if(typeof(ownProps.onClose)==="function")
            ownProps.onClose();
    },
    onSave(execCycle, selectedItems) {
        dispatch(actions.reqImportTests(execCycle, selectedItems));
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        show: ownProps.show,
        allowAdd: ownProps.allowAdd !== undefined
            ? ownProps.allowAdd
            : true,
        allowAddFolder: ownProps.allowAddFolder !== undefined
            ? ownProps.allowAddFolder
            : true,
        readOnly: ownProps.readOnly !== undefined
            ? ownProps.readOnly
            : false
    };
};

const SelectorModalContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(SelectorModal);

export default SelectorModalContainer;
