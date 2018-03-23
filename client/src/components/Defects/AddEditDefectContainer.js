import { connect } from "react-redux";

import * as actions from "actions/Defects";
import {
    redirectToDefects,
    reqAttachToDefectComment,
    reqDeleteAttachment,
    reqDeleteComment,
    reqDownloadAttachment,
    reqSaveDefectComment,
    reqUpdateAttachment,
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
    onAttachFileToComment(file, comment, defectId) {
        dispatch(reqAttachToDefectComment(file, comment, defectId));
    },
    onCancel() {
        dispatch(actions.resetAddEdit());
        dispatch(redirectToDefects());
    },
    onChangeAssignee(user) {
        dispatch(actions.changeAssignee(user));
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
        dispatch(reqDeleteComment(id));
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
        dispatch(reqUpdateAttachment(attachment));
    },
    onSaveComment(comment, defectId) {
        dispatch(reqSaveDefectComment(comment, defectId));
    }
});

const AddEditDefectContainer = connect(mapStateToProps, mapDispatchToProps)(AddEditDefect);

export default AddEditDefectContainer;
