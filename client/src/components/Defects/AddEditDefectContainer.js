import { connect } from "react-redux";

import * as actions from "actions/Defects";
import {
    redirectToDefects,
    reqDeleteAttachment,
    reqDownloadAttachment,
    reqSaveAttachment,
    reqUsers
} from "actions/Shared";

import AddEditDefect from "./AddEditDefect";

import { getDefectAddEditState } from "selectors/Defects";
import { getSelected } from "selectors/TestSelector";
import { getUsers, isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    isLoading: isLoading(state),
    defect: getDefectAddEditState(state),
    selectedTestCases: getSelected(state),
    users: getUsers(state)
});

const mapDispatchToProps = dispatch => ({
    onAddTests(testCases) {
        dispatch(actions.addTests(testCases));
    },
    onAttachFile(file, defect) {
        dispatch(actions.reqAttachToDefect(file, defect));
    },
    onCancel() {
        dispatch(actions.resetAddEdit());
        dispatch(redirectToDefects());
    },
    onChangeAssignee(user) {
        dispatch(actions.changeAssignee(user));
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
    onChangeStatus(val) {
        dispatch(actions.changeDefectStatus(val));
    },
    onDelete(id) {
        dispatch(actions.reqDeleteDefect(id, true));
    },
    onDeleteAttachment(attachment) {
        dispatch(reqDeleteAttachment(attachment));
    },
    onDeleteComment(id) {
        dispatch(actions.reqDeleteComment(id));
    },
    onDeleteTestCase(id) {
        dispatch(actions.deleteTestCase(id));
    },
    onDownloadAttachment(attachment) {
        dispatch(reqDownloadAttachment(attachment));
    },
    onInit(id) {
        dispatch(actions.resetAddEdit());
        dispatch(actions.reqDefect(id));
        dispatch(reqUsers());
    },
    onSave(defect) {
        dispatch(actions.reqSaveDefect(defect));
    },
    onSaveAttachment(attachment) {
        dispatch(reqSaveAttachment(attachment));
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
