import { connect } from "react-redux";
import DefectList from "./DefectList";

import * as actions from "actions/Defects";

import {
    allowDelete,
    areAllDefectsSelected,
    getAssigneeFilter,
    getDefects,
    getStatusFilter,
    getSelectedDefects
} from "selectors/Defects";

import { isLoading } from "selectors/Shared";

const mapStateToProps = state => ({
    allowDelete: allowDelete(state),
    allSelected: areAllDefectsSelected(state),
    assigneeFilter: getAssigneeFilter(state),
    isLoading: isLoading(state),
    defects: getDefects(state),
    selected: getSelectedDefects(state),
    statusFilter: getStatusFilter(state)
});

const mapDispatchToProps = dispatch => ({
    fetchDefects() {
        dispatch(actions.reqDefects());
    },
    onChangeAssigneeFilter(value) {
        dispatch(actions.changeAssigneeFilter(value));
    },
    onChangeStatusFilter(value) {
        dispatch(actions.changeStatusFilter(value));
    },
    onDelete(idArr) {
        dispatch(actions.reqDeleteDefects(idArr));
    },
    onToggleSelect(defect, status) {
        dispatch(actions.toggleSelect(defect, status));
    },
    onToggleSelectAll(status) {
        dispatch(actions.toggleSelectAll(status));
    }
});

const DefectListContainer = connect(mapStateToProps, mapDispatchToProps)(DefectList);

export default DefectListContainer;
