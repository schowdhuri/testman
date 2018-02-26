import { connect } from "react-redux";

import SelectorModal from "./SelectorModal";

import * as actions from "actions/Defects";

// import { getAddEditState, showImportDialog } from "selectors/ExecCycle";

const mapStateToProps = state => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClose() {
        if(typeof(ownProps.onClose)==="function")
            ownProps.onClose();
    },
    onInit() {

    },
    onSave(execCycle, selectedItems) {
        console.log("save: ", selectedItems)
    }
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps
    };
};

const SelectorModalContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(SelectorModal);

export default SelectorModalContainer;
