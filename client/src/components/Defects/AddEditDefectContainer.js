import { connect } from "react-redux";

import * as actions from "actions/TestDesign";
import { redirectToDefects } from "actions/Shared";

import AddEditDefect from "./AddEditDefect";

import { getDefectAddEditState } from "selectors/Defects";
import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    defect: getDefectAddEditState(state)
});

const mapDispatchToProps = dispatch => ({
    onCancel() {
        dispatch(actions.resetAddEdit());
        dispatch(redirectToDefects());
    },
    onChangeComment(value) {
        dispatch(actions.changeDefectComment(value));
    },
    onChangeDescription(val) {
        dispatch(actions.changeDefectDescription(val));
    },
    onChangeName(val) {
        dispatch(actions.changeDefectName(val));
    },
    onDeleteComment(id) {
        dispatch(actions.reqDeleteComment(id));
    },
    onInit(id) {
        dispatch(actions.resetAddEdit());
        dispatch(actions.reqDefect(id));
    },
    onSave(defect) {
        dispatch(actions.reqSaveDefect(defect));
    },
    onSaveComment(defectId, value, id) {
        dispatch(actions.reqSaveDefectComment(defectId, value, id));
    }
});

const mergeProps = (ownProps, stateProps, dispatchProps) => {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
};

const AddEditDefectContainer = connect(mapStateToProps, mapDispatchToProps)(AddEditDefect);

export default AddEditDefectContainer;
