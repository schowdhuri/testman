import { connect } from "react-redux";
import TestImporter from "./TestImporter";

import * as actions from "actions/ExecCycle";

import { getAddEditState, showImportDialog } from "selectors/ExecCycle";

const mapStateToProps = state => ({
    execCycle: getAddEditState(state),
    show: showImportDialog(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClose() {
        if(typeof(ownProps.onClose)==="function")
            ownProps.onClose();
    },
    onInit(execCycle) {
        dispatch(actions.initEditExecCycle(execCycle));
    },
    onSave(execCycle, selectedItems) {
        // dispatch(actions.reqImportTests(execCycle, selectedItems));
        console.log("save: ", selectedItems)
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
        readOnly: ownProps.readOnly !== undefined
            ? ownProps.readOnly
            : false
    };
};

const TestImporterContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TestImporter);

export default TestImporterContainer;
