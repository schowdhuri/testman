import { connect } from "react-redux";

import * as actions from "actions/TestDesign";

import AddEditTestCase from "./AddEditTestCase";

import {
    redirectToTestDesign,
    reqAttachToTestCaseComment,
    reqDeleteAttachment,
    reqDeleteComment,
    reqDownloadAttachment,
    reqSaveTestCaseComment,
    reqUpdateAttachment
} from "actions/Shared";

import { getTestCaseAddEditState, isEditMode } from "selectors/TestDesign";
import { isLoading } from "selectors/Shared";


const mapStateToProps = state => ({
    isEditMode: isEditMode(state),
    isLoading: isLoading(state),
    testCase: getTestCaseAddEditState(state)
});

const mapDispatchToProps = dispatch => ({
    onAttachFile(file, testCase, testPlanId) {
        dispatch(actions.reqAttachToTestCase(file, testCase, testPlanId));
    },
    onAttachFileToComment(file, comment, testCaseId) {
        dispatch(reqAttachToTestCaseComment(file, comment, testCaseId));
    },
    onCancel() {
        dispatch(actions.resetAddEdit());
        dispatch(redirectToTestDesign());
    },
    onChangeDescription(val) {
        dispatch(actions.changeTCDescription(val));
    },
    onChangeName(val) {
        dispatch(actions.changeTCName(val));
    },
    onDelete(testCaseId, testPlanID) {
        dispatch(actions.reqDeleteTestCase(testCaseId, testPlanID));
    },
    onDeleteAttachment(attachment) {
        dispatch(reqDeleteAttachment(attachment));
    },
    onDeleteComment(id) {
        dispatch(reqDeleteComment(id));
    },
    onDownloadAttachment(attachment) {
        dispatch(reqDownloadAttachment(attachment));
    },
    onInit(id) {
        dispatch(actions.resetAddEdit());
        if(id)
            dispatch(actions.reqTestCase(id));
    },
    onSave(testPlanID, testCase, files, redirect) {
        dispatch(actions.reqSaveTestCase(
            testPlanID,
            testCase,
            files,
            redirect
        ));
    },
    onSaveAttachment(attachment) {
        dispatch(reqUpdateAttachment(attachment));
    },
    onSaveComment(comment, testCaseId) {
        dispatch(reqSaveTestCaseComment(comment, testCaseId));
    }
});

const mergeProps = (ownProps, stateProps, dispatchProps) => {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
};

const AddEditTestCaseContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddEditTestCase);

export default AddEditTestCaseContainer;
